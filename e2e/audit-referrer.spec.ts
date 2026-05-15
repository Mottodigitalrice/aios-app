import { test, expect, Page, Route, Request } from "@playwright/test";

const AUDIT_URL = "https://aios.mottodigital.jp/audit";
const KS_BRAND = "ks-brand";
const TEST_EMAIL = "playwright-verify@test.invalid";
const TEST_NAME = "Verify Person";
const TEST_COMPANY = "Playwright Test Co";

const RUN_STARTED_AT = Date.now();

const visitTaskIdsToArchive: string[] = [];
const realSubmissionEmails: string[] = [];

interface InterceptedAudit {
  body: Record<string, unknown> | null;
}

async function interceptAudit(page: Page): Promise<InterceptedAudit> {
  const captured: InterceptedAudit = { body: null };
  await page.route("**/api/audit", async (route: Route, request: Request) => {
    try {
      captured.body = request.postDataJSON() as Record<string, unknown>;
    } catch {
      captured.body = null;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, message: "intercepted" }),
    });
  });
  return captured;
}

/**
 * Walks S0 → S11 happy path. Selectors are locale-agnostic:
 * - S0: input[type=email]
 * - S2/S4/S7/S10: first aria-pressed pill in the step
 * - S5: three pill groups — pick first aria-pressed in each (industry, team, role)
 * - Optional steps (S6, S8, S9): just continue
 * - S11: name + company autocomplete attrs, then sparkles submit
 *
 * Wizard footer always renders one "primary" continue button at the bottom (the only
 * non-outline button on the page). Use lucide icons to disambiguate ArrowRight (continue)
 * vs Sparkles (submit).
 */
async function clickContinue(page: Page) {
  await page.locator("button:has(svg.lucide-arrow-right)").last().click();
}

async function clickSubmit(page: Page) {
  await page.locator("button:has(svg.lucide-sparkles)").last().click();
}

/**
 * Each Section in s5-company.tsx is `<div><h3>label</h3>{children}</div>`. Anchor by the h3
 * (visible text matches even with budoux <wbr> tags inside), traverse to the wrapping div,
 * then click the first aria-pressed button inside that section.
 */
async function clickFirstPillUnder(page: Page, headingText: string) {
  const section = page.locator(`h3:has-text("${headingText}")`).locator("xpath=..");
  await section.locator("button[aria-pressed]").first().click();
}

async function walkHappyPath(page: Page) {
  // S0 — email
  await page.locator('input[type="email"]').fill(TEST_EMAIL);
  await clickContinue(page);

  // S2 — goals (multi-select; pick the first available pill)
  await page.locator("button[aria-pressed]").first().waitFor();
  await page.locator("button[aria-pressed]").first().click();
  await clickContinue(page);

  // S3 — rank (auto-seeded from S2)
  await clickContinue(page);

  // S4 — blockers
  await page.locator("button[aria-pressed]").first().waitFor();
  await page.locator("button[aria-pressed]").first().click();
  await clickContinue(page);

  // S5 — company: pick first pill in each of industry / team-size / role.
  // Each `Section` (s5-company.tsx) is `<div><h3>label</h3>{children}</div>`. We anchor by the
  // h3 text (default locale = ja) and traverse to the parent, then scope to its buttons.
  await page.locator("button[aria-pressed]").first().waitFor();
  await clickFirstPillUnder(page, "業種"); // industry
  await clickFirstPillUnder(page, "従業員規模"); // teamSize
  await clickFirstPillUnder(page, "ご自身の役職"); // role
  await clickContinue(page);

  // S6 — tools (optional)
  await clickContinue(page);

  // S7 — AI experience (required)
  await page.locator("button[aria-pressed]").first().waitFor();
  await page.locator("button[aria-pressed]").first().click();
  await clickContinue(page);

  // S8 — process (optional)
  await clickContinue(page);

  // S9 — robot task (optional)
  await clickContinue(page);

  // S10 — qualification (timeline is the only required field; budget/decisionMaker only render
  // for tier=full and would be picked by `.first()`, leaving timeline unset).
  await page.locator("button[aria-pressed]").first().waitFor();
  await clickFirstPillUnder(page, "いつ頃から始めたいですか");
  await clickContinue(page);

  // S11 — contact: name + company
  await page.locator('input[autocomplete="name"]').fill(TEST_NAME);
  await page.locator('input[autocomplete="organization"]').fill(TEST_COMPANY);
  await clickSubmit(page);
}

test.describe("AIOS audit — referrer tracking", () => {
  test("T1 — visit ping fires on load with ?ref=ks-brand (real, not intercepted)", async ({
    page,
  }) => {
    const visitReqPromise = page.waitForRequest(
      (req) => req.url().includes("/api/track-visit") && req.method() === "POST",
      { timeout: 15_000 }
    );
    const visitRespPromise = page.waitForResponse(
      (resp) => resp.url().includes("/api/track-visit"),
      { timeout: 15_000 }
    );

    await page.goto(`${AUDIT_URL}?ref=${KS_BRAND}`);

    const visitReq = await visitReqPromise;
    const body = visitReq.postDataJSON() as Record<string, unknown>;
    expect(body.referrer).toBe(KS_BRAND);
    expect(body.path).toBe("/audit");

    const visitResp = await visitRespPromise;
    expect(visitResp.status()).toBe(204);

    // localStorage seeded
    const slug = await page.evaluate(() => localStorage.getItem("aios.referrer"));
    expect(slug).toBe(KS_BRAND);

    const expires = await page.evaluate(() =>
      Number(localStorage.getItem("aios.referrer.expires"))
    );
    expect(expires).toBeGreaterThan(Date.now() + 29 * 86_400_000);
  });

  test("T2 — submission carries referrer:'ks-brand' (intercepted, zero pollution)", async ({
    page,
  }) => {
    const captured = await interceptAudit(page);
    await page.goto(`${AUDIT_URL}?ref=${KS_BRAND}`);
    await walkHappyPath(page);

    // Wait for the intercepted request body to be captured.
    await expect.poll(() => captured.body, { timeout: 10_000 }).not.toBeNull();
    const body = captured.body!;
    expect(body.referrer).toBe(KS_BRAND);
    expect((body.contact as { email: string }).email).toBe(TEST_EMAIL);

    // Success UI / EmailReviewPopup mounts (loose check: any popup with "Verify"/"確認" text).
    await page
      .locator("text=/(Verify|verify|確認|レビュー|送信)/")
      .first()
      .waitFor({ timeout: 10_000 })
      .catch(() => {
        // Popup wording can vary by locale; the captured body assertion is the primary signal.
      });
  });

  test("T3 — cross-session attribution via localStorage (no ?ref=)", async ({
    browser,
  }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Seed localStorage and the sessionStorage suppression flag, scoped to the audit origin.
    await page.addInitScript(() => {
      try {
        localStorage.setItem("aios.referrer", "ks-brand");
        localStorage.setItem(
          "aios.referrer.expires",
          String(Date.now() + 29 * 86_400_000 + 60_000)
        );
        sessionStorage.setItem("aios.referrer.visit-fired", "1");
      } catch {
        // ignore
      }
    });

    const captured = await interceptAudit(page);

    // Count visit pings — expect zero (sessionStorage flag must suppress).
    let visitPings = 0;
    await page.route("**/api/track-visit", async (route) => {
      visitPings += 1;
      await route.fulfill({ status: 204, body: "" });
    });

    await page.goto(AUDIT_URL); // no ?ref=
    await walkHappyPath(page);

    await expect.poll(() => captured.body, { timeout: 10_000 }).not.toBeNull();
    expect(captured.body!.referrer).toBe(KS_BRAND);
    expect(visitPings).toBe(0);

    await context.close();
  });

  test("T4 — direct visit, no referrer: clean submission", async ({ browser }) => {
    const context = await browser.newContext(); // fresh storage
    const page = await context.newPage();

    const captured = await interceptAudit(page);
    await page.goto(AUDIT_URL); // no ?ref=
    await walkHappyPath(page);

    await expect.poll(() => captured.body, { timeout: 10_000 }).not.toBeNull();
    const ref = captured.body!.referrer;
    // Server treats "" or missing both as no-attribution; accept either.
    expect(ref === "" || ref === undefined || ref === null).toBe(true);

    await context.close();
  });

  test("T5 — bot UA reject (synthetic /api/track-visit)", async ({ request }) => {
    const resp = await request.post(`${AUDIT_URL.replace("/audit", "")}/api/track-visit`, {
      headers: { "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)" },
      data: { referrer: KS_BRAND, path: "/audit" },
    });
    expect(resp.status()).toBe(204);
  });

  test("T6 — unknown slug reject (synthetic /api/track-visit)", async ({ request }) => {
    const resp = await request.post(`${AUDIT_URL.replace("/audit", "")}/api/track-visit`, {
      data: { referrer: "NOPE-not-a-real-partner", path: "/audit" },
    });
    expect(resp.status()).toBe(204);
  });

  test.skip("T7 — REAL end-to-end against live API (operator-only, un-skip manually)", async ({
    page,
  }) => {
    const stamp = Date.now();
    const realEmail = `playwright-e2e-${stamp}@test.invalid`;
    realSubmissionEmails.push(realEmail);

    await page.goto(`${AUDIT_URL}?ref=${KS_BRAND}`);

    // Walk path but with the operator-traceable email
    await page.locator('input[type="email"]').fill(realEmail);
    await clickContinue(page);
    await page.locator("button[aria-pressed]").first().click();
    await clickContinue(page);
    await clickContinue(page);
    await page.locator("button[aria-pressed]").first().click();
    await clickContinue(page);
    await clickFirstPillUnder(page, "業種");
    await clickFirstPillUnder(page, "従業員規模");
    await clickFirstPillUnder(page, "ご自身の役職");
    await clickContinue(page);
    await clickContinue(page);
    await page.locator("button[aria-pressed]").first().click();
    await clickContinue(page);
    await clickContinue(page);
    await clickContinue(page);
    await page.locator("button[aria-pressed]").first().click();
    await clickContinue(page);
    await page.locator('input[autocomplete="name"]').fill(`E2E Bot ${stamp}`);
    await page.locator('input[autocomplete="organization"]').fill(`E2E Co ${stamp}`);

    const submitResp = page.waitForResponse(
      (r) => r.url().includes("/api/audit") && r.request().method() === "POST",
      { timeout: 60_000 }
    );
    await clickSubmit(page);
    const resp = await submitResp;
    expect(resp.ok()).toBe(true);

    // Operator: verify a "[KS BRAND] AIOS Audit:" task appears in AIOS project via MOTTO API,
    // then run the cleanup helper manually with: REAL_E2E_EMAIL=<email> npm run test:e2e:cleanup
  });
});

test.afterAll(async ({ request }) => {
  const token = process.env.MOTTO_SESSION_TOKEN;
  const apiBase = process.env.MOTTO_API_BASE || "https://vps.mottodigital.jp";
  const refProjectId =
    process.env.REFERRAL_EVENTS_PROJECT_ID ||
    "35ee0cb5-63d9-8170-9345-ec835c07acd6";

  if (!token) {
    console.warn(
      "[afterAll] MOTTO_SESSION_TOKEN not set — skipping [VISIT] task cleanup. Archive manually if needed."
    );
    return;
  }

  try {
    const resp = await request.get(`${apiBase}/tasks/by-project/${refProjectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok()) {
      console.warn(`[afterAll] tasks/by-project HTTP ${resp.status()} — cleanup skipped`);
      return;
    }
    const data = (await resp.json()) as { tasks?: Array<{ id: string; title?: string; created_time?: string }> };
    const tasks = data.tasks || [];
    const cutoff = RUN_STARTED_AT - 60_000; // 1-minute pre-roll for clock skew
    const targets = tasks.filter((t) => {
      if (!t.title || !t.title.startsWith("[VISIT]")) return false;
      const created = t.created_time ? Date.parse(t.created_time) : 0;
      return created >= cutoff && created <= Date.now() + 60_000;
    });

    for (const task of targets) {
      const patch = await request.patch(`${apiBase}/tasks/${task.id}/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { status: "COMPLETED" },
      });
      if (patch.ok()) {
        visitTaskIdsToArchive.push(task.id);
      } else {
        console.warn(`[afterAll] PATCH ${task.id} HTTP ${patch.status()}`);
      }
    }
    if (visitTaskIdsToArchive.length) {
      console.log(
        `[afterAll] archived ${visitTaskIdsToArchive.length} [VISIT] task(s) created during this run`
      );
    }
  } catch (err) {
    console.warn(`[afterAll] cleanup failed: ${(err as Error).message}`);
  }

  if (realSubmissionEmails.length) {
    console.log(
      `[afterAll] T7 was un-skipped this run. Throwaway emails: ${realSubmissionEmails.join(", ")}. ` +
        `Archive matching '[KS BRAND] AIOS Audit:' tasks in AIOS project ${process.env.AIOS_PROJECT_ID || "1ede0cb5-63d9-8061-8571-df183897d8e2"} manually.`
    );
  }
});

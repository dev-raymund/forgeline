# Teardown Playbook — target → sent → client

The full step-by-step for landing a client with a free teardown. One full cycle takes
**~20–30 min per prospect**. Do 3–5 a day. Log every one in
[outreach-tracker.csv](outreach-tracker.csv).

The whole thing is written — no calls or video needed until *they* reply.

---

## Phase 0 — One-time setup (do once, ~5 min)

- [ ] Open [site-audit/audit.mjs](site-audit/audit.mjs) and confirm the contact constants
      at the top are correct (name, email, site). Every teardown uses them.
- [ ] Open [outreach-tracker.csv](outreach-tracker.csv) in Google Sheets (File → Import →
      Upload) so you can log leads as you go.
- [ ] Make sure the tool runs: `cd marketing/site-audit && node audit.mjs example.com`

---

## Phase 1 — Find ONE good-fit target (~10 min)

**Who to target** (pick businesses that have money AND a weak site):
- Local service businesses — dentists, lawyers, gyms, cafés, real estate, tradies, clinics, salons.
- New Shopify/product brands on a default theme.
- Founders posting "looking for a developer" (Indie Hackers, X, Wellfound, Upwork).
- **Not** other agencies or developers.

**Where to look:**
1. **Google Maps** — search `[trade] in [city]` (e.g. "dentists in Newcastle"). Open each
   business's website. You're hunting for ones that are slow, old-looking, or not mobile.
2. **Instagram** — local businesses / new brands with a weak link-in-bio site. Search
   hashtags: `#shopsmall`, `#newbusiness`, `#[yourcity]business`.
3. **Upwork / Contra** — job posts are warm; the poster already wants to buy.
4. **Warm network** — anyone you know who owns a business = highest close rate.

**The 60-second fit check** — open their site on your phone and ask:
- Does it load slowly? Look outdated? Break on mobile? Missing an obvious call-to-action
  or online booking/ordering?
- If YES to any → it's a target. If it's already fast, modern, and converting → skip it.

- [ ] Pick ONE business. Note its name + website URL.

---

## Phase 2 — Run the audit (~2 min)

```bash
cd marketing/site-audit
node audit.mjs theirsite.com
```

- [ ] Open the generated `teardown.html` in your browser (the command prints the path).
- [ ] Skim the **3 quick wins**. Sanity-check they're real and fair — if one is pedantic
      (e.g. "no lang attribute"), that's fine, the top 3 are auto-picked by severity.
- [ ] This is your proof + your opening line. Screenshot-ready, no writing needed yet.

> Be honest. Only send teardowns where the issues are genuine. A fair critique builds
> trust; an unfair one burns it.

---

## Phase 3 — Find the decision-maker + how to reach them (~5 min)

You want the **owner / founder / marketing lead**, not a generic inbox.

**Find their name:**
- Their site's About / Team / Contact page.
- LinkedIn — search the business name → look at "People".
- Instagram / Facebook page — often run by the owner.

**Find how to message them (in order of preference):**
1. **Direct email** — look on the Contact/About page, footer, or `mailto:` links. Common
   patterns: `firstname@domain.com`, `hello@domain.com`, `info@domain.com`.
2. **LinkedIn DM** — if you're connected or can send a note.
3. **Instagram / Facebook DM** — great for local + product businesses.
4. **Contact form** — last resort (goes to a generic inbox, lower reply rate).

- [ ] Record: contact name + best channel in the tracker.

---

## Phase 4 — Personalize the teardown (~2 min)

- [ ] Open `teardown.html`, find the line starting `Hi there —` (marked with an HTML
      comment) and change it to their name: `Hi Sarah —`.
- [ ] Optional: tweak the intro sentence to mention how you found them
      ("...came across [Business] on Instagram...").
- [ ] Export to PDF: browser → **Print → Save as PDF**. Name it
      `[Business]-website-teardown.pdf`.

---

## Phase 5 — Write the outreach message (~5 min)

**The formula:** specific true observation → free value → soft, no-pressure offer.
Lead with the ONE issue that matters most from the audit. Never generic.

### Email template

> **Subject:** quick note about [Business]'s website
>
> Hi [Name],
>
> I'm Raymund, a web developer — I came across [Business] while [how you found them] and
> had a look at your site.
>
> One thing stood out: [ONE SPECIFIC TRUE ISSUE — e.g. "it takes about 6 seconds to load
> on mobile, and the menu overlaps the logo on a phone"]. Little things like that quietly
> cost you customers, so I put together a short teardown — 3 specific things I'd fix, with
> screenshots. It's attached, free, no strings.
>
> If any of it's useful and you'd like a hand fixing it, happy to help. Either way, hope
> it's handy.
>
> Cheers,
> Raymund — Forgeline Technologies
> [site] · [email]

### LinkedIn / Instagram DM template (permission-first — higher reply rate)

> Hi [Name] — I'm a web developer and came across [Business]. Had a quick look at your
> site and noticed [specific issue]. I actually made you a free teardown with 3 things
> I'd fix (screenshots included) — want me to send it over? No pitch, promise 🙂

→ When they say "yes", reply with the PDF/link.

**Tone rules:** short, warm, human. No "Dear Sir/Madam", no jargon, no hard sell. You're
being helpful. One emoji max.

---

## Phase 6 — Send + log (~2 min)

- [ ] Send it (attach the PDF for email; for DMs, send after they say yes).
- [ ] Log in [outreach-tracker.csv](outreach-tracker.csv):
      Business, URL, contact, source, the issue you led with, service fit,
      **Status = Sent**, today's date, **Follow-up date = +3 days**.

---

## Phase 7 — Follow up (this is where most wins come from)

Most people don't reply to the first message. Two polite nudges, then let it go.

- **+3 days — Follow-up 1:**
  > Hi [Name] — just floating this back up in case it got buried. No worries if it's not a
  > priority right now; the teardown's yours to keep either way. 🙂
- **+7 days — Follow-up 2 (last one):**
  > Hey [Name], last note from me on this — if you ever want a hand with those fixes, I'm
  > around. Wishing [Business] well either way!
- [ ] Update tracker status after each (`Sent` → still `Sent`, or `Replied`).
- [ ] After Follow-up 2 with no reply → status `Nurture`, move on.

---

## Phase 8 — When they reply → convert

1. **Thank them + offer the call:** "Glad it's useful! Want to hop on a quick 15-min call
   so I can walk you through it and give you a ballpark? No obligation."
2. **On the call:** listen, confirm what they want, mention timeline. Don't over-quote live.
3. **Send a simple written proposal** (scope, price, timeline — 1 page).
4. **On yes → take a deposit (e.g. 50%) before starting.** Then kick off. 🚀
5. Move tracker: `Replied` → `Call booked` → `Proposal sent` → `Won`.

---

## Daily rhythm & guardrails

- **Target: 3–5 teardowns/day.** Quality over volume — every one personalized.
- Never mass-send the same message. The specific observation is what earns the reply.
- Only send honest teardowns. Fair critique = trust.
- If someone says no or asks you to stop → stop, thank them, move on.
- Track everything. Your reply rate + close rate tell you what to adjust.

**Rough math:** ~40 personalized teardowns → a handful of replies → 1–2 calls → your first
project. Consistency is the whole game.

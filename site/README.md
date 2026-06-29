# Portfolio & services site — full-stack developer

A single-page site that presents your services and captures project inquiries.
Pure HTML/CSS — no build step, no dependencies, **free to host**.

```
site/
  index.html    the page
  styles.css    the design
```

## Preview it locally

Open `index.html` in your browser, or from the terminal:

```bash
open site/index.html        # macOS
```

## Make it yours (edit `index.html`)

- Replace `Raymund` / `<raymund/>` with your name/handle.
- Update **Selected work** — your real projects with live + GitHub links (search `TODO`).
- Edit **My stack** chips to match what you actually use.
- Adjust **services + prices** to your level.
- Set your real **GitHub / LinkedIn / Cal.com** links (search for `your-handle`).

## Capture inquiries for free — set up the form (2 minutes)

1. Sign up at **https://formspree.io** (free tier = 50 submissions/month).
2. Create a form, copy its endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
3. In `index.html`, replace `YOUR_FORM_ID` in `<form action=...>` with it.

Inquiries then land in your email + Formspree dashboard. (Alternative: deploy on
Netlify and add `netlify` to the `<form>` tag to use Netlify Forms.)

## Put it live for free (pick one)

**Vercel (great for devs):**
1. Push this repo to GitHub.
2. Import it at https://vercel.com/new, set the root/output to the `site/` folder.
3. Live URL instantly; add a custom domain later.

**Netlify drop (fastest):**
1. Go to https://app.netlify.com/drop
2. Drag the `site/` folder onto the page → instant live URL.

**GitHub Pages:**
- Repo → Settings → Pages → deploy from branch, `/site` folder.

## After it's live

This is your hub. Put the URL in your Upwork/Contra profile, GitHub bio,
LinkedIn, build-in-public posts, and every proposal. See `../BUSINESS-PLAN.md`
for the full client-getting plan.

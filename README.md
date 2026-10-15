# Językownia – strona demo

Next.js 16 + TypeScript + Tailwind CSS 4. One page, one lead form system.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
npm run lint
npm run assets     # rebuilds web images from /source-assets
```

## Where things live

- `content/site.ts` – verified business facts (address, phone, hours, links). Single source of truth.
- `content/offer.ts` – audiences, subjects, FAQ, process steps, **reviews** (empty until real Google reviews are pasted in; the marquee renders automatically when filled).
- `lib/lead/` – form options, validation (shared by browser and server), browser submit adapter.
- `app/api/lead/route.ts` – lead delivery.
- `source-assets/` – original supplied files, never modified. `public/images/` holds derivatives.

## Connecting the "Dobierz zajęcia" form

Without configuration the form is in demo mode: nothing is sent and the visitor sees
"Ta wiadomość nie została wysłana" with the phone number and their answers.

Set in `.env.local` (see `.env.example`):

```
LEAD_WEBHOOK_URL=https://hook.eu1.make.com/...   # Make, Zapier, Google Apps Script, own endpoint
NEXT_PUBLIC_SITE_URL=https://twoja-domena.pl
```

The route POSTs JSON with the raw ids, human-readable `labels`, normalized phone (`+48…`),
`source` and `receivedAt`. For e-mail delivery, replace the `fetch` in `app/api/lead/route.ts`
with your mail provider call; the form UI does not change.

The success message ("Wiadomość dotarła do Językowni…") is shown only when the endpoint responds 2xx.

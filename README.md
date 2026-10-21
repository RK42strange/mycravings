# mycravings.in

A responsive food-ordering demo built with React, TypeScript, and Vite. Browse 14 cuisine categories, search an expanded menu, add items to a cart, and complete a simulated points checkout with a roast and browser-only receipt.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To verify a production build, run `npm run build`. `npm run lint` runs Oxlint.

## Demo behavior

- The wallet starts with 500 points on day one and accrues 500 points for each elapsed calendar day. Its balance is stored only in this browser's local storage. Clearing site data resets it to the current day's starting balance.
- Pay by Points simulates checkout, deducts the cart total, and displays a local receipt. Card, UPI, and cash-on-delivery options are inactive gag buttons.
- No database, Supabase, real payment processing, or delivery integration is used.
- Checkout jokes, search roast pools, and per-dish roast lines are editable in `public/data/roasts.json`. The app rotates through each pool without repeating a line until the pool is exhausted; used line IDs persist in browser local storage.
- Add a local image as `public/images/dishes/<dish-id>.webp` (for example, `public/images/dishes/butter-chicken.webp`). The dish ID is the first argument of its entry in `src/App.tsx`. Local images take priority; the existing Unsplash photo is used if the local file is missing.
- Menu and nutrition values are illustrative estimates, not restaurant listings or medical advice. On mobile, dish searches scroll the results into view while keeping the search header sticky.

# Laxmi Sweets — Image replacement guide

All temporary online imagery is centralized so you can replace it later without redesigning the UI.

## Hero / editorial / gallery
Edit:
`src/data/siteMedia.json`

Replace the `image` values inside:
- `hero`
- `collections`
- `editorial`
- `gallery`

## Product images
Edit:
`src/data/sweets.json`

Replace each product's `image` URL.

## Recommended workflow
Use your own CDN/Cloudinary/S3/image-host URLs in production. Keep the same JSON structure and only change the URL.

The current URLs are temporary online photography chosen to make the design presentable while the real Laxmi Sweets photography is not available.

## Payments
The checkout UI now exposes UPI, Razorpay and Pay on Delivery. The frontend intentionally does not contain a Razorpay secret. For live online payments, connect the checkout submission to your backend/order-creation endpoint and then open Razorpay Checkout with a server-created order.

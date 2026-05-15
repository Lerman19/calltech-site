# Stripe Payment Links setup

Use Stripe Payment Links for the first version of online payment. Do not put Stripe secret keys in the website. Only public `https://buy.stripe.com/...` links belong in `js/calltech-commerce.config.js`.

## Recommended account settings

- Business type: Individual or Sole Proprietor if there is no LLC yet.
- Currency: USD.
- Checkout payment methods: Cards, Apple Pay, Google Pay, and Cash App Pay if Stripe makes it available for the account.
- Receipt emails: enabled.
- Phone number collection: enabled.
- Billing address: auto or required if needed for fraud review.
- Terms text: "Deposit is applied to the final invoice. Final balance may vary based on equipment, wiring distance, wall type, and project scope."

## Create these service deposit links

Create each item as a one-time Payment Link in Stripe Dashboard. After Stripe generates the URL, paste it into the matching key in `js/calltech-commerce.config.js`.

| Config key | Stripe product name | Amount |
| --- | --- | --- |
| `deposits.securityCameraInstallation` | Security Camera Installation Deposit | `$99` |
| `deposits.videoDoorbellSmartLock` | Video Doorbell & Smart Lock Deposit | `$79` |
| `deposits.lowVoltageWiring` | Low Voltage Wiring Deposit | `$149` |
| `deposits.homeTheaterInstallation` | Home Theater Installation Deposit | `$99` |
| `deposits.smartHomeHubSetup` | Smart Home Hub Setup Deposit | `$79` |
| `deposits.unifiedHomeProtection` | Unified Home Protection Planning Deposit | `$149` |
| `deposits.networkSetup` | Smart Wi-Fi / Network Setup Deposit | `$79` |

## Where to paste links

Example:

```js
stripePaymentLinks: {
  deposits: {
    securityCameraInstallation: "https://buy.stripe.com/...",
    videoDoorbellSmartLock: "https://buy.stripe.com/..."
  }
}
```

After links are pasted, deploy `index.html`, `js/calltech-commerce.config.js`, `js/calltech-commerce.js`, `js/calltech-services.js`, and `js/contact.js`.

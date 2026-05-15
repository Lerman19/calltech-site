window.CallTechCommerceConfig = {
  // Add your GA4 measurement ID later, for example: "G-XXXXXXXXXX".
  // Leave empty to only push events to window.dataLayer.
  ga4MeasurementId: "",

  // Stripe Payment Links are safe to place here because they are public checkout URLs,
  // not API keys or webhook secrets. Replace "#" values with real Stripe Payment Links.
  stripePaymentLinks: {
    deposits: {
      default: "#",
      securityCameraInstallation: "#",
      videoDoorbellSmartLock: "#",
      lowVoltageWiring: "#",
      homeTheaterInstallation: "#",
      smartHomeHubSetup: "#",
      unifiedHomeProtection: "#"
    },
    packages: {
      starterCameraSetup: "#",
      smartEntryPackage: "#",
      wifiCoverageUpgrade: "#",
      homeTheaterStarter: "#",
      wholeHomeProtection: "#"
    }
  },

  fallbackQuoteUrl: "contact.html",

  // Future buttons/cards can use:
  // data-commerce-action="pay-deposit|buy-package|quote|package-view|service-view"
  // data-stripe-link-key="starterCameraSetup"
  // data-commerce-category="packages|deposits"
  // data-service="Security Camera Installation"
  // data-package="Starter Camera Setup"
  // data-price="99"
  // data-currency="USD"
  debug: false
};

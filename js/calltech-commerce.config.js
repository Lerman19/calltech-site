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
      unifiedHomeProtection: "#",
      networkSetup: "#"
    }
  },

  fallbackQuoteUrl: "contact.html",
  fallbackPaymentUrl: "contact.html?payment=request",

  depositAmounts: {
    default: 99,
    securityCameraInstallation: 99,
    videoDoorbellSmartLock: 79,
    lowVoltageWiring: 149,
    homeTheaterInstallation: 99,
    smartHomeHubSetup: 79,
    unifiedHomeProtection: 149,
    networkSetup: 79
  },

  // Future buttons/cards can use:
  // data-commerce-action="pay-deposit|quote|service-view"
  // data-stripe-link-key="securityCameraInstallation"
  // data-commerce-category="deposits"
  // data-service="Security Camera Installation"
  // data-price="99"
  // data-currency="USD"
  debug: false
};

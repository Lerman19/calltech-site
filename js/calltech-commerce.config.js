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
    },
    products: {
      securityCameraKit: "#",
      videoDoorbellKit: "#",
      meshWifiKit: "#",
      smartLockKit: "#",
      homeTheaterSetupKit: "#",
      consultation: "#"
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
    starterCameraSetup: 99,
    smartEntryPackage: 79,
    wifiCoverageUpgrade: 79,
    homeTheaterStarter: 99,
    wholeHomeProtection: 149
  },

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

(function () {
  "use strict";

  var config = window.CallTechCommerceConfig || {};
  var dataLayer = window.dataLayer = window.dataLayer || [];
  var initialized = false;

  function log() {
    if (config.debug && window.console && typeof window.console.log === "function") {
      window.console.log.apply(window.console, arguments);
    }
  }

  function normalizeKey(value) {
    return String(value || "")
      .trim()
      .replace(/[^a-zA-Z0-9]+(.)/g, function (_, chr) {
        return chr.toUpperCase();
      })
      .replace(/^[A-Z]/, function (chr) {
        return chr.toLowerCase();
      });
  }

  function closest(element, selector) {
    if (!element || element === document) {
      return null;
    }

    if (element.closest) {
      return element.closest(selector);
    }

    while (element && element !== document) {
      if (element.matches && element.matches(selector)) {
        return element;
      }
      element = element.parentNode;
    }

    return null;
  }

  function textOf(element) {
    return String((element && element.textContent) || "").replace(/\s+/g, " ").trim();
  }

  function getLink(element) {
    return closest(element, "a, button, [role='button'], [data-commerce-action]");
  }

  function getCard(element) {
    return closest(element, "[data-service-card], [data-package-card], .product, .product-block, .elementor-widget-container");
  }

  function readPayload(element) {
    var card = getCard(element);
    var source = element || {};
    var dataset = source.dataset || {};
    var cardDataset = (card && card.dataset) || {};
    var label = dataset.analyticsLabel || dataset.service || dataset.package || cardDataset.service || cardDataset.package || textOf(element);

    return {
      label: label || undefined,
      service: dataset.service || cardDataset.service || undefined,
      package: dataset.package || cardDataset.package || undefined,
      stripe_link_key: dataset.stripeLinkKey || undefined,
      commerce_category: dataset.commerceCategory || undefined,
      value: dataset.price ? Number(dataset.price) : undefined,
      currency: dataset.currency || undefined,
      page_path: window.location.pathname
    };
  }

  function cleanPayload(payload) {
    var cleaned = {};

    Object.keys(payload || {}).forEach(function (key) {
      var value = payload[key];
      if (value !== undefined && value !== null && value !== "") {
        cleaned[key] = value;
      }
    });

    return cleaned;
  }

  function track(eventName, payload) {
    var eventPayload = cleanPayload(payload || {});
    var dataLayerEvent = Object.assign({ event: eventName }, eventPayload);

    dataLayer.push(dataLayerEvent);

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, eventPayload);
    }

    log("CallTech analytics event", eventName, eventPayload);
  }

  function loadGa4(measurementId) {
    if (!measurementId || document.querySelector("script[data-calltech-ga4]")) {
      return;
    }

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    script.setAttribute("data-calltech-ga4", measurementId);
    document.head.appendChild(script);

    window.gtag = window.gtag || function () {
      dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", measurementId);
  }

  function getStripeUrl(element) {
    var dataset = element.dataset || {};
    var explicitUrl = dataset.stripeUrl;
    var category = dataset.commerceCategory || "deposits";
    var links = (config.stripePaymentLinks && config.stripePaymentLinks[category]) || {};
    var key = dataset.stripeLinkKey || normalizeKey(dataset.service || "default");
    var url = explicitUrl || links[key] || links.default;

    if (!url || url === "#") {
      return "";
    }

    return url;
  }

  function buildFallbackPaymentUrl(element) {
    var dataset = element.dataset || {};
    var base = config.fallbackPaymentUrl || config.fallbackQuoteUrl || "contact.html";
    var separator = base.indexOf("?") === -1 ? "?" : "&";
    var item = dataset.service || textOf(element);
    var params = [
      ["item", item],
      ["category", dataset.commerceCategory || ""],
      ["payment", dataset.commerceAction || "payment"]
    ].filter(function (pair) {
      return pair[1];
    }).map(function (pair) {
      return encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]);
    }).join("&");

    return params ? base + separator + params : base;
  }

  function isQuoteLink(element) {
    var href = (element.getAttribute && element.getAttribute("href")) || "";
    var label = textOf(element).toLowerCase();

    return element.dataset && element.dataset.commerceAction === "quote" ||
      /quote|estimate|schedule|consultation|contact/.test(label) ||
      /contact\.html|#contact|#quote/.test(href);
  }

  function isPackageView(element) {
    var action = element.dataset && element.dataset.commerceAction;
    var label = textOf(element).toLowerCase();

    return action === "package-view" ||
      element.hasAttribute && element.hasAttribute("data-package-card") ||
      /view package|package details/.test(label);
  }

  function isServiceView(element) {
    var action = element.dataset && element.dataset.commerceAction;
    var label = textOf(element).toLowerCase();

    return action === "service-view" ||
      element.hasAttribute && element.hasAttribute("data-service-card") ||
      /view details|learn more/.test(label);
  }

  function handleCommerceClick(event) {
    var target = getLink(event.target);

    if (!target) {
      return;
    }

    var action = (target.dataset && target.dataset.commerceAction) || "";
    var payload = readPayload(target);

    if (target.matches && target.matches("a[href^='tel:']")) {
      track("phone_click", Object.assign(payload, {
        phone: target.getAttribute("href").replace(/^tel:/, "")
      }));
      return;
    }

    if (action === "pay-deposit") {
      var stripeUrl = getStripeUrl(target);

      track("pay_deposit_click", payload);

      if (stripeUrl) {
        event.preventDefault();
        window.location.href = stripeUrl;
        return;
      }

      if (target.getAttribute("href") === "#" || target.getAttribute("href") === "#pay-deposit" || target.tagName.toLowerCase() === "button") {
        event.preventDefault();
        window.location.href = buildFallbackPaymentUrl(target);
      }

      return;
    }

    if (isPackageView(target)) {
      track("package_view", payload);
    }

    if (isServiceView(target)) {
      track("service_card_click", payload);
    }

    if (isQuoteLink(target)) {
      track("quote_click", payload);
    }
  }

  function init() {
    if (initialized) {
      return;
    }

    initialized = true;
    loadGa4(config.ga4MeasurementId);
    document.addEventListener("click", handleCommerceClick, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.CallTechCommerce = {
    track: track,
    getStripeUrl: getStripeUrl
  };
})();

(function () {
  var form = document.getElementById("contactForm");
  if (!form) {
    return;
  }

  var status = document.getElementById("contactFormStatus");
  var submitButton = form.querySelector(".calltech-submit-button");
  var submitLabel = form.querySelector("[data-submit-label]");
  var quoteModal = document.querySelector("[data-ct-quote-modal]");
  var quotePanel = quoteModal ? quoteModal.querySelector(".ct-quote-panel") : null;
  var lastQuoteTrigger = null;

  var validators = {
    name: function (value) {
      return value.length >= 2 ? "" : "Please enter your name.";
    },
    phone: function (value) {
      return /^[0-9+().\-\s]{7,}$/.test(value)
        ? ""
        : "Please enter a valid phone number.";
    },
    email: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Please enter a valid email address.";
    },
    location: function (value) {
      return value.length >= 2 ? "" : "Please enter your city or ZIP code.";
    },
    service: function (value) {
      return value ? "" : "Please select a service.";
    },
    message: function (value) {
      return value.length >= 10
        ? ""
        : "Please add a few project details.";
    },
  };

  var serviceMap = {
    "security-camera-installation": "Security Camera Installation",
    "video-doorbell-smart-lock-installation": "Video Doorbell & Smart Lock Installation",
    "low-voltage-wiring": "Low Voltage Wiring",
    "home-theater-installation": "Home Theater Installation",
    "smart-home-hub-setup": "Smart Home Hub Setup",
    "unified-home-protection": "Unified Home Protection",
    "smart-wifi-network-setup": "Smart Wi-Fi / Network Setup",
  };

  function setStatus(message, type) {
    if (!status) {
      return;
    }

    status.textContent = message || "";
    status.classList.remove("is-success", "is-error");

    if (type) {
      status.classList.add("is-" + type);
    }
  }

  function setService(value) {
    var serviceField = form.elements.service;

    if (!serviceField) {
      return;
    }

    var matchingOption = Array.prototype.slice.call(serviceField.options).some(function (option) {
      return option.value === value;
    });

    serviceField.value = matchingOption ? value : "Other / Not Sure";
  }

  function openQuoteModal(trigger) {
    if (!quoteModal) {
      return;
    }

    var dataset = trigger.dataset || {};
    var service = dataset.ctQuoteService || dataset.service || "";
    var message = dataset.ctQuoteMessage || "";
    var detailModal = document.querySelector("[data-ct-modal]");

    lastQuoteTrigger = trigger;
    setStatus("");

    if (service) {
      setService(service);
    } else if (message) {
      setService("Other / Not Sure");
    }

    if (message && form.elements.message) {
      form.elements.message.value = message;
    }

    if (detailModal) {
      detailModal.hidden = true;
    }

    quoteModal.hidden = false;
    document.body.classList.add("ct-modal-open");

    if (quotePanel) {
      quotePanel.focus();
    }
  }

  function closeQuoteModal() {
    if (!quoteModal) {
      return;
    }

    quoteModal.hidden = true;
    document.body.classList.remove("ct-modal-open");

    if (lastQuoteTrigger) {
      lastQuoteTrigger.focus();
    }
  }

  function setFieldError(fieldName, message) {
    var field = form.elements[fieldName];
    var error = form.querySelector('[data-error-for="' + fieldName + '"]');
    var wrapper = field ? field.closest(".calltech-field") : null;

    if (wrapper) {
      wrapper.classList.toggle("is-invalid", Boolean(message));
    }

    if (field) {
      field.setAttribute("aria-invalid", message ? "true" : "false");
    }

    if (error) {
      error.textContent = message || "";
    }
  }

  function validateForm() {
    var isValid = true;

    Object.keys(validators).forEach(function (fieldName) {
      var field = form.elements[fieldName];
      var value = field ? field.value.trim() : "";
      var message = validators[fieldName](value);

      setFieldError(fieldName, message);

      if (message) {
        isValid = false;
      }
    });

    return isValid;
  }

  Object.keys(validators).forEach(function (fieldName) {
    var field = form.elements[fieldName];
    if (!field) {
      return;
    }

    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") {
        setFieldError(fieldName, validators[fieldName](field.value.trim()));
      }
    });

    field.addEventListener("blur", function () {
      setFieldError(fieldName, validators[fieldName](field.value.trim()));
    });
  });

  function prefillFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var requested = params.get("service") || params.get("item");
    var serviceField = form.elements.service;
    var messageField = form.elements.message;

    if (!requested || !serviceField) {
      return;
    }

    var value = serviceMap[requested] || requested;
    setService(value);

    if (messageField && !messageField.value && params.get("payment")) {
      messageField.value = "I would like to pay online for: " + value + ". Please send me the correct checkout link.";
    }
  }

  prefillFromUrl();

  document.addEventListener("click", function (event) {
    var opener = event.target.closest("[data-ct-quote-open]");

    if (opener) {
      event.preventDefault();
      openQuoteModal(opener);
      return;
    }

    if (event.target.closest("[data-ct-quote-close]")) {
      event.preventDefault();
      closeQuoteModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && quoteModal && !quoteModal.hidden) {
      closeQuoteModal();
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setStatus("");

    if (!validateForm()) {
      setStatus("Please fix the highlighted fields and try again.", "error");
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    if (submitLabel) {
      submitLabel.textContent = "Sending...";
    }

    fetch(form.getAttribute("action") || "email.php", {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response
          .json()
          .catch(function () {
            return {
              ok: false,
              message: "The server returned an invalid response.",
            };
          })
          .then(function (data) {
            if (!response.ok || !data.ok) {
              throw data;
            }

            return data;
          });
      })
      .then(function (data) {
        form.reset();
        Object.keys(validators).forEach(function (fieldName) {
          setFieldError(fieldName, "");
        });
        setStatus(
          data.message ||
            "Thank you. Your request was sent and we will follow up shortly.",
          "success"
        );
      })
      .catch(function (error) {
        setStatus(
          (error && error.message) ||
            "We could not send your request. Please call or try again.",
          "error"
        );
      })
      .finally(function () {
        if (submitButton) {
          submitButton.disabled = false;
        }

        if (submitLabel) {
          submitLabel.textContent = "Send request";
        }
      });
  });
})();

(function () {
	'use strict';

	var details = {
		'security-camera': {
			type: 'Service',
			title: 'Security Camera Installation',
			image: 'wp-content/uploads/2023/services/sec-camera.jpg',
			description: 'Protect the areas that matter most with professionally installed indoor or outdoor cameras, clean cable routing, and mobile access from anywhere.',
			included: [
				'Walkthrough for camera placement and viewing angles',
				'Mounting for indoor, outdoor, driveway, entry, or yard coverage',
				'Wired or wireless setup based on the property',
				'Recording, alerts, and mobile app configuration'
			],
			bestFor: ['Homes and townhomes', 'Driveways and side yards', 'Small offices', 'Entryways and garages'],
			note: 'A $99 online deposit reserves the appointment and is applied to the final invoice. Final balance is confirmed after the site details are reviewed.',
			price: '99',
			quoteHref: 'contact.html?service=security-camera-installation',
			paymentCategory: 'deposits',
			paymentKey: 'securityCameraInstallation'
		},
		'smart-entry': {
			type: 'Service',
			title: 'Video Doorbell & Smart Lock Installation',
			image: 'wp-content/uploads/2023/services/security-cameras.png',
			description: 'Modernize your front door with a video doorbell and smart lock installed, connected, and explained in plain English.',
			included: [
				'Video doorbell mounting and app setup',
				'Smart lock installation and calibration',
				'Guest codes, notifications, and access settings',
				'Basic homeowner training before we leave'
			],
			bestFor: ['Front doors', 'Rental properties', 'Busy families', 'Homeowners who want keyless access'],
			note: 'A $79 online deposit reserves the appointment and is applied to the final invoice. Some doorbells require existing low-voltage wiring or a compatible transformer.',
			price: '79',
			quoteHref: 'contact.html?service=video-doorbell-smart-lock-installation',
			paymentCategory: 'deposits',
			paymentKey: 'videoDoorbellSmartLock'
		},
		'low-voltage': {
			type: 'Service',
			title: 'Low Voltage Wiring',
			image: 'wp-content/uploads/2023/services/low-wiring.webp',
			description: 'Clean, reliable wiring for cameras, networks, access points, media rooms, and smart home upgrades.',
			included: [
				'Cable path planning for a clean finish',
				'Ethernet, camera, speaker, or device wiring',
				'Wall plates, terminations, and labeling',
				'Testing after installation'
			],
			bestFor: ['Camera systems', 'Wi-Fi access points', 'Home offices', 'Media rooms and renovations'],
			note: 'A $149 online deposit reserves the appointment and is applied to the final invoice. Final pricing depends on wall type, crawlspace or attic access, cable distance, and number of drops.',
			price: '149',
			quoteHref: 'contact.html?service=low-voltage-wiring',
			paymentCategory: 'deposits',
			paymentKey: 'lowVoltageWiring'
		},
		'home-theater': {
			type: 'Service',
			title: 'Home Theater Installation',
			image: 'wp-content/uploads/2023/services/home-t-1.jpg',
			description: 'Turn the room into a cleaner, easier entertainment space with TV mounting, source setup, audio configuration, and cable management.',
			included: [
				'TV mounting and placement support',
				'Receiver, soundbar, speaker, or streaming setup',
				'Cable concealment and cleanup options',
				'Remote and input walkthrough'
			],
			bestFor: ['Living rooms', 'Media rooms', 'Apartments', 'Family entertainment spaces'],
			note: 'A $99 online deposit reserves the appointment and is applied to the final invoice. For wall-mounted TVs, please share the screen size, wall type, and whether you already have a mount.',
			price: '99',
			quoteHref: 'contact.html?service=home-theater-installation',
			paymentCategory: 'deposits',
			paymentKey: 'homeTheaterInstallation'
		},
		'smart-hub': {
			type: 'Service',
			title: 'Smart Home Hub Setup',
			image: 'wp-content/uploads/2023/services/Smart-Home-Hubs.jpg',
			description: 'Bring smart devices together with hub pairing, rooms, scenes, automations, and voice assistant setup.',
			included: [
				'Hub setup and device pairing',
				'Room naming, groups, and basic scenes',
				'Voice assistant and app configuration',
				'Practical homeowner walkthrough'
			],
			bestFor: ['Smart switches and sensors', 'Mixed brand devices', 'Voice control', 'Home automation upgrades'],
			note: 'A $79 online deposit reserves the appointment and is applied to the final invoice. We can organize existing devices or set up a new smart home system from scratch.',
			price: '79',
			quoteHref: 'contact.html?service=smart-home-hub-setup',
			paymentCategory: 'deposits',
			paymentKey: 'smartHomeHubSetup'
		},
		'home-protection': {
			type: 'Service',
			title: 'Unified Home Protection',
			image: 'wp-content/uploads/2023/services/video-surv.jpg',
			description: 'A complete smart protection setup that connects cameras, smart locks, video doorbells, sensors, and mobile alerts into one practical system.',
			included: [
				'Whole home protection walkthrough',
				'Camera, doorbell, lock, and sensor planning',
				'Device installation and app setup',
				'Alert, access, and user permission configuration'
			],
			bestFor: ['Families', 'Single-family homes', 'Townhomes', 'Homeowners upgrading multiple devices'],
			note: 'A $149 online deposit starts the planning appointment and is applied to the final invoice. This is usually a custom quote because every home layout is different.',
			price: '149',
			quoteHref: 'contact.html?service=unified-home-protection',
			paymentCategory: 'deposits',
			paymentKey: 'unifiedHomeProtection'
		},
		'network-setup': {
			type: 'Service',
			title: 'Smart Wi-Fi / Network Setup',
			image: 'wp-content/uploads/2023/06/wifi.webp',
			description: 'Improve coverage and reliability for work, streaming, cameras, and smart devices with a properly configured home network.',
			included: [
				'Coverage review and router placement guidance',
				'Router, mesh, or access point setup',
				'Network naming and device connection help',
				'Basic security and performance settings'
			],
			bestFor: ['Home offices', 'Large homes', 'Outdoor cameras', 'Streaming and smart devices'],
			note: 'A $79 online deposit reserves the appointment and is applied to the final invoice. If you already own equipment, send the model names so we can confirm compatibility.',
			price: '79',
			quoteHref: 'contact.html?service=smart-wifi-network-setup',
			paymentCategory: 'deposits',
			paymentKey: 'networkSetup'
		}
	};

	var modal = document.querySelector('[data-ct-modal]');
	if (!modal) {
		return;
	}

	var panel = modal.querySelector('.ct-modal-panel');
	var image = modal.querySelector('[data-ct-modal-image]');
	var type = modal.querySelector('[data-ct-modal-type]');
	var title = modal.querySelector('[data-ct-modal-title]');
	var description = modal.querySelector('[data-ct-modal-description]');
	var included = modal.querySelector('[data-ct-modal-included]');
	var best = modal.querySelector('[data-ct-modal-best]');
	var note = modal.querySelector('[data-ct-modal-note]');
	var quote = modal.querySelector('[data-ct-modal-quote]');
	var pay = modal.querySelector('[data-ct-modal-pay]');
	var lastTrigger = null;

	function fillList(node, items) {
		node.innerHTML = '';
		items.forEach(function (item) {
			var li = document.createElement('li');
			li.textContent = item;
			node.appendChild(li);
		});
	}

	function openModal(key, trigger) {
		var item = details[key];
		if (!item) {
			return;
		}

		lastTrigger = trigger;
		image.src = item.image;
		image.alt = item.title;
		type.textContent = item.type;
		title.textContent = item.title;
		description.textContent = item.description;
		fillList(included, item.included);
		fillList(best, item.bestFor);
		note.textContent = item.note;
		quote.href = '#quote';
		quote.dataset.ctQuoteOpen = '';
		quote.dataset.ctQuoteService = item.title;
		quote.dataset.ctQuoteMessage = '';
		pay.href = '#pay-deposit';
		pay.textContent = 'Pay Deposit';
		pay.dataset.ctPayment = key;
		pay.dataset.commerceAction = 'pay-deposit';
		pay.dataset.commerceCategory = item.paymentCategory || 'deposits';
		pay.dataset.stripeLinkKey = item.paymentKey || 'default';
		pay.dataset.service = item.type === 'Service' ? item.title : '';
		pay.dataset.package = '';
		pay.dataset.product = '';
		pay.dataset.price = item.price || '';
		pay.dataset.currency = item.price ? 'USD' : '';

		modal.hidden = false;
		document.body.classList.add('ct-modal-open');
		panel.focus();
	}

	function closeModal() {
		modal.hidden = true;
		document.body.classList.remove('ct-modal-open');
		if (lastTrigger) {
			lastTrigger.focus();
		}
	}

	document.addEventListener('click', function (event) {
		var opener = event.target.closest('[data-ct-open]');
		if (opener) {
			event.preventDefault();
			openModal(opener.dataset.ctOpen, opener);
			return;
		}

		if (event.target.closest('[data-ct-close]')) {
			event.preventDefault();
			closeModal();
		}
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && !modal.hidden) {
			closeModal();
		}
	});
})();

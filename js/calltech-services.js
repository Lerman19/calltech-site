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
		},
		'starter-camera': {
			type: 'Package',
			title: 'Starter Camera Setup',
			image: 'wp-content/uploads/2023/services/sec-camera.jpg',
			description: 'A practical two-camera starting point for homeowners who want coverage at the most important entry points.',
			included: ['Two camera mounting points', 'App setup and account connection', 'Basic alert tuning', 'Recording configuration support'],
			bestFor: ['Front entry', 'Driveway', 'Garage', 'Small homes'],
			note: 'A $99 online deposit reserves the appointment and is applied to the final invoice. Hardware, extra wiring, and final balance are confirmed before work begins.',
			price: '99',
			quoteHref: 'contact.html?package=starter-camera-setup',
			paymentCategory: 'packages',
			paymentKey: 'starterCameraSetup'
		},
		'entry-package': {
			type: 'Package',
			title: 'Smart Entry Package',
			image: 'wp-content/uploads/2023/services/security-cameras.png',
			description: 'A front door upgrade with a smart lock and video doorbell so you can see visitors and manage access from your phone.',
			included: ['Doorbell installation', 'Smart lock installation', 'Guest code setup', 'Notification walkthrough'],
			bestFor: ['Front doors', 'Rental access', 'Guest entry', 'Package visibility'],
			note: 'A $79 online deposit reserves the appointment and is applied to the final invoice. A compatibility check may be needed for door thickness, deadbolt style, and doorbell wiring.',
			price: '79',
			quoteHref: 'contact.html?package=smart-entry-package',
			paymentCategory: 'packages',
			paymentKey: 'smartEntryPackage'
		},
		'wifi-package': {
			type: 'Package',
			title: 'Wi-Fi Coverage Upgrade',
			image: 'wp-content/uploads/2023/06/wifi.webp',
			description: 'A focused network upgrade for better coverage in offices, bedrooms, garages, and outdoor device zones.',
			included: ['Coverage review', 'Router or mesh setup', 'Access point placement guidance', 'Smart device reconnection help'],
			bestFor: ['Home offices', 'Smart cameras', 'Streaming rooms', 'Dead zones'],
			note: 'A $79 online deposit reserves the appointment and is applied to the final invoice. Equipment can be customer-provided or selected after a consultation.',
			price: '79',
			quoteHref: 'contact.html?package=wifi-coverage-upgrade',
			paymentCategory: 'packages',
			paymentKey: 'wifiCoverageUpgrade'
		},
		'theater-package': {
			type: 'Package',
			title: 'Home Theater Starter',
			image: 'wp-content/uploads/2023/services/home-t-desc.jpg',
			description: 'A clean starter setup for mounting a TV, reducing cable clutter, and getting streaming or basic audio working properly.',
			included: ['TV mounting support', 'Streaming device setup', 'Cable management', 'Basic audio configuration'],
			bestFor: ['Living rooms', 'Apartments', 'Media corners', 'New TVs'],
			note: 'A $99 online deposit reserves the appointment and is applied to the final invoice. Please provide the TV size, wall type, and mount details before the appointment.',
			price: '99',
			quoteHref: 'contact.html?package=home-theater-starter',
			paymentCategory: 'packages',
			paymentKey: 'homeTheaterStarter'
		},
		'whole-home-package': {
			type: 'Package',
			title: 'Whole Home Protection',
			image: 'wp-content/uploads/2023/services/video-surv.jpg',
			description: 'A larger protection package for homeowners who want cameras, smart entry, hub setup, and mobile alerts working together.',
			included: ['Whole home walkthrough', 'Device plan by entry point', 'Camera and smart entry setup', 'Unified mobile controls'],
			bestFor: ['Single-family homes', 'Families', 'Multi-entry homes', 'Full security upgrades'],
			note: 'A $149 online deposit starts the planning appointment and is applied to the final invoice. This package begins with a consultation so the system fits the home layout and customer priorities.',
			price: '149',
			quoteHref: 'contact.html?package=whole-home-protection',
			paymentCategory: 'packages',
			paymentKey: 'wholeHomeProtection'
		},
		'camera-kit': {
			type: 'Product',
			title: 'Security Camera Starter Kit',
			image: 'wp-content/uploads/2023/services/sec-camera.jpg',
			description: 'A practical starter bundle for homeowners who want outdoor coverage with app access and professional installation guidance.',
			included: ['Camera recommendation', 'Mounting and placement plan', 'Recording and alert setup', 'Mobile app walkthrough'],
			bestFor: ['Driveways', 'Front entries', 'Garages', 'Small homes'],
			note: 'Use Buy Now after the final equipment choice is confirmed. If you are not sure which camera fits the home, request a quote first.',
			quoteHref: 'contact.html?product=security-camera-starter-kit',
			paymentCategory: 'products',
			paymentKey: 'securityCameraKit'
		},
		'doorbell-kit': {
			type: 'Product',
			title: 'Video Doorbell Kit',
			image: 'wp-content/uploads/2023/services/security-cameras.png',
			description: 'A front-door upgrade built around visitor video, package visibility, notifications, and phone-based access.',
			included: ['Doorbell compatibility check', 'Transformer and wiring review', 'App setup', 'Notification walkthrough'],
			bestFor: ['Front doors', 'Package deliveries', 'Rental access', 'Busy households'],
			note: 'Buy Now is best after wiring compatibility is confirmed. Older homes may need a transformer or wiring adjustment.',
			quoteHref: 'contact.html?product=video-doorbell-kit',
			paymentCategory: 'products',
			paymentKey: 'videoDoorbellKit'
		},
		'mesh-wifi-kit': {
			type: 'Product',
			title: 'Mesh Wi-Fi Upgrade Kit',
			image: 'wp-content/uploads/2023/06/wifi.webp',
			description: 'A cleaner home network upgrade for stronger coverage, smarter device placement, and fewer dead zones.',
			included: ['Mesh router recommendation', 'Placement plan', 'Network setup', 'Device reconnection help'],
			bestFor: ['Home offices', 'Large homes', 'Streaming rooms', 'Outdoor cameras'],
			note: 'Buy Now after the home size and internet plan are reviewed so the equipment is sized correctly.',
			quoteHref: 'contact.html?product=mesh-wifi-upgrade-kit',
			paymentCategory: 'products',
			paymentKey: 'meshWifiKit'
		},
		'smart-lock-kit': {
			type: 'Product',
			title: 'Smart Lock Kit',
			image: 'wp-content/uploads/2023/services/security-cameras.png',
			description: 'Keyless entry with phone control, user codes, guest access, and a clean installation on a compatible door.',
			included: ['Door and deadbolt compatibility review', 'Smart lock installation', 'Guest code setup', 'Owner walkthrough'],
			bestFor: ['Front doors', 'Rental properties', 'Family access', 'Guest entry'],
			note: 'Buy Now after door thickness, deadbolt style, and finish preference are confirmed.',
			quoteHref: 'contact.html?product=smart-lock-kit',
			paymentCategory: 'products',
			paymentKey: 'smartLockKit'
		},
		'theater-kit': {
			type: 'Product',
			title: 'Home Theater Setup Kit',
			image: 'wp-content/uploads/2023/services/home-t-desc.jpg',
			description: 'A TV, streaming, and audio setup path for homeowners who want a clean entertainment space without guesswork.',
			included: ['Mount and cable plan', 'Streaming device setup', 'Soundbar or receiver guidance', 'Remote and input walkthrough'],
			bestFor: ['Living rooms', 'Media rooms', 'New TVs', 'Apartments'],
			note: 'Buy Now after TV size, wall type, and mount details are confirmed.',
			quoteHref: 'contact.html?product=home-theater-setup-kit',
			paymentCategory: 'products',
			paymentKey: 'homeTheaterSetupKit'
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
		quote.href = item.quoteHref || 'contact.html';
		pay.href = '#pay-deposit';
		pay.textContent = item.type === 'Product' ? 'Buy Now' : 'Pay Deposit';
		pay.dataset.ctPayment = key;
		pay.dataset.commerceAction = item.type === 'Product' ? 'buy-product' : item.type === 'Package' ? 'buy-package' : 'pay-deposit';
		pay.dataset.commerceCategory = item.paymentCategory || 'deposits';
		pay.dataset.stripeLinkKey = item.paymentKey || 'default';
		pay.dataset.service = item.type === 'Service' ? item.title : '';
		pay.dataset.package = item.type === 'Package' ? item.title : '';
		pay.dataset.product = item.type === 'Product' ? item.title : '';
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

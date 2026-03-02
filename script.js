(() => {
	const params = new URLSearchParams(location.search);
	const DEMO = params.get('demo') === '1';

	const STATIC_DATE_LINE = 'Happy Birthday to you';

	let frozen = false;
	let switched = false;
	let envShown = false;
	let clockTimer = null;
	let countdownTimer = null;

	function el(id) {
		return document.getElementById(id);
	}

	function pad2(n) {
		return String(n).padStart(2, '0');
	}

	function setClockDisplay(h, m, s) {
		const hoursEl = el('hours');
		const minutesEl = el('minutes');
		const secondsEl = el('seconds');
		if (hoursEl) hoursEl.textContent = pad2(h);
		if (minutesEl) minutesEl.textContent = pad2(m);
		if (secondsEl) secondsEl.textContent = pad2(s);
	}

	function initQuestionUI() {
		const noBtn = el('noBtn');
		const yesBtn = el('yesBtn');
		const img = el('main-img');
		const wrapper = el('button-wrapper');

		if (!noBtn || !yesBtn || !img || !wrapper) return;

		const imageList = ['images/g1.gif', 'images/g2.gif', 'images/g3.gif', 'images/g4.gif', 'images/g5.gif'];
		let idx = 0;
		img.src = imageList[0];
		setInterval(() => {
			idx = (idx + 1) % imageList.length;
			img.src = imageList[idx];
		}, 3000);

		function moveNoButton() {
			noBtn.style.position = 'fixed';
			const maxX = window.innerWidth - Math.max(0, noBtn.offsetWidth || 150);
			const maxY = window.innerHeight - Math.max(0, noBtn.offsetHeight || 60);
			noBtn.style.left = `${Math.random() * Math.max(0, maxX)}px`;
			noBtn.style.top = `${Math.random() * Math.max(0, maxY)}px`;
		}

		noBtn.addEventListener('mouseenter', moveNoButton);
		noBtn.addEventListener('touchstart', (e) => {
			e.preventDefault();
			moveNoButton();
		});

		yesBtn.addEventListener('click', () => {
			wrapper.style.display = 'none';
			startMessageSequenceThenReplacement();
		});
	}

	function startMessageSequenceThenReplacement() {
		const questionSection = el('question-section');
		if (questionSection) questionSection.style.display = 'none';

		const messages = el('messages-section');
		if (!messages) {
			startReplacementUI();
			return;
		}

		messages.classList.remove('hidden');
		messages.style.display = 'flex';

		const lines = Array.from(messages.querySelectorAll('.message-line'));
		const originalText = lines.map((n) => n.textContent || '');
		lines.forEach((n) => {
			n.textContent = '';
			n.classList.remove('show');
		});

		const typeSpeed = 35;
		const afterLineDelay = 550;

		function typeLine(lineIndex, charIndex) {
			lines.forEach((l) => l.classList.remove('show'));
			const node = lines[lineIndex];
			if (!node) return;
			node.classList.add('show');
			node.textContent = originalText[lineIndex].slice(0, charIndex);
			if (charIndex <= originalText[lineIndex].length) {
				setTimeout(() => typeLine(lineIndex, charIndex + 1), typeSpeed);
			} else {
				setTimeout(() => {
					if (lineIndex + 1 < lines.length) {
						typeLine(lineIndex + 1, 1);
					} else {
						setTimeout(() => {
							messages.classList.add('hidden');
							messages.style.display = 'none';
							startReplacementUI();
						}, 600);
					}
				}, afterLineDelay);
			}
		}

		// start typing
		typeLine(0, 1);
	}

	function initAudioOnFirstInteraction() {
		const handler = () => {
			const audio = el('myAudio');
			if (audio) {
				try {
					audio.currentTime = 0;
					audio.play();
				} catch {
					// ignore
				}
			}
			document.removeEventListener('click', handler);
			document.removeEventListener('touchstart', handler);
		};
		document.addEventListener('click', handler, { passive: true });
		document.addEventListener('touchstart', handler, { passive: true });
	}

	function initBgmClickToPlay() {
		const audio = el('bgm');
		if (!audio) return;
		try {
			audio.volume = 0.7;
		} catch {
			// ignore
		}

		let started = false;
		const events = ['pointerdown', 'touchstart', 'click', 'keydown'];
		const opts = { capture: true, passive: true };
		const cleanup = () => events.forEach((ev) => document.removeEventListener(ev, onFirstInteract, opts));

		function onFirstInteract() {
			if (started) return;
			started = true;
			const p = audio.play();
			if (p && typeof p.then === 'function') {
				p.then(cleanup).catch(() => {
					started = false;
				});
			} else {
				cleanup();
			}
		}

		events.forEach((ev) => document.addEventListener(ev, onFirstInteract, opts));
	}

	function spawnFloatingHearts() {
		const heartsLayer = el('hearts');
		if (!heartsLayer) return;

		function spawnHeart() {
			const h = document.createElement('span');
			h.className = 'float-heart';
			const x = Math.random() * 100; // vw
			const size = 14 + Math.random() * 14;
			const hue = 335 + Math.random() * 30;
			const dur = 5 + Math.random() * 4;
			h.style.left = x + 'vw';
			h.style.bottom = `-${Math.ceil(size)}px`;
			h.style.setProperty('--size', size + 'px');
			h.style.setProperty('--color', `hsl(${hue} 95% 70%)`);
			h.style.setProperty('--dur', dur + 's');
			heartsLayer.appendChild(h);
			setTimeout(() => h.remove(), dur * 1000);
		}

		setInterval(spawnHeart, 280);
		for (let i = 0; i < 24; i++) setTimeout(spawnHeart, i * 90);
	}

	function updateClock() {
		if (frozen) return;
		const now = new Date();

		const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
		const months = [
			'Tháng 1',
			'Tháng 2',
			'Tháng 3',
			'Tháng 4',
			'Tháng 5',
			'Tháng 6',
			'Tháng 7',
			'Tháng 8',
			'Tháng 9',
			'Tháng 10',
			'Tháng 11',
			'Tháng 12'
		];

		const dateEl = el('date');
		if (dateEl) {
			const dayName = days[now.getDay()];
			const day = now.getDate();
			const month = months[now.getMonth()];
			const year = now.getFullYear();
			dateEl.textContent = `${dayName}, Ngày ${day} ${month} ${year}`;
		}

		setClockDisplay(now.getHours(), now.getMinutes(), now.getSeconds());

		const h = now.getHours();
		const m = now.getMinutes();
		const s = now.getSeconds();
		if (!switched && h === 23 && m === 59 && s >= 55) {
			beginFrozenSequence();
		}
	}

	function beginFrozenSequence() {
		if (frozen) return;
		frozen = true;

		if (clockTimer) {
			clearInterval(clockTimer);
			clockTimer = null;
		}

		const dateEl = el('date');
		if (dateEl) dateEl.textContent = STATIC_DATE_LINE;

		setClockDisplay(23, 59, 55);
		// Numeric overlay countdown removed from HTML; keep only the clock.

		const steps = [
			{ h: 23, m: 59, s: 55 },
			{ h: 23, m: 59, s: 56 },
			{ h: 23, m: 59, s: 57 },
			{ h: 23, m: 59, s: 58 },
			{ h: 23, m: 59, s: 59 },
			{ h: 0, m: 0, s: 0 }
		];

		let idx = 0;
		if (countdownTimer) clearInterval(countdownTimer);

		const applyStep = (t) => {
			setClockDisplay(t.h, t.m, t.s);
		};

		applyStep(steps[idx]);
		countdownTimer = setInterval(() => {
			idx += 1;
			applyStep(steps[idx]);
			if (idx === steps.length - 1) {
				clearInterval(countdownTimer);
				countdownTimer = null;
				if (countdownEl) countdownEl.classList.add('hidden');

				setTimeout(() => {
					const clockContainer = document.querySelector('.clock-container');
					if (clockContainer) clockContainer.classList.add('hidden');

					const env = el('envelope-overlay');
					if (!envShown && env) {
						envShown = true;
						env.classList.remove('hidden');
						env.setAttribute('aria-hidden', 'false');

						const clickable = env.querySelector('.letter') || env;
						const openHandler = () => {
							env.classList.add('hidden');
							env.setAttribute('aria-hidden', 'true');
							const ui = el('new-ui');
							if (ui) ui.classList.remove('hidden');
							startLetterUI();
							switched = true;
						};

						clickable.addEventListener('click', openHandler, { once: true });
						clickable.addEventListener(
							'keydown',
							(e) => {
								if (e.key === 'Enter' || e.key === ' ') openHandler();
							},
							{ once: true }
						);
					}
				}, 800);
			}
		}, 1000);
	}

	function startLetterUI() {
		const h2El = document.querySelector('#new-ui .textLetter h2');
		const pEl = document.querySelector('#new-ui .textLetter .contentLetter');
		const seeGiftBtn = el('see-gift');
		if (!h2El || !pEl) return;

		const title = 'Happy Birthday Anh!';
		const body =
			'Chúc anh sinh nhật thật vui và luôn bình an. Cảm ơn anh vì đã từng xuất hiện trong cuộc đời em và cho em rất nhiều bài học. Từ nay em sẽ giữ mọi điều đẹp nhất ở trong lòng; mong anh hạnh phúc và gặp được người có thể ở bên anh đến cuối con đường. ❤ — Puka —';

		h2El.textContent = '';
		pEl.textContent = '';

		let i = 0;
		function typeTitle() {
			if (i < title.length) {
				h2El.textContent += title.charAt(i++);
				setTimeout(typeTitle, 70);
			} else {
				let j = 0;
				function typeBody() {
					if (j < body.length) {
						pEl.textContent += body.charAt(j++);
						setTimeout(typeBody, 35);
					} else {
						if (seeGiftBtn) seeGiftBtn.classList.remove('hidden');
					}
				}
				setTimeout(typeBody, 300);
			}
		}
		typeTitle();

		if (seeGiftBtn) {
			seeGiftBtn.onclick = () => {
				const ui = el('new-ui');
				if (ui) ui.classList.add('hidden');
				const gift = el('gift-ui');
				if (gift) gift.classList.remove('hidden');
				startGiftExperience();
			};
		}
	}

	const heartImages = [
		'img/anh1.jpg',
		'img/anh2.jpg',
		'img/anh3.jpg',
		'img/anh4.jpg',
		'img/anh5.jpg',
		'img/anh6.jpg',
		'img/anh7.jpg',
		'img/anh8.jpg',
		'img/anh9.jpg',
		'img/anh10.jpg'
	];

	function startGiftExperience() {
		startScrollingHeartImages();
		startRectangleImages();
		const audio = el('myAudio');
		if (audio) {
			try {
				if (audio.paused) audio.play();
			} catch {
				// ignore
			}
		}
	}

	function createRectangleImage() {
		const container = el('heartImagesContainer');
		if (!container) return;
		const img = document.createElement('img');
		img.src = heartImages[Math.floor(Math.random() * heartImages.length)];
		img.className = 'heart-img-scroll';
		img.style.top = Math.random() * 95 + 'vh';
		const duration = 5 + Math.random() * 3;
		img.style.animationDuration = duration + 's';
		container.appendChild(img);
		setTimeout(() => img.remove(), duration * 1000);
	}

	function createScrollingHeartImage({ heartShape }) {
		const container = el('heartImagesContainer');
		if (!container) return;
		const img = document.createElement('img');
		img.src = heartImages[Math.floor(Math.random() * heartImages.length)];
		img.className = 'heart-img-scroll';
		img.style.top = Math.random() * 95 + 'vh';
		const duration = 6 + Math.random() * 3;
		img.style.animationDuration = duration + 's';
		if (heartShape) {
			img.style.clipPath =
				'polygon(50% 15%, 61% 6%, 75% 6%, 87% 14%, 93% 26%, 93% 39%, 88% 50%, 78% 62%, 65% 75%, 50% 88%, 35% 75%, 22% 62%, 12% 50%, 7% 39%, 7% 26%, 13% 14%, 25% 6%, 39% 6%)';
			img.style.webkitClipPath = img.style.clipPath;
			img.style.objectFit = 'cover';
		}
		container.appendChild(img);
		setTimeout(() => img.remove(), duration * 1000);
	}

	function startRectangleImages() {
		const isMobile = window.innerWidth <= 480;
		const isLandscape = window.matchMedia('(orientation: landscape)').matches;
		const initialCount = isMobile ? (isLandscape ? 16 : 6) : 13;
		const intervalTime = isMobile ? (isLandscape ? 400 : 1200) : 550;
		for (let i = 0; i < initialCount; i++) setTimeout(createRectangleImage, i * intervalTime);
		setInterval(createRectangleImage, intervalTime);
	}

	function startScrollingHeartImages() {
		const isMobile = window.innerWidth <= 480;
		const isLandscape = window.matchMedia('(orientation: landscape)').matches;
		const initialCount = isMobile ? (isLandscape ? 18 : 5) : 12;
		const intervalTime = isMobile ? (isLandscape ? 320 : 1400) : 300;
		for (let i = 0; i < initialCount; i++) {
			setTimeout(() => createScrollingHeartImage({ heartShape: i % 3 === 0 }), i * intervalTime);
		}
		setInterval(() => createScrollingHeartImage({ heartShape: Math.random() < 0.33 }), intervalTime);
	}

	function startReplacementUI() {
		const timeline = el('timeline-section');
		if (timeline) timeline.style.display = 'flex';

		// Stop old bgm if it was started earlier
		const bgm = el('bgm');
		if (bgm) {
			try {
				bgm.pause();
			} catch {
				// ignore
			}
		}

		initAudioOnFirstInteraction();
		spawnFloatingHearts();

		// After typing messages: show countdown first, then show the letter UI.
		const ui = el('new-ui');
		if (ui) ui.classList.add('hidden');
		const gift = el('gift-ui');
		if (gift) gift.classList.add('hidden');

		const clockContainer = document.querySelector('.clock-container');
		if (clockContainer) clockContainer.classList.remove('hidden');

		const dateEl = el('date');
		if (dateEl) dateEl.textContent = STATIC_DATE_LINE;
		setClockDisplay(23, 59, 55);

		// Clear any previous countdown interval if present
		if (countdownTimer) {
			clearInterval(countdownTimer);
			countdownTimer = null;
		}

		const steps = [
			{ h: 23, m: 59, s: 55 },
			{ h: 23, m: 59, s: 56 },
			{ h: 23, m: 59, s: 57 },
			{ h: 23, m: 59, s: 58 },
			{ h: 23, m: 59, s: 59 },
			{ h: 0, m: 0, s: 0 }
		];

		let idx = 0;
		const applyStep = (t) => {
			setClockDisplay(t.h, t.m, t.s);
		};

		applyStep(steps[idx]);
		countdownTimer = setInterval(() => {
			idx += 1;
			applyStep(steps[idx]);
			if (idx === steps.length - 1) {
				clearInterval(countdownTimer);
				countdownTimer = null;
				// Small pause on 00:00:00, then open the letter UI
				setTimeout(() => {
					// countdown overlay removed
					if (clockContainer) clockContainer.classList.add('hidden');
					if (ui) ui.classList.remove('hidden');
					startLetterUI();
				}, 800);
			}
		}, 1000);
	}

	function init() {
		initBgmClickToPlay();
		initQuestionUI();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

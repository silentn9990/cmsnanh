(() => {
	const mediaQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
	const urlMotion = new URLSearchParams(window.location.search).get('motion');
	let prefersReduced = mediaQuery && mediaQuery.matches;

	// Allow overriding via query param ?motion=on/off for debugging devices that default to reduced motion
	if (urlMotion === 'on') prefersReduced = false;
	if (urlMotion === 'off') prefersReduced = true;

	function getQueryParam(name) {
		return new URLSearchParams(window.location.search).get(name);
	}

	function base64DecodeUnicode(str) {
		try {
			return decodeURIComponent(
				Array.prototype.map
					.call(atob(str), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
					.join('')
			);
		} catch {
			return null;
		}
	}

	function initHearts() {
		const heartBg = document.getElementById('heart-background');
		if (!heartBg) return;

		const heartColors = ['#ff7eb9', '#ff65a3', '#fcdff0', '#ffb3c6', '#ff6f91', '#f67280', '#ff8fab', '#fcb1b1'];
		const MAX_HEARTS = prefersReduced ? 18 : 40;

		function createHeart() {
			if (heartBg.childElementCount >= MAX_HEARTS) {
				const first = heartBg.firstElementChild;
				if (first) first.remove();
			}

			const heart = document.createElement('div');
			heart.className = 'bg-heart';
			const color = heartColors[Math.floor(Math.random() * heartColors.length)];
			const left = Math.random() * 100;
			const size = 18 + Math.random() * 18;

			heart.style.left = left + 'vw';
			heart.style.bottom = '0';
			heart.style.width = size + 'px';
			heart.style.height = size + 'px';
			heart.style.opacity = String(0.7 + Math.random() * 0.3);
			heart.innerHTML = `<svg viewBox="0 0 32 29.6" aria-hidden="true"><path fill="${color}" d="M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,11.1,16,19.2,16,19.2s16-8.1,16-19.2C32,4.7,27.3,0,23.6,0z"/></svg>`;

			heartBg.appendChild(heart);
			setTimeout(() => {
				heart.remove();
			}, 6000);
		}

		setInterval(createHeart, prefersReduced ? 850 : 400);
	}

	function initBgmClickToPlay() {
		const audio = document.getElementById('bgm');
		if (!audio) return;

		// Optional defaults
		try {
			audio.volume = 0.7;
		} catch {
			// ignore
		}

		let started = false;
		const events = ['pointerdown', 'touchstart', 'click', 'keydown'];
		const opts = { capture: true, passive: true };

		const cleanup = () => {
			events.forEach((ev) => document.removeEventListener(ev, onFirstInteract, opts));
		};

		function onFirstInteract() {
			if (started) return;
			started = true;
			const p = audio.play();
			if (p && typeof p.then === 'function') {
				p.then(cleanup).catch(() => {
					// If the browser blocks it for any reason, allow another attempt.
					started = false;
				});
			} else {
				cleanup();
			}
		}

		events.forEach((ev) => document.addEventListener(ev, onFirstInteract, opts));
	}

	function initQuestionUI() {
		const noBtn = document.getElementById('noBtn');
		const yesBtn = document.getElementById('yesBtn');
		const img = document.getElementById('main-img');
		const text = document.getElementById('main-text');
		const wrapper = document.getElementById('button-wrapper');

		if (!noBtn || !yesBtn || !img || !text || !wrapper) return;

		let finished = false;

		// Thay đổi ảnh câu hỏi liên tục 3s
		const imageList = [
			'images/g1.gif',
			'images/g2.gif',
			'images/g3.gif',
			'images/g4.gif',
			'images/g5.gif'
		];
		let carouselIdx = 0;
		let carouselTimer = null;

		function preloadImages(list) {
			list.forEach((src) => {
				const pre = new Image();
				pre.src = src;
			});
		}

		function startCarousel() {
			try { preloadImages(imageList); } catch {}
			const currentIdx = imageList.indexOf(img.src.split(window.location.origin).pop());
			if (currentIdx >= 0) carouselIdx = currentIdx;
			// Hiển thị ảnh đầu tiên ngay lập tức không delay
			img.src = imageList[carouselIdx];
			const interval = prefersReduced ? 4500 : 3000;
			carouselTimer = setInterval(() => {
				if (finished) return;
				carouselIdx = (carouselIdx + 1) % imageList.length;
				img.src = imageList[carouselIdx];
			}, interval);
		}

		function moveNoButton() {
			if (finished) return;
			noBtn.style.position = 'fixed';
			const maxX = window.innerWidth - noBtn.offsetWidth;
			const maxY = window.innerHeight - noBtn.offsetHeight;
			noBtn.style.left = `${Math.random() * Math.max(0, maxX)}px`;
			noBtn.style.top = `${Math.random() * Math.max(0, maxY)}px`;
		}

		noBtn.addEventListener('mouseenter', moveNoButton);
		noBtn.addEventListener('touchstart', (e) => {
			e.preventDefault();
			moveNoButton();
		});

		// Khi bấm "Có": đi thẳng sang giao diện cuối (timeline)
		yesBtn.addEventListener('click', () => {
			if (finished) return;
			finished = true;
			wrapper.style.display = 'none';
			if (carouselTimer) {
				clearInterval(carouselTimer);
				carouselTimer = null;
			}
			startMessageSequenceThenTimeline();
		});

		// Optional: allow customizing via ?id=<base64-json> like sample
		const idParam = getQueryParam('id');
		if (idParam) {
			try {
				const decoded = base64DecodeUnicode(idParam);
				if (!decoded) throw new Error('Decode failed');
				const data = JSON.parse(decoded);
				if (data.l) img.src = data.l;
				if (data.n) text.textContent = data.n;
				if (data.g) yesBtn.textContent = data.g;
				if (data.h) noBtn.textContent = data.h;

				yesBtn.addEventListener('click', () => {
					wrapper.style.display = 'none';
					img.src = data.m || img.src;
					text.textContent = data.o || text.textContent;
				});
			} catch (err) {
				console.error('Không thể giải mã dữ liệu:', err);
			}
		}

		// Start the carousel (runs even if section hidden; harmless)
		startCarousel();
	}

	function startMessageSequenceThenTimeline() {
		// Hide the question screen so messages are visible
		const questionSection = document.getElementById('question-section');
		if (questionSection) questionSection.style.display = 'none';

		const section = document.getElementById('messages-section');
		if (!section) {
			if (typeof window.sayYes === 'function') window.sayYes();
			return;
		}

		// Reset previous run
		Array.from(section.querySelectorAll('.message-line.show')).forEach((el) => el.classList.remove('show'));

		section.classList.remove('hidden');
		section.style.display = 'flex';
		const lines = Array.from(section.querySelectorAll('.message-line'));
		if (lines.length === 0) {
			if (typeof window.sayYes === 'function') window.sayYes();
			return;
		}

		const ROTATE_MS = prefersReduced ? 1600 : 2800;
		let idx = 0;
		function showNext() {
			if (idx > 0) lines[idx - 1].classList.remove('show');
			if (idx >= lines.length) {
				// Done: move to final timeline
				section.style.display = 'none';
				if (typeof window.sayYes === 'function') window.sayYes();
				return;
			}
			const el = lines[idx];
			el.classList.add('show');
			idx += 1;
			setTimeout(showNext, ROTATE_MS);
		}
		showNext();
	}

	function initMotionToggle() {
		const btn = document.getElementById('motion-toggle');
		if (!btn || !mediaQuery) return;
		const reduceMatch = mediaQuery.matches;
		if (!reduceMatch && urlMotion !== 'off') return; // Only show if device reports reduced motion or explicitly forced off

		btn.classList.remove('hidden');
		btn.addEventListener('click', () => {
			const params = new URLSearchParams(window.location.search);
			params.set('motion', 'on');
			const next = `${window.location.pathname}?${params.toString()}`;
			window.location.href = next;
		});
	}

	function initPhotoCubeControls() {
		const cube = document.querySelector('.photo-cube');
		const auto = document.querySelector('.photo-cube-autorotate');
		if (!cube || !auto) return;
		
		// Preload ảnh của khối lập phương để hiển thị ngay lập tức
		const cubeImages = [
			'images/anh2.jpg',
			'images/anh3.jpg',
			'images/anh4.jpg',
			'images/anh5.jpg',
			'images/anh6.jpg',
			'images/anh7.jpg'
		];
		cubeImages.forEach((src) => {
			const img = new Image();
			img.src = src;
		});
		
		if (prefersReduced) {
			// Keep it moving but slower instead of disabling entirely
			auto.style.animationDuration = '22s';
		}

		let isDragging = false;
		let lastX = 0;
		let lastY = 0;
		let rotY = 0;
		let rotX = 10;

		function applyRotation() {
			// Allow full 360 on Y, clamp X to keep it readable
			if (rotX > 75) rotX = 75;
			if (rotX < -75) rotX = -75;
			rotY = ((rotY % 360) + 360) % 360;
			cube.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
		}

		// ensure a consistent starting tilt
		applyRotation();

		function onPointerDown(e) {
			isDragging = true;
			cube.classList.add('is-dragging');
			lastX = e.clientX;
			lastY = e.clientY;
			// pause auto-rotation while dragging to avoid fighting the user
			auto.style.animationPlayState = 'paused';
			try {
				cube.setPointerCapture(e.pointerId);
			} catch {
				// ignore
			}
		}

		function onPointerMove(e) {
			if (!isDragging) return;
			const dx = e.clientX - lastX;
			const dy = e.clientY - lastY;
			lastX = e.clientX;
			lastY = e.clientY;

			rotY += dx * 0.6;
			rotX -= dy * 0.6;
			applyRotation();
		}

		function onPointerUp(e) {
			if (!isDragging) return;
			isDragging = false;
			cube.classList.remove('is-dragging');
			auto.style.animationPlayState = 'running';
			try {
				cube.releasePointerCapture(e.pointerId);
			} catch {
				// ignore
			}
		}

		cube.addEventListener('pointerdown', onPointerDown);
		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('pointerup', onPointerUp);
		window.addEventListener('pointercancel', onPointerUp);
	}

	document.addEventListener('DOMContentLoaded', () => {
		initMotionToggle();
		initBgmClickToPlay();
		initHearts();
		initQuestionUI();
		initPhotoCubeControls();
	});
})();

const STATIC_DATE_LINE = 'Happy Birthday to you';
        const params = new URLSearchParams(location.search);
        const DEMO = params.get('demo') === '1';

        let switched = false;     // letter UI opened
        let envShown = false;     // envelope overlay shown
        let frozen = false;       // stop real-time clock/date updates
        let clockTimer = null;    // interval id for clock
        let countdownTimer = null;// interval id for manual countdown
        let manualCountdown = 5;  // 5..1 starting at 23:59:55
        function updateClock() {
            const now = new Date();

            const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
            const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

            if (!frozen) {
                const dayName = days[now.getDay()];
                const day = now.getDate();
                const month = months[now.getMonth()];
                const year = now.getFullYear();

                document.getElementById('date').textContent = `${dayName}, Ngày ${day} ${month} ${year}`;

                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                document.getElementById('hours').textContent = hours;
                document.getElementById('minutes').textContent = minutes;
                document.getElementById('seconds').textContent = seconds;
            }

            // Countdown and in-page switch at midnight
            const h = now.getHours();
            const m = now.getMinutes();
            const s = now.getSeconds();
            const countdownEl = document.getElementById('countdown');
            const cdNumberEl = document.getElementById('cd-number');
            const env = document.getElementById('envelope-overlay');

            if (!switched && h === 23 && m === 59 && s >= 55) {
                // Freeze the clock at exactly 23:59:55 and switch to manual countdown
                if (!frozen) {
                    beginFrozenSequence();
                }
            }
        }

        // Helper: start frozen sequence at 23:59:55 and countdown to 00:00:00
        function beginFrozenSequence() {
            if (frozen) return;
            frozen = true;
            // Stop real-time updates
            if (clockTimer) clearInterval(clockTimer);
            // Freeze display time and static date line
            document.getElementById('hours').textContent = '23';
            document.getElementById('minutes').textContent = '59';
            document.getElementById('seconds').textContent = '55';
            document.getElementById('date').textContent = STATIC_DATE_LINE;
            // Show clock container during countdown
            document.querySelector('.clock-container').classList.remove('hidden');
            
            // Deterministic counting UP: 55 -> 56 -> 57 -> 58 -> 59 -> 00:00:00
            const steps = [
                { h: 23, m: 59, s: 55 },
                { h: 23, m: 59, s: 56 },
                { h: 23, m: 59, s: 57 },
                { h: 23, m: 59, s: 58 },
                { h: 23, m: 59, s: 59 },
                { h: 0,  m: 0,  s: 0  }
            ];
            let idx = 0;
            const applyStep = (t) => {
                document.getElementById('hours').textContent = String(t.h).padStart(2, '0');
                document.getElementById('minutes').textContent = String(t.m).padStart(2, '0');
                document.getElementById('seconds').textContent = String(t.s).padStart(2, '0');
            };
            if (countdownTimer) clearInterval(countdownTimer);
            applyStep(steps[idx]);
            countdownTimer = setInterval(() => {
                idx += 1;
                applyStep(steps[idx]);
                if (idx === steps.length - 1) {
                    clearInterval(countdownTimer);
                    // Giữ hiển thị 00:00:00 một chút rồi mới sang thư
                    setTimeout(() => {
                        document.querySelector('.clock-container').classList.add('hidden');
                        const env = document.getElementById('envelope-overlay');
                        if (!envShown) {
                            envShown = true;
                            env.classList.remove('hidden');
                            const openHandler = () => {
                                env.classList.add('hidden');
                                document.getElementById('new-ui').classList.remove('hidden');
                                startLetterUI();
                                env.removeEventListener('click', openHandler);
                                switched = true;
                            };
                            env.addEventListener('click', openHandler, { once: true });
                        }
                    }, 800);
                }
            }, 1000);
        }

        beginFrozenSequence();

        // DEMO mode: append ?demo=1 to URL to freeze immediately
        if (DEMO) {
            // Start countdown immediately but only show envelope at 00:00:00
            beginFrozenSequence();
        }

        // Keyboard shortcut: press 'd' to demo freeze
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'd' && !frozen && !switched) {
                // Start countdown demo; envelope will appear at 00:00:00
                beginFrozenSequence();
            }
        });

        // Floating hearts generator
        const heartsLayer = document.getElementById('hearts');
        function spawnHeart() {
            const h = document.createElement('span');
            h.className = 'heart';
            const x = Math.random() * 100; // vw
            const size = 14 + Math.random() * 14; // px
            const hue = 335 + Math.random() * 30; // pink-ish
            const dur = 5 + Math.random() * 4; // seconds
            h.style.left = x + 'vw';
            h.style.bottom = `-${Math.ceil(size)}px`;
            h.style.setProperty('--size', size + 'px');
            h.style.setProperty('--color', `hsl(${hue} 95% 70%)`);
            h.style.setProperty('--dur', dur + 's');
            heartsLayer.appendChild(h);
            setTimeout(() => h.remove(), dur * 1000);
        }

        // Spawn hearts more frequently
        setInterval(spawnHeart, 280);
        // Larger burst on load
        for (let i = 0; i < 24; i++) setTimeout(spawnHeart, i * 90);

        // Letter UI: typing effect and close handler
        function startLetterUI() {
            const h2El = document.querySelector('#new-ui .textLetter h2');
            const pEl = document.querySelector('#new-ui .textLetter .contentLetter');
            const seeGiftBtn = document.getElementById('see-gift');
            if (!h2El || !pEl) return;
            const title = 'Happy Birthday Em!';
            const body = 'Chúc em sinh nhật thật vui vẻ, luôn xinh đẹp và hạnh phúc. Mong mọi điều tốt đẹp nhất sẽ đến với em: sức khỏe, nụ cười rạng rỡ và những ước mơ đều thành hiện thực. Cảm ơn em vì đã đến và làm cuộc đời trở nên ngọt ngào hơn. Sinh nhật thật rực rỡ nhé!';

            h2El.textContent = '';
            pEl.textContent = '';

            let i = 0;
            function typeTitle() {
                if (i < title.length) {
                    h2El.textContent += title.charAt(i++);
                    // Slow down title typing
                    setTimeout(typeTitle, 70);
                } else {
                    let j = 0;
                    function typeBody() {
                        if (j < body.length) {
                            pEl.textContent += body.charAt(j++);
                            // Slow down body typing
                            setTimeout(typeBody, 35);
                        } else {
                            // Hoàn thành nội dung thư: hiện nút Xem quà
                            if (seeGiftBtn) seeGiftBtn.classList.remove('hidden');
                        }
                    }
                    setTimeout(typeBody, 300);
                }
            }
            typeTitle();

            const closeBtn = document.getElementById('close-letter');
            if (closeBtn) {
                closeBtn.onclick = () => {
                    document.getElementById('new-ui').classList.add('hidden');
                    document.querySelector('.clock-container').classList.remove('hidden');
                    switched = false; // allow showing again next midnight if needed
                };
            }

            // Sự kiện nút Xem quà: chuyển sang giao diện quà trong cùng index
            if (seeGiftBtn) {
                seeGiftBtn.onclick = () => {
                    document.getElementById('new-ui').classList.add('hidden');
                    document.getElementById('gift-ui').classList.remove('hidden');
                    // Khởi động pháo hoa, ảnh chạy, và nhạc
                    startGiftExperience();
                };
            }
        }

        // Gift experience logic (fireworks, scrolling images, audio)
        function startGiftExperience(){
            // Chỉ hiển thị ảnh chạy ngang màn hình, không container ở giữa
            startScrollingHeartImages();
            startRectangleImages();
            // Không khởi động lại nhạc từ đầu khi mở quà
            const audio = document.getElementById('myAudio');
            if (audio){
                try {
                    // Chỉ play tiếp nếu đang tạm dừng; không reset currentTime
                    if (audio.paused) audio.play();
                } catch(e) {}
            }
        }

        function playAudio(){
            const audio = document.getElementById('myAudio');
            if (!audio) return;
            try { audio.play(); } catch(e) {}
        }

        const heartImages = [
            'img/anh1.jpg','img/anh2.jpg','img/anh3.jpg','img/anh4.jpg',
            'img/anh6.jpg','img/anh7.jpg','img/anh5.jpg','img/anh8.jpg',
            'img/anh9.jpg','img/anhh.jpg'
        ];

        function createFireworks(){
            const fireworks = document.getElementById('fireworks');
            if (!fireworks) return;
            const colors = ['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#feca57','#ff9ff3','#54a0ff'];
            for (let i=0;i<13;i++){
                setTimeout(()=>{
                    const firework = document.createElement('div');
                    firework.className = 'firework';
                    firework.style.left = Math.random()*100 + '%';
                    firework.style.top = Math.random()*100 + '%';
                    firework.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
                    firework.style.animationDelay = Math.random()*2 + 's';
                    firework.style.boxShadow = `0 0 20px ${firework.style.backgroundColor}`;
                    fireworks.appendChild(firework);
                    setTimeout(()=> firework.remove(), 2000);
                }, i*350);
            }
        }

        function startContinuousFireworks(){
            createFireworks();
            setInterval(createFireworks, 5000);
        }

        function createRectangleImage(){
            const container = document.getElementById('heartImagesContainer');
            if (!container) return;
            const img = document.createElement('img');
            img.src = heartImages[Math.floor(Math.random()*heartImages.length)];
            img.className = 'heart-img-scroll';
            const randomY = Math.random()*95; img.style.top = randomY + 'vh';
            const duration = 5 + Math.random()*3; img.style.animationDuration = duration + 's';
            const shadowColors = ['rgba(255,255,255,0.4)','rgba(255,255,255,0.5)','rgba(255,255,255,0.6)','rgba(255,255,255,0.3)','rgba(240,240,240,0.5)'];
            img.style.boxShadow = `0 10px 30px ${shadowColors[Math.floor(Math.random()*shadowColors.length)]}`;
            const isMobile = window.innerWidth <= 480;
            const isLandscape = window.matchMedia('(orientation: landscape)').matches;
            const widths = [177,170,220,188,210,240,225,193];
            const heights = [300,310,150,290,210,180,380,330];
            const idx = Math.floor(Math.random()*widths.length);
            // Scale down for mobile screens
            const scale = isMobile ? (isLandscape ? 1.2 : 0.8) : 1.0;
            img.style.width = Math.round(widths[idx] * scale) + 'px';
            img.style.height = Math.round(heights[idx] * scale) + 'px';
            container.appendChild(img);
            setTimeout(()=>{ if (img.parentNode) img.remove(); }, duration*1000);
        }

        function createScrollingHeartImage(){
            const container = document.getElementById('heartImagesContainer');
            if (!container) return;
            const img = document.createElement('img');
            img.src = heartImages[Math.floor(Math.random()*heartImages.length)];
            img.className = 'heart-img-scroll';
            const randomY = Math.random()*95; img.style.top = randomY + 'vh';
            const duration = 6 + Math.random()*3; img.style.animationDuration = duration + 's';
            const shadowColors = ['rgba(255,255,255,0.4)','rgba(255,255,255,0.5)','rgba(255,255,255,0.6)','rgba(255,255,255,0.3)','rgba(240,240,240,0.5)'];
            img.style.boxShadow = `0 9px 25px ${shadowColors[Math.floor(Math.random()*shadowColors.length)]}`;
            const sizes = [210,240,220,230,250,210,215,235];
            const isMobile = window.innerWidth <= 480;
            const isLandscape = window.matchMedia('(orientation: landscape)').matches;
            if (isMobile && isLandscape){
                const base = Math.min(window.innerHeight, window.innerWidth);
                const s = Math.round(base * (0.38 + Math.random()*0.1)); // ~38-48% of short side
                img.style.width = s + 'px';
                img.style.height = s + 'px';
            } else {
                const scale = isMobile ? 0.85 : 1.0;
                img.style.width = Math.round(sizes[Math.floor(Math.random()*sizes.length)] * scale) + 'px';
                img.style.height = img.style.width;
            }
            container.appendChild(img);
            setTimeout(()=>{ if (img.parentNode) img.remove(); }, duration*1000);
        }

        // Heart-shaped masked image using CSS clip-path
        function createHeartShapedImage(){
            const container = document.getElementById('heartImagesContainer');
            if (!container) return;
            const img = document.createElement('img');
            img.src = heartImages[Math.floor(Math.random()*heartImages.length)];
            img.className = 'heart-img-scroll';
            const randomY = Math.random()*95; img.style.top = randomY + 'vh';
            const duration = 6 + Math.random()*3; img.style.animationDuration = duration + 's';
            const shadowColors = ['rgba(255,255,255,0.4)','rgba(255,255,255,0.5)','rgba(255,255,255,0.6)','rgba(255,255,255,0.3)','rgba(240,240,240,0.5)'];
            img.style.boxShadow = `0 9px 25px ${shadowColors[Math.floor(Math.random()*shadowColors.length)]}`;
            // Match sizes of normal scrolling images so hearts look equally big
            const sizes = [210,240,220,230,250,210,215,235];
            const isMobile = window.innerWidth <= 480;
            const isLandscape = window.matchMedia('(orientation: landscape)').matches;
            if (isMobile && isLandscape){
                const base = Math.min(window.innerHeight, window.innerWidth);
                const s = Math.round(base * (0.40 + Math.random()*0.12)); // ~40-52% of short side
                img.style.width = s + 'px';
                img.style.height = s + 'px';
            } else {
                const scale = isMobile ? 0.85 : 1.0;
                const size = Math.round(sizes[Math.floor(Math.random()*sizes.length)] * scale);
                img.style.width = size + 'px';
                img.style.height = size + 'px';
            }
            // Heart clip-path (approximate heart shape) using polygon for broader support
            img.style.clipPath = 'polygon(50% 15%, 61% 6%, 75% 6%, 87% 14%, 93% 26%, 93% 39%, 88% 50%, 78% 62%, 65% 75%, 50% 88%, 35% 75%, 22% 62%, 12% 50%, 7% 39%, 7% 26%, 13% 14%, 25% 6%, 39% 6%)';
            img.style.webkitClipPath = img.style.clipPath;
            // Smooth edges
            img.style.objectFit = 'cover';
            container.appendChild(img);
            setTimeout(()=>{ if (img.parentNode) img.remove(); }, duration*1000);
        }

        function startRectangleImages(){
            const isMobile = window.innerWidth <= 480;
            const isLandscape = window.matchMedia('(orientation: landscape)').matches;
            const initialCount = isMobile ? (isLandscape ? 16 : 6) : 13;
            const intervalTime = isMobile ? (isLandscape ? 400 : 1200) : 550;
            for (let i=0;i<initialCount;i++) setTimeout(createRectangleImage, i*intervalTime);
            setInterval(createRectangleImage, intervalTime);
        }

        function startScrollingHeartImages(){
            const isMobile = window.innerWidth <= 480;
            const isLandscape = window.matchMedia('(orientation: landscape)').matches;
            const initialCount = isMobile ? (isLandscape ? 18 : 5) : 12;
            const intervalTime = isMobile ? (isLandscape ? 320 : 1400) : 300;
            for (let i=0;i<initialCount;i++) setTimeout(i % 3 === 0 ? createHeartShapedImage : createScrollingHeartImage, i*intervalTime);
            setInterval(() => {
                // Alternate between normal and heart-shaped images
                if (Math.random() < 0.33) createHeartShapedImage(); else createScrollingHeartImage();
            }, intervalTime);
        }
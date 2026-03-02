* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="%23ff69b4" stroke="%23e91e63" stroke-width="1"/></svg>') 10 10, auto;
    min-height: 100vh;
    overflow-x: hidden;
    background-image: url("images/nen.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    /* background: linear-gradient(135deg, #fff9fc 0%, #ffeef7 35%, #ffe5f3 70%, #fff9fc 100%); */
    /* background-size: 400% 400%;
    animation: gradientShift 8s ease infinite; */
}

/* @keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
} */

/* ===== Floating heart background (from sample) ===== */
.heart-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.heart-background .bg-heart {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 24px;
    height: 24px;
    background: transparent;
    pointer-events: none;
    z-index: 0;
    animation: floatHeart 6s linear forwards;
    will-change: transform, opacity;
}

.heart-background .bg-heart svg {
    width: 100%;
    height: 100%;
    display: block;
}

@keyframes floatHeart {
    0% {
        opacity: 0;
        transform: scale(0.7) translateY(0);
    }

    10% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: scale(1.2) translateY(-100vh);
    }
}

/* Keep UI above background */
#envelope-section,
#question-section,
#timeline-section,
#messages-section {
    position: relative;
    z-index: 1;
}

/* Envelope Section */
#envelope-section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: relative;
    contain: layout paint;
}

/* Teacher-day envelope UI (centered) */
.letter {
    position: relative;
    z-index: 1;
}

.valentines {
    position: relative;
    cursor: pointer;
    transform: translate3d(0, 0, 0);
    will-change: transform;
}

@keyframes float {
    0%,
    100% {
        transform: translate3d(0, 0, 0);
    }

    50% {
        transform: translate3d(0, -24px, 0);
    }
}

.envelope {
    position: relative;
    width: 300px;
    height: 200px;
    background-color: #e2dada;
}

.envelope:before {
    background-color: #f7adc5;
    content: "";
    position: absolute;
    width: 212px;
    height: 212px;
    transform: rotate(45deg);
    top: -105px;
    left: 44px;
    border-radius: 30px 0 0 0;
}

.card {
    position: absolute;
    background-color: #e2e1da;
    width: 270px;
    height: 170px;
    top: 5px;
    left: 15px;
    box-shadow: -4px -4px 40px rgba(0, 0, 0, 0.28);
    transform: translate3d(0, 0, 0);
    will-change: transform;
    transition: transform 0.55s ease;
}

.card:before {
    content: "";
    position: absolute;
    border: 2px solid #e2cee0;
    border-radius: 8px;
    width: 240px;
    height: 140px;
    left: 12px;
    top: 12px;
    box-shadow: inset 0 0 8px rgba(228, 200, 225, 0.3);
}

.valentines:hover .card {
    transform: translate3d(0, -95px, 0);
}

.text {
    position: absolute;
    font-family: 'Brush Script MT', cursive;
    font-size: 28px;
    text-align: center;
    line-height: 25px;
    top: 19px;
    left: 85px;
    color: #ee80c9;
}

.heart {
    position: absolute;
    background-color: red;
    height: 15px;
    width: 15px;
    top: 110px;
    left: 125px;
    transform: rotate(-45deg);
}

.heart:before,
.heart:after {
    content: "";
    background-color: red;
    border-radius: 50%;
    height: 15px;
    width: 15px;
    position: absolute;
}

.heart:before {
    top: -8px;
    left: 0;
}

.heart:after {
    left: 8px;
    top: 0;
}

.valentines .hearts {
    display: none;
}

/* ===== Replacement UI (after messages) ===== */
#hearts.hearts {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
}

.float-heart {
    position: absolute;
    width: var(--size, 18px);
    height: var(--size, 18px);
    transform: rotate(-45deg);
    animation: floatUp var(--dur, 6s) linear forwards;
    opacity: 0.95;
    background: var(--color, #ff6b9a);
}

.float-heart::before,
.float-heart::after {
    content: "";
    position: absolute;
    width: var(--size, 18px);
    height: var(--size, 18px);
    background: var(--color, #ff6b9a);
    border-radius: 50%;
}

.float-heart::before {
    left: 0;
    top: calc(-0.5 * var(--size, 18px));
}

.float-heart::after {
    left: calc(0.5 * var(--size, 18px));
    top: 0;
}

@keyframes floatUp {
    0% {
        transform: translateY(0) rotate(-45deg) scale(0.8);
        opacity: 0;
    }

    10% {
        opacity: 0.9;
    }

    50% {
        transform: translateY(-40vh) rotate(-45deg) scale(1.1);
    }

    100% {
        transform: translateY(-100vh) rotate(-45deg) scale(1.2);
        opacity: 0;
    }
}

.envelope-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.45);
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
    z-index: 12000;
}

#castle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    background: transparent;
}

.clock-container {
    text-align: center;
    padding: 48px 56px;
    background: rgba(255, 255, 255, 0.22);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border-radius: 32px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.35);
    position: relative;
}

.date {
    font-size: 24px;
    color: #eb5fa5;
    margin-bottom: 24px;
    font-weight: 800;
    letter-spacing: 0.8px;
    text-transform: capitalize;
    text-shadow: 0 2px 10px rgba(255, 79, 168, 0.55), 0 6px 16px rgba(255, 79, 168, 0.35);
}

.time {
    font-size: 120px;
    font-weight: 800;
    color: #cf6498;
    letter-spacing: -4px;
    line-height: 1;
    text-shadow: 0 6px 18px rgba(255, 47, 149, 0.45), 0 12px 28px rgba(255, 47, 149, 0.25);
}

@media (max-width: 768px) {
    .time {
        font-size: 84px;
    }

    .date {
        font-size: 18px;
    }
}

.countdown {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.cd-number {
    font-size: 140px;
    font-weight: 900;
    color: #fff;
    letter-spacing: -4px;
    text-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.new-ui {
    position: relative;
    text-align: center;
    padding: 48px 56px;
    background: rgba(255, 255, 255, 0.22);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border-radius: 32px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.35);
    z-index: 1;
    max-width: 920px;
    margin: 0 auto;
}

@media (max-width: 640px) {
    .new-ui {
        padding: 22px 16px;
    }
}

/* Letter UI (scoped) */
#new-ui .boxLetter {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

#new-ui .formLetter {
    position: relative;
    width: min(720px, 92vw);
    height: 420px;
    background: #FFEBEB;
    border-radius: 20px;
    padding: 20px 15px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}

/* Mobile: taller by default, but still fits viewport so it stays centered */
@media (max-width: 640px) {
    #new-ui .formLetter {
        height: min(480px, 86vh);
    }
}

#new-ui .wrapperLetter {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    display: flex;
    overflow: hidden;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
}

#new-ui .giftbox {
    position: relative;
    width: 32%;
    height: 100%;
}

#new-ui .giftbox .img {
    position: absolute;
    width: 160px;
    bottom: 18px;
    right: 15px;
    z-index: 20;
}

#new-ui .giftbox img {
    width: 100%;
}

#new-ui .textLetter {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    -webkit-user-select: none;
    user-select: none;
    padding-left: 18px;
    position: relative;
    z-index: 200;
    align-self: stretch;
    overflow-y: auto;
}

#new-ui .textLetter h2 {
    font-size: 36px;
    text-align: left;
    color: #f36c9d;
    margin: 0;
}

#new-ui .textLetter .contentLetter {
    font-size: 22px;
    line-height: 1.6;
    text-align: left;
    padding: 0 10px 0 0;
    margin-top: 12px;
    color: #fd86b2;
    text-shadow: 0 1px 4px rgba(255, 160, 200, .25);
}

.see-gift-btn {
    position: absolute;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    background: linear-gradient(45deg, #ff87b7, #ff5fa3);
    color: #fff;
    border: none;
    padding: 12px 26px;
    font-weight: 800;
    border-radius: 999px;
    box-shadow: 0 10px 24px rgba(255, 95, 163, 0.35);
    cursor: pointer;
    z-index: 300;
}

.see-gift-btn:hover {
    transform: translateX(-50%) translateY(-2px);
    filter: brightness(1.06);
}

.gift-ui {
    position: fixed;
    inset: 0;
    display: block;
    z-index: 11000;
    background: transparent;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
}

.heart-images-container {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 5;
}

.heart-img-scroll {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 15px;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, .8);
    box-shadow: 0 8px 25px rgba(255, 255, 255, .3);
    animation: scrollLeftToRight linear;
    opacity: .9;
}

@keyframes scrollLeftToRight {
    0% {
        transform: translateX(-190px) scale(.5);
        opacity: 0
    }

    10% {
        opacity: 1;
        transform: translateX(-180px) scale(1)
    }

    90% {
        opacity: 1;
        transform: translateX(calc(100vw + 50px)) scale(1)
    }

    100% {
        transform: translateX(calc(100vw + 70px)) scale(.5);
        opacity: 0
    }
}

.one,
.two,
.three,
.four,
.five {
    background-color: red;
    display: inline-block;
    height: 10px;
    margin: 0 10px;
    position: relative;
    transform: rotate(-45deg);
    width: 10px;
    top: 50px;
}

.one:before,
.one:after,
.two:before,
.two:after,
.three:before,
.three:after,
.four:before,
.four:after,
.five:before,
.five:after {
    content: "";
    background-color: red;
    border-radius: 50%;
    height: 10px;
    position: absolute;
    width: 10px;
}

.one:before,
.two:before,
.three:before,
.four:before,
.five:before {
    top: -5px;
    left: 0;
}

.one:after,
.two:after,
.three:after,
.four:after,
.five:after {
    left: 5px;
    top: 0;
}

.front {
    position: absolute;
    border-right: 180px solid #f5b4d4;
    border-top: 95px solid transparent;
    border-bottom: 100px solid transparent;
    left: 120px;
    top: 5px;
    width: 0;
    height: 0;
    z-index: 10;
}

.front:before {
    position: absolute;
    content: "";
    border-left: 300px solid #f5a9cf;
    border-top: 195px solid transparent;
    left: -120px;
    top: -95px;
    width: 0;
    height: 0;
}

.shadow {
    position: absolute;
    width: 330px;
    height: 25px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.25);
    top: 265px;
    left: -15px;
    animation: scale 3s linear infinite;
    z-index: -1;
    will-change: transform;
}

@keyframes scale {
    0%,
    100% {
        transform: scaleX(1);
    }

    50% {
        transform: scaleX(0.85);
    }
}

.hover-animation {
    animation: float 3s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
    /* Giảm tốc độ thay vì tắt hẳn để vẫn thấy hiệu ứng trên laptop */
    .hover-animation {
        animation-duration: 6s;
        animation-timing-function: ease-in-out;
    }

    .shadow {
        animation-duration: 6s;
    }

    .click-hint {
        animation-duration: 3s;
    }

    .valentines:hover .card {
        transform: translate3d(0, -80px, 0);
    }
}

/* ===== Question UI (from sample, scoped) ===== */
#question-section.question-ui {
    font-family: "Playpen Sans", cursive;
    overflow: hidden;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 0 20px;
}

#question-section.question-ui img {
    width: 250px;
    margin-bottom: 20px;
    transition: all 0.5s ease;
    -webkit-user-select: none;
    user-select: none;
}

#question-section.question-ui h2 {
    font-size: 32px;
    font-weight: 700;
    color: #ff8282;
    margin-bottom: 30px;
    text-align: center;
    transition: all 0.5s ease;
    text-shadow: 1px 1px 0 #e4e4e4, 2px 2px 0 #e4e4e4;
}

#question-section.question-ui h2:hover {
    transform: perspective(400px) translateZ(10px) scale(1.05);
}

#question-section.question-ui .button-wrapper {
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
}

#question-section.question-ui button {
    font-family: "Playpen Sans", cursive;
    font-size: 20px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 25px;
    color: #ef9a9a;
    font-weight: 600;
    background: linear-gradient(#fff);
    box-shadow: 0 2px 5px #ef9a9a;
    border: 2px solid #ef9a9a;
}

#question-section.question-ui #yesBtn {
    animation: jump 3s ease-in-out infinite;
}

@keyframes jump {
    0%,
    25%,
    75%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}

.click-hint {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    color: #ff6b9d;
    font-size: 14px;
    animation: bounce 2s infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateX(-50%) translateY(0);
    }

    50% {
        transform: translateX(-50%) translateY(-10px);
    }
}

/* Question Section */
#question-section {
    display: none;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
    padding: 20px;
}

.question-box {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 500px;
}

.question-box h1 {
    color: #ff6b9d;
    margin-bottom: 30px;
    font-size: 28px;
}

.buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 30px;
    position: relative;
    height: 60px;
}

button {
    padding: 15px 40px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
}

.btn-yes {
    background: #ff6b9d;
    color: white;
}

.btn-yes:hover {
    background: #ff5186;
    transform: scale(1.1);
}

.btn-no {
    background: #ddd;
    color: #666;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}



/* Timeline Section */
#timeline-section {
    display: none;
    padding: 0;
    max-width: none;
    margin: 0;
    min-height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

/* Messages Section (intermediate scene) */
#messages-section {
    display: none;
    min-height: 100vh;
    padding: 60px 20px;
    align-items: center;
    justify-content: center;
}

.messages-container {
    max-width: 880px;
    width: 100%;
    text-align: center;
    position: relative;
    min-height: 140px;
}

.message-line {
    font-family: "Playpen Sans", cursive;
    color: #ff6b9d;
    font-weight: 700;
    font-size: clamp(22px, 5vw, 42px);
    text-shadow: 1px 1px 0 #e4e4e4, 2px 2px 0 #e4e4e4;
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) translateY(10px);
    margin: 0;
    padding: 0;
    max-width: 92vw;
}

.message-line.show {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(0);
    transition: opacity 700ms ease, transform 700ms ease;
}

.timeline-header {
    text-align: center;
    margin-bottom: 60px;
}

.timeline-header h1 {
    font-family: "Playpen Sans", cursive;
    color: #ff6b9d;
    font-size: clamp(32px, 6vw, 56px);
    font-weight: 800;
    margin-bottom: 20px;
    letter-spacing: 0.6px;
    text-shadow: 1px 1px 0 #e4e4e4, 2px 2px 0 #e4e4e4, 0 14px 30px rgba(0, 0, 0, 0.22);
    animation: titleGlow 2.8s ease-in-out infinite;
}

@keyframes titleGlow {
    0%,
    100% {
        filter: drop-shadow(0 0 6px rgba(255, 140, 190, 0.25));
        transform: translateY(0);
    }

    50% {
        filter: drop-shadow(0 0 18px rgba(255, 140, 190, 0.55));
        transform: translateY(-1px);
    }
}

@media (prefers-reduced-motion: reduce) {
    .timeline-header h1 {
        animation: none;
    }
}

.love-counter {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.16));
    padding: 22px 26px;
    border-radius: 18px;
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    color: white;
    font-size: 20px;
    display: inline-block;
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 18px 55px rgba(0, 0, 0, 0.25);
}

.love-counter p {
    font-family: "Playpen Sans", cursive;
    color: #f09db9;
    font-weight: 700;
    opacity: 0.98;
    letter-spacing: 0.35px;
    text-shadow: 1px 1px 0 #e4e4e4, 2px 2px 0 #e4e4e4, 0 10px 22px rgba(0, 0, 0, 0.18);
    animation: subtitleGlow 3.2s ease-in-out infinite;
}

@keyframes subtitleGlow {
    0%,
    100% {
        filter: drop-shadow(0 0 6px rgba(255, 140, 190, 0.20));
    }

    50% {
        filter: drop-shadow(0 0 14px rgba(255, 140, 190, 0.45));
    }
}

@media (prefers-reduced-motion: reduce) {
    .love-counter p {
        animation: none;
    }
}

#counter {
    margin-top: 10px;
    font-size: 34px;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: 0.6px;
    background: linear-gradient(90deg, #f0a0c8 0%, #f19595 35%, #ff9fc8 70%, #f0b6d3 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 14px rgba(255, 160, 200, 0.45);
    animation: counterGlow 2.4s ease-in-out infinite;
}

@keyframes counterGlow {
    0%,
    100% {
        filter: drop-shadow(0 0 6px rgba(255, 140, 190, 0.35));
        background-position: 0% 50%;
    }

    50% {
        filter: drop-shadow(0 0 16px rgba(255, 140, 190, 0.65));
        background-position: 100% 50%;
    }
}

.timeline .timeline-item:nth-child(1) {
    animation-delay: 0.2s;
}

.timeline .timeline-item:nth-child(2) {
    animation-delay: 0.4s;
}

.timeline .timeline-item:nth-child(3) {
    animation-delay: 0.6s;
}

.timeline .timeline-item:nth-child(4) {
    animation-delay: 0.8s;
}

.timeline .timeline-item:nth-child(5) {
    animation-delay: 1s;
}

.timeline {
    position: relative;
    padding: 26px 0 10px;
    max-width: 980px;
    margin: 0 auto;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(
        180deg,
        #ff6b9d 0%,
        #ffd1e8 18%,
        #ffffff 36%,
        #ff9fc8 54%,
        #c44569 72%,
        #ff6b9d 100%
    );
    background-size: 100% 260%;
    animation: timelineFlow 3.8s linear infinite;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.35), 0 0 18px rgba(255, 107, 157, 0.45);
}

.timeline-item {
    margin-bottom: 50px;
    position: relative;
    opacity: 0;
    transform: translateY(50px);
    animation: fadeInUp 0.8s forwards;
}

.timeline-item:nth-child(odd) {
    padding-right: calc(50% + 46px);
    text-align: right;
}

.timeline-item:nth-child(even) {
    padding-left: calc(50% + 46px);
    text-align: left;
}

.timeline-content {
    background: rgba(255, 255, 255, 0.92);
    padding: 20px 20px 18px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.55);
    box-shadow: 0 18px 55px rgba(0, 0, 0, 0.22);
    display: inline-block;
    max-width: 400px;
    text-align: left;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    will-change: transform;
}

.timeline-content p {
    margin: 0;
    font-family: "Playpen Sans", cursive;
    color: #f395b4;
    font-weight: 600;
    line-height: 1.55;
    letter-spacing: 0.15px;
    overflow-wrap: anywhere;
}

.timeline-content:hover {
    transform: translateY(-3px);
    box-shadow: 0 22px 70px rgba(0, 0, 0, 0.26);
}

.timeline-date {
    color: #ff6b9d;
    font-weight: bold;
    margin-bottom: 10px;
    letter-spacing: 0.2px;
}

.timeline-image {
    width: 100%;
    height: 200px;
    border-radius: 14px;
    margin-bottom: 15px;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #ff6b9d 0%, #ff9fc8 45%, #c44569 100%);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
}

.timeline-image::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.28) 100%);
    pointer-events: none;
}

.timeline-image img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transform: scale(1.02);
    transition: transform 0.45s ease;
}

.timeline-content:hover .timeline-image img {
    transform: scale(1.08);
}

.timeline-dot {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: radial-gradient(circle at 30% 30%, #ffffff 0%, #ffd1e8 28%, #ff6b9d 62%, #c44569 100%);
    border: 4px solid rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    top: 20px;
    box-shadow: 0 0 0 6px rgba(255, 107, 157, 0.16), 0 12px 22px rgba(0, 0, 0, 0.22);
}

.timeline-dot::after {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    border: 2px solid rgba(255, 209, 232, 0.75);
    opacity: 0.0;
    animation: dotPulse 2.4s ease-in-out infinite;
}

@keyframes timelineFlow {
    0% {
        background-position: 50% 0%;
    }

    100% {
        background-position: 50% 100%;
    }
}

@keyframes dotPulse {
    0% {
        transform: scale(0.92);
        opacity: 0;
    }

    35% {
        opacity: 0.75;
    }

    100% {
        transform: scale(1.15);
        opacity: 0;
    }
}

@media (max-width: 768px) {
    .timeline {
        padding: 18px 0 10px;
    }

    .timeline::before {
        left: 18px;
        transform: none;
        height: calc(100% - 6px);
    }

    .timeline-item {
        margin-bottom: 26px;
    }

    .timeline-item:nth-child(odd),
    .timeline-item:nth-child(even) {
        padding-left: 52px;
        padding-right: 0;
        text-align: left;
    }

    .timeline-dot {
        left: 18px;
        transform: none;
        top: 22px;
    }

    .timeline-content {
        max-width: none;
        width: 100%;
    }
}

@media (prefers-reduced-motion: reduce) {
    .timeline::before {
        animation: none;
    }

    .timeline-dot::after {
        animation: none;
        opacity: 0;
    }
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 3D Photo Cube */
.photo-container {
    text-align: center;
    margin: 60px 0;
    perspective: 1200px;
}

.photo-cube-autorotate {
    width: 250px;
    height: 250px;
    margin: 0 auto;
    position: relative;
    transform-style: preserve-3d;
    animation: rotate 15s linear infinite;
    will-change: transform;
}

.photo-cube {
    width: 250px;
    height: 250px;
    position: relative;
    transform-style: preserve-3d;
    cursor: grab;
    touch-action: none;
    -webkit-user-select: none;
    user-select: none;
    will-change: transform;
}

.photo-cube.is-dragging {
    cursor: grabbing;
}

@keyframes rotate {
    from {
        transform: rotateY(0deg) rotateX(10deg);
    }

    to {
        transform: rotateY(360deg) rotateX(10deg);
    }
}

.photo-face {
    position: absolute;
    width: 250px;
    height: 250px;
    background-size: cover;
    background-position: center;
    border: 5px solid white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    font-weight: bold;
}

.photo-face:nth-child(1) {
    transform: rotateY(0deg) translateZ(125px);
    background-image: url('images/anh2.jpg');
}

.photo-face:nth-child(2) {
    transform: rotateY(90deg) translateZ(125px);
    background-image: url('images/anh3.jpg');
}

.photo-face:nth-child(3) {
    transform: rotateY(180deg) translateZ(125px);
    background-image: url('images/anh4.jpg');
}

.photo-face:nth-child(4) {
    transform: rotateY(-90deg) translateZ(125px);
    background-image: url('images/anh5.jpg');
}

.photo-face:nth-child(5) {
    transform: rotateX(90deg) translateZ(125px);
    background-image: url('images/anh6.jpg');
}

.photo-face:nth-child(6) {
    transform: rotateX(-90deg) translateZ(125px);
    background-image: url('images/anh7.jpg');
}

.photo-instruction {
    color: white;
    margin-top: 30px;
    font-size: 14px;
    opacity: 0.8;
}

footer {
    text-align: center;
    padding: 40px;
    color: white;
    font-size: 16px;
}

footer strong {
    color: #ff6b9d;
}

.footer-note {
    margin-top: 10px;
    font-size: 14px;
}

.hidden {
    display: none !important;
}

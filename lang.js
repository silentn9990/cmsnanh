let envelopeOpened = false;

function openEnvelope() {
    if (!envelopeOpened) {
        envelopeOpened = true;

        setTimeout(() => {
            document.getElementById('envelope-section').style.display = 'none';
            document.getElementById('question-section').style.display = 'flex';
        }, 600);
    }
}

function runAway() {
    const btn = document.getElementById('noBtn');
    if (!btn) return;

    const maxX = window.innerWidth - Math.max(0, btn.offsetWidth || 150);
    const maxY = window.innerHeight - Math.max(0, btn.offsetHeight || 60);

    const randomX = Math.random() * Math.max(0, maxX);
    const randomY = Math.random() * Math.max(0, maxY);

    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
}

function sayYes() {
    // Show timeline immediately
    document.getElementById('question-section').style.display = 'none';
    document.getElementById('timeline-section').style.display = 'block';
    startCounter();
}

function startCounter() {
    // Đổi ngày này thành ngày bạn bắt đầu yêu nhau
    const startDate = new Date('2025-10-15T00:00:00');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('counter').textContent =
            `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
    }

    // Hiển thị ngay lập tức không delay
    updateCounter();
    // Sau đó cập nhật mỗi 1 giây
    setInterval(updateCounter, 1000);
}


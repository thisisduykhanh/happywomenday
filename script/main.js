document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
    }
});

const messages = [
    "Chạm vào bất kỳ đâu đi nè~",
    "Này cậu ơi ❤️",
    "Mình có chuyện muốn nói nè",
    "Thử bấm tiếp xem sao?",
    "Bấm thêm lần nữa nha~",
    "Đừng nóng vội nha~",
    "Hứa luôn, lần này là cuối!",
    "Thật ra ...!",
    "Là ...!",
    "Lần cuối nè!",
    "Anh muốn nói là...",
    "Hmm...",
    "Thôi được rồi~",
    "Ngại quá chắc em không thích đâu~",
    "Thôi để anh nói luôn",
    "Anh chỉ muốn nói là...",
    "Anh không thích cần hay ke",
    "Anh chỉ thích được em care và cần.😳",
    "Duma anh xàm lol quá 😂",
    "Happy Women day ❤️",
    "Thử bấm vào nút bên dưới đi nào 💝"
];




let currentPage = 0;
let isLastPage = false;

function showMessage() {
    $('.message').text(messages[currentPage]);
    
    isLastPage = currentPage === messages.length - 1;
    
    if (isLastPage) {
        $('.next-button').show();
        $('.bg_heart').css('cursor', 'default');
    } else {
        $('.next-button').hide();
        $('.bg_heart').css('cursor', 'pointer');
    }
}

$('.bg_heart').on('click', () => {
    if (!isLastPage) {
        currentPage++;
        showMessage();
    }
});

const love = setInterval(() => {
    const r_num = Math.floor(Math.random() * 40) + 1;
    const r_size = Math.floor(Math.random() * 65) + 10;
    const r_left = Math.floor(Math.random() * 100) + 1;
    const r_bg = Math.floor(Math.random() * 25) + 100;
    const r_time = Math.floor(Math.random() * 5) + 5;
    
    $('.bg_heart').append(`<div class='heart' style='width:${r_size}px;height:${r_size}px;left:${r_left}%;background:rgba(255,${r_bg - 25},${r_bg},1);animation:love ${r_time}s ease'></div>`);
    
    $('.bg_heart').append(`<div class='heart' style='width:${r_size - 10}px;height:${r_size - 10}px;left:${r_left + r_num}%;background:rgba(255,${r_bg - 25},${r_bg + 25},1);animation:love ${r_time + 5}s ease'></div>`);
    
    $('.heart').each(function() {
        const top = Number.parseFloat($(this).css("top"));
        const width = Number.parseFloat($(this).css("width"));
        if (top <= -100 || width >= 150) {
            $(this).remove();
        }
    });
}, 500);

showMessage();

function clearMusicState() {
    localStorage.removeItem('musicPlaying');
    localStorage.removeItem('musicCurrentTime');
}

window.onload = () => {
    clearMusicState();
}

function setupMusic() {
    const music = document.getElementById('backgroundMusic');
    
    if (!localStorage.getItem('initialLoad')) {
        clearMusicState();
        localStorage.setItem('initialLoad', 'true');
        music.currentTime = 0;
    }

    const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = localStorage.getItem('musicCurrentTime') || 0;

    if (isMusicPlaying) {
        music.currentTime = Number.parseFloat(musicCurrentTime);
        music.play().catch(error => console.log('Playback failed', error));
    }

    music.addEventListener('play', () => {
        localStorage.setItem('musicPlaying', 'true');
    });

    music.addEventListener('pause', () => {
        localStorage.setItem('musicPlaying', 'false');
    });

    setInterval(() => {
        localStorage.setItem('musicCurrentTime', music.currentTime);
    }, 1000);

    document.addEventListener('click', function startMusic() {
        music.play().catch(error => {
            console.log('Autoplay prevented', error);
        });
        document.removeEventListener('click', startMusic);
    });
}

document.addEventListener('DOMContentLoaded', setupMusic);
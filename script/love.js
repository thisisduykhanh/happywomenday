const canvas = document.getElementById("heart");
canvas.width = 600;
canvas.height = 600;
canvas.style.width = `${canvas.width}px`;
canvas.style.height = `${canvas.height}px`;

const context = canvas.getContext("2d");
context.translate(canvas.width / 2, canvas.height / 2 - 20);
context.scale(1, -1);
context.moveTo(0, 0);

context.fillStyle = "#ea80b0";

function xin(t, r, j, ws) {
	this.trans = t;
	this.rs = r;
	this.ws = ws;
	this.index = j;
	this.x =
		this.trans *
		this.ws *
		Math.sin(this.index) *
		Math.sin(this.index) *
		Math.sin(this.index);
	this.y =
		this.trans *
		(16 * Math.cos(this.index) -
			5 * Math.cos(2 * this.index) -
			2 * Math.cos(3 * this.index) -
			Math.cos(4 * this.index));
}

let ws = 18;
let hs = 16;
let wsSpeed = 0.15;
let hsSpeed = 0.15;
const speed = 0.2;

const wqs = [];
const nqs = [];
const hxz = [];
const hxz2 = [];
let dc = [];

sdata();

function sdata() {
	for (let j = 0; j < 500; j += speed) {
		const trans = 9 + Math.random() * 2.5;
		const size = Math.random() * 2;
		const xins = new xin(trans, size, j, ws);
		wqs.push(xins);
	}

	for (let j = 0; j < 300; j += speed) {
		const trans = 7 + Math.random() * 5;
		const size = Math.random() * 2.5;
		const xins = new xin(trans, size, j, ws);
		nqs.push(xins);
	}

	for (let j = 0; j < 600; j += speed) {
		const trans = 11 + Math.random() * 2;
		const size = Math.random() * 3.5;
		const xins = new xin(trans, size, j, ws);
		hxz.push(xins);
	}

	for (let j = 0; j < 500; j += speed) {
		const trans = 0 + Math.random() * 2.7;
		const size = Math.random() * 2.5;
		const xins = new xin(trans, size, j, ws);
		hxz2.push(xins);
	}

	function animate() {
		context.clearRect(
			-canvas.width / 2,
			-canvas.height / 2,
			canvas.width,
			canvas.height,
		);
		ws += wsSpeed;
		if (ws < 16) {
			wsSpeed *= -1;
		} else if (ws > 18) {
			wsSpeed *= -1;
		}
		hs += hsSpeed;
		if (hs < 14) {
			hsSpeed *= -1;
		} else if (hs > 16) {
			hsSpeed *= -1;
		}

		[hxz, hxz2, nqs, wqs].forEach((collection) => {
			collection.forEach((v) => {
				context.beginPath();
				context.arc(
					v.trans *
						ws *
						Math.sin(v.index) *
						Math.sin(v.index) *
						Math.sin(v.index),
					v.trans *
						(hs * Math.cos(v.index) -
							5 * Math.cos(2 * v.index) -
							2 * Math.cos(3 * v.index) -
							Math.cos(4 * v.index)),
					v.rs,
					0,
					Math.PI * 2,
				);
				context.fill();
				context.stroke();
				context.closePath();

				
			});
		});

		dc = [];
		for (let j = 0; j < 300; j += speed) {
			const trans = 1 + Math.random() * 20;
			const size = Math.random() * 2;
			const xins = new xin(trans, size, j, ws);
			dc.push(xins);
		}

		dc.forEach((v) => {
			context.beginPath();
			context.arc(v.x, v.y, v.rs, 0, Math.PI * 2);
			context.fill();
			context.stroke();
			context.closePath();
		});
		
		context.save();
		context.scale(1, -1); 
		context.font = "32px 'Pacifico', cursive";
		context.fillStyle = "#ea80b0";
		context.textAlign = "center";
		context.fillText("Chạy đâu cho thoát, vào tim anh rồi nè ", 0, canvas.height / 2);

		context.fillText("Tâm Đoan ", 0, canvas.height / 20);

		
		context.restore(); 
		requestAnimationFrame(animate);
	}

	animate();
}

document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('backgroundMusic');
    
    music.currentTime = 7; // Bắt đầu từ giây thứ 2

    music.play().catch(error => {
        console.log('Autoplay bị chặn, đợi người dùng click:', error);

        // Nếu bị chặn, đợi người dùng click để phát nhạc
        document.addEventListener('click', function startMusic() {
            music.play().catch(err => console.log('Lỗi phát nhạc:', err));
            document.removeEventListener('click', startMusic);
        });
    });
});

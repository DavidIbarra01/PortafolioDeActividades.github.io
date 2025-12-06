document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');

    let gameRunning = false;
    let gameOver = false;
    let animationFrameId;
    let score = 0;

    //Personalizar a los jugadores
    const player = {
        x: canvas.width / 2 - 50,
        y: canvas.height - 30,
        radius: 10,
        color: '#ff0000',
        speed: 25
    };

    const player2 = {
        x: canvas.width / 2 + 50,
        y: canvas.height - 30,
        radius: 10,
        color: '#007bff',
        speed: 25
    };

    //Dibujar al jugador
    function drawPlayer() {
        // Dibujar jugador 1 (rojo)
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
        ctx.fillStyle = player.color;
        ctx.fill();
        ctx.closePath();

        // Dibujar jugador 2 (azul)
        ctx.beginPath();
        ctx.arc(player2.x, player2.y, player2.radius, 0, Math.PI * 2);
        ctx.fillStyle = player2.color;
        ctx.fill();
        ctx.closePath();
    }

    //La clase de los bloques
    class Block {
        constructor(x, y, width, height, dy, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.dy = dy;
            this.color = color;
        }

        draw() { //Dibuja los bloques
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        update() { //Mueve el bloque, sumando su eje y (cuando cae)
            this.y += this.dy;

            if (this.y > canvas.height) {
                this.y = -this.height;
                this.x = Math.random() * (canvas.width - this.width);
                this.dy = 1.5 + Math.random() * 2;
                score += 1;
            }
        }

        collides(player, player2) {
            const collisionX = player.x + player.radius > this.x && player.x - player.radius < this.x + this.width;
            const collisionY = player.y + player.radius > this.y && player.y - player.radius < this.y + this.height;

            const collisionX2 = player2.x + player2.radius > this.x && player2.x - player2.radius < this.x + this.width;
            const collisionY2 = player2.y + player2.radius > this.y && player2.y - player2.radius < this.y + this.height;

            return (collisionX && collisionY) || (collisionX2 && collisionY2);
        }
    }

    const blocks = [];
    const blockCount = 10;

    function initializeBlocks() {
        blocks.length = 0;
        for (let i = 0; i < blockCount; i++) {
            const width = Math.random() * 75 + 25;
            const height = 20;
            const x = Math.random() * (canvas.width - width);
            const y = -height - (i * 80);
            const dy = 1.5 + Math.random() * 2;
            const color = `hsl(${i * 60 + 200}, 70%, 50%)`;

            blocks.push(new Block(x, y, width, height, dy, color));
        }
    }

    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const block of blocks) {
            block.update();
            block.draw();

            if (block.collides(player, player2)) {
                gameOver = true;
                gameRunning = false;
                cancelAnimationFrame(animationFrameId);
                startButton.disabled = true;
                alert('Ya vete del ciber, obtuviste: ' + score + ' puntos');
                return;
            }
        }

        drawPlayer();

        animationFrameId = requestAnimationFrame(gameLoop);
    }

    //Movimiento con base al teclado
    document.addEventListener('keydown', (e) => {
        if (!gameRunning || gameOver) return;

        // Controles jugador 1
        if (e.key === 'a' || e.key === 'A') {
            player.x -= player.speed;
        } else if (e.key === 'd' || e.key === 'D') {
            player.x += player.speed;
        }

        // Controles jugador 2
        if (e.key === 'ArrowLeft') {
            player2.x -= player2.speed;
        } else if (e.key === 'ArrowRight') {
            player2.x += player2.speed;
        }

        //Mis Limitadores
        player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
        player2.x = Math.max(player2.radius, Math.min(canvas.width - player2.radius, player2.x));
    });

    startButton.addEventListener('click', () => {
        if (!gameRunning && !gameOver) {
            gameRunning = true;
            startButton.disabled = true;
            initializeBlocks();
            gameLoop();
        }
    });

    resetButton.addEventListener('click', () => {
        location.reload();
        score = 0;
    });

    function drawInitialScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();

        ctx.fillStyle = '#333';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Pulsa "Iniciar Juego" para empezar', canvas.width / 2, canvas.height / 2);
    }

    drawInitialScreen();
});
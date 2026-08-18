export default class PongGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")

        this.running = false;
        this.keys = new Set();

        this.ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 20,
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.loop = this.loop.bind(this);
    }

    start() {
        if (this.running) return;

        this.running = true;

        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);

        this.lastTime = performance.now()
        requestAnimationFrame(this.loop);
    }

    stop() {
        this.running = false;

        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
    }

    handleKeyDown(event) {
        this.keys.add(event.key);

        console.log("Key pressed:", event.key);
    }

    handleKeyUp(event) {
        this.keys.delete(event.key)
    }

    loop(currentTime) {
        if (!this.running) return;

        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(this.loop);
    }
    
    update(deltaTime) {
        // game logic goes here

    // if (this.keys.has("ArrowUp")) {
    //   this.ball.y -= 100 * deltaTime;
    // }
    }

    render() {
        const { ctx, canvas, ball } = this;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}
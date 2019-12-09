
const modeA = document.querySelector('#modeA');
const modeB = document.querySelector('#modeB');
const play = document.querySelector('#play');
const reset = document.querySelector('#reset');
const container = document.querySelector('#container');
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let score = document.querySelector('#score');
let board = 20;
let mode = 'A';
let count = 0;
class Snake {
    color = "yellow";
    direction = 2;
    arr = [];
    x = board / 2;
    y = board / 2;
    updateSnake() {
        let head = { x: this.x, y: this.y }
        for (let i in this.arr) {
            let temp = this.arr[i];
            this.arr[i] = head;
            head = temp
        }
        switch (this.direction) {
            case 0: this.x -= 1; break;
            case 1: this.y -= 1; break;
            case 2: this.x += 1; break;
            case 3: this.y += 1; break;
        }
    }
    addSnake() {
        this.arr.push({ x: this.x, y: this.y });
    }
    modeB(value) {
        if (value < 0) {
            value = board - 1;
        } else if (value > board - 1) {
            value = 0
        }
        return value;
    }
}

class Food {
    color = "red";
    x = 0;
    y = 0;
    randomFood() {
        this.x = Math.floor(Math.random() * board);
        this.y = Math.floor(Math.random() * board);
    }
}
let snake = new Snake();
let food = new Food();
food.randomFood();
function Dot(x, y, color) {
    let size = 25
    ctx.beginPath();
    ctx.fillStyle = color
    ctx.fillRect(size * x, size * y, size, size);
}
function startGame() {
    let play = setInterval(function () {
        for (let x = 0; x < board; x++) {
            for (let y = 0; y < board; y++) {
                Dot(x, y, '#2fd22f')
            }
        }
        snake.updateSnake();
        if (mode == 'B') {
            snake.x = snake.modeB(snake.x);
            snake.y = snake.modeB(snake.y);
        }
        if (snake.x == food.x && snake.y == food.y) {
            snake.addSnake();
            food.randomFood();
            count++;
            score.innerHTML = count;
        }
        Dot(snake.x, snake.y, snake.color);
        for (let i in snake.arr) {
            let p = snake.arr[i];
            Dot(p.x, p.y, snake.color);
        }
        Dot(food.x, food.y, food.color);
        if ((snake.x < 0 || snake.x > board - 1 || snake.y < 0 || snake.y > board - 1) && mode == 'A') {
            container.innerHTML = "Game Over";
            clearInterval(play);
        }
        for (let i = 0; i < snake.arr.length - 1; i++) {
            if (snake.arr[i].x == snake.x && snake.arr[i].y == snake.y) {
                container.innerHTML = "Game Over";
                clearInterval(play);
            }
        }
    }, 1000);
    window.addEventListener('keydown', e => {
        console.log(e.keyCode);
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            if (Math.abs(e.keyCode - 37 - snake.direction) != 2) {
                snake.direction = e.keyCode - 37;
            }

        }
    })

}

function chooseMode(e) {
    mode = e;
}
function resetGame() {
    snake.x = board / 2;
    snake.y = board / 2;
    snake.direction = 2;
    count = 0;
    score.textContent = 0;
    snake.arr = [];
    container.innerHTML = "";
}

play.addEventListener('click', startGame);
reset.addEventListener('click', resetGame);
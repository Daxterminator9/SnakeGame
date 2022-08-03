// req constants
let direction = { x: 0, y: 0 };
const foodBgm = new Audio('../assets/food.mp3');
const dieBgm = new Audio('../assets/gameover.mp3');
const moveBgm = new Audio('../assets/move.mp3');
const Bgm = new Audio('../assets/music.mp3');
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let mute = true;
// starting point of snake
let x0 = 5 + Math.round(10 * Math.random());
let y0 = 5 + Math.round(10 * Math.random());
let snakeArr = [
    { x: x0, y: y0 }
];
// starting point of food
let fx0 = Math.round(20 * Math.random());
let fy0 = Math.round(20 * Math.random());
let food = { x: fx0, y: fy0 };
let board = document.getElementById('board');

// gameplay functions
function gameLoop(curtime) {
    window.requestAnimationFrame(gameLoop);
    if (((curtime - lastPaintTime) / 1000) < 1 / speed) {
        return;
    }
    lastPaintTime = curtime;
    gameEngine();
}

function collide(arr) {
    // hit boundary
    if (arr[0].x <= 0 || arr[0].y <= 0 || arr[0].x >= 20 || arr[0].y >= 20) {
        return true;
    }
    // bump into snake
    for (let idx = 1; idx < arr.length; idx++) {
        if (arr[idx].x == arr[0].x && arr[idx].y == arr[0].y) {
            return true;
        }
    }
    return false;
}

function gameEngine() {

    // reset game
    if (collide(snakeArr)) {
        dieBgm.play();
        alert("You're dead! Have some shame and try again.");
        direction = { x: 0, y: 0 };
        snakeArr = [{ x: x0, y: y0 }];
        food = { x: fx0, y: fy0 };
        speed = 5;
        score = 0;
    }

    // eating food
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        foodBgm.play();
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        let a = 0, b = 20;
        food = { x: a + Math.round((b - a) * Math.random()), y: a + Math.round((b - a) * Math.random()) };
        score++;
        scorebox.innerHTML = "Score: " + score;
        if (score % 8 == 0) {
            speed += 0.5;
        }
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = "Hiscore: " + hiscoreval;
        }
    }

    // moving snake
    for (let idx = snakeArr.length - 2; idx >= 0; idx--) {
        snakeArr[idx + 1] = { ...snakeArr[idx] };
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // display snake
    board.innerHTML = "";
    for (let idx = 0; idx < snakeArr.length; idx++) {
        let snakePart = document.createElement('div');
        snakePart.style.gridRowStart = snakeArr[idx].y;
        snakePart.style.gridColumnStart = snakeArr[idx].x;
        if (idx == 0) {
            snakePart.classList.add('head');
        }
        else {
            snakePart.classList.add('snake');
        }
        board.appendChild(snakePart);
    }
    // display food
    let foodPart = document.createElement('div');
    foodPart.style.gridRowStart = food.y;
    foodPart.style.gridColumnStart = food.x;
    foodPart.classList.add('food')
    board.appendChild(foodPart);
}

// high score
let hiscore = localStorage.getItem('hiscore');
let hiscoreval = 0;
if (hiscore == null) {
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "Hiscore: " + hiscoreval;
}

// main function
window.requestAnimationFrame(gameLoop);
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            direction = { x: 0, y: -1 };
            moveBgm.play();
            break;
        case 'ArrowDown':
            direction = { x: 0, y: 1 };
            moveBgm.play();
            break;
        case 'ArrowLeft':
            direction = { x: -1, y: 0 };
            moveBgm.play();
            break;
        case 'ArrowRight':
            direction = { x: 1, y: 0 };
            moveBgm.play();
            break;
        case 'm':
            mute = !mute;
            if (mute) Bgm.pause();
            else Bgm.play();
            break;
        default:
            break;
    }
});

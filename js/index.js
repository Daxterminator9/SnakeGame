const sound = new Audio('../assets/move.mp3');
let option1 = document.querySelector('#option1');
let option2 = document.querySelector('#option2');

option1.addEventListener("mouseover", function () {
    sound.play();
});

option2.addEventListener("mouseover", function () {
    sound.play();
});

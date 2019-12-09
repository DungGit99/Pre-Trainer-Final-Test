
const squares = document.querySelectorAll('td');
const alert_winer = document.querySelector("#alert_winer");
const resetGame = document.querySelector("#resetGame");
const button = '<button>Reset Game</button>';
let count = 0;
let player = '';
function playGame(e) {
    if (this.innerHTML == '' && player == '') {
        count++;
        if (count % 2 != 0) {
            this.innerHTML = "X";
            this.classList.add('x');
        } else {
            this.innerHTML = "0";
            this.classList.add('o');
        }
    }
    checkWiner();
}
function checkWiner() {
    if (count == 9) {
        alert_winer.innerHTML = 'Hòa';
        resetGame.innerHTML = button;
    }
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML != '') {
            if ((i >= 0 && i <= 2) && squares[i].innerHTML == squares[i + 3].innerHTML && squares[i + 3].innerHTML == squares[i + 6].innerHTML) {
                alertWiner(i)
            }
            if (i % 3 == 0 && squares[i].innerHTML == squares[i + 1].innerHTML && squares[i + 1].innerHTML == squares[i + 2].innerHTML) {
                alertWiner(i)
            }
            if (i == 0 && squares[i].innerHTML == squares[i + 4].innerHTML && squares[i + 4].innerHTML == squares[i + 8].innerHTML) {
                alertWiner(i)
            }
            if (i == 2 && squares[i].innerHTML == squares[i + 2].innerHTML && squares[i + 2].innerHTML == squares[i + 4].innerHTML) {
                alertWiner(i)
            }
        }
    }
}
function alertWiner(i) {
    alert_winer.innerHTML = squares[i].innerHTML + ' Thắng';
    player = squares[i].innerHTML;
    resetGame.innerHTML = button;
}
function reset() {
    squares.forEach(square => {
        square.innerHTML = '';
        square.className === "x" ? square.classList.remove('x') : square.classList.remove('o');
    })
    count = 0;
    player = '';
    alert_winer.innerHTML = '';
    resetGame.innerHTML = '';
}
squares.forEach(square => square.addEventListener('click', playGame))
resetGame.addEventListener('click', reset);

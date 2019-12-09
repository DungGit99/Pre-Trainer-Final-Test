
const grids = getElement("#grids");
const nums = getElement("#nums");
const playGame = getElement("#playGame");
const container = getElement("#container");
const alert_winer = document.querySelector("#alert_winer");
const resetGame = document.querySelector("#resetGame");
const button = '<button>Reset Game</button>';
let click = 0;
let player = "";
//
function getElement(selector) {
    return document.querySelector(selector);
}
//
function renderBoard(row) {
    let html = "<table>";
    for (let i = 0; i < row; i++) {
        html += "<tr>";
        for (let j = 0; j < row; j++) {
            html += "<td  row='" + i + "' col='" + j + "'></td>";
        }
        html += "</tr>";
    }
    html += "</table>";
    return html;
}
//
function startGame() {
    if (parseInt(nums.value) > parseInt(grids.value)) {
        alert('Bạn hãy nhập lại');
    } else {
        container.innerHTML = renderBoard(grids.value);
        document.querySelectorAll("td").forEach(box => box.addEventListener("click", choose));
    }
}
// 
function choose(event) {
    if (this.innerHTML == '' && player == '') {
        click++;
        if (click % 2 != 0) {
            this.innerHTML = "X";
            this.classList.add('x')
        } else {
            this.innerHTML = "0";
            this.classList.add('o')
        }
    }
    checkWiner();
}
//
function checkWiner() {
    let grid = parseInt(grids.value);
    let num = parseInt(nums.value);
    let squares = document.querySelectorAll("td");
    // check hòa 
    if (click == squares.length) {
        alert_winer.innerHTML = 'Hòa';
        resetGame.innerHTML = button;
    }
    for (let i = 0; i < squares.length; i++) {

        if (squares[i].innerHTML != '') {
            //
            if ((i + (num - 1) * grid < squares.length)) {
                let count = 1;
                for (let j = i + grid; j < i + num * grid; j += grid) {
                    if (squares[i].innerHTML == squares[j].innerHTML) {
                        count++;
                    }
                    if (count == num) {
                        alertWiner(i);
                    }
                }
            }
            //
            if ((i + num <= squares.length) && (i % grid + num <= grid)) {
                let count = 1;
                for (let j = i + 1; j < num + i; j++) {
                    if (squares[i].innerHTML == squares[j].innerHTML) {
                        count++;
                    }
                    if (num == count) {
                        alertWiner(i)
                    }
                }
            }
            //
            if ((i % grid + num <= grid) && (i + (num - 1) * grid < squares.length)) {
                let count = 1;
                for (let j = i + grid + 1; j < i + num * (grid + 1) - 1; j = j + grid + 1) {
                    if (squares[i].innerHTML == squares[j].innerHTML) {
                        count++;
                    }
                    if (count == num) {
                        alertWiner(i);
                    }
                }
            }
            //
            if ((i % grid - num + 1 >= 0) && (i + (num - 1) * grid < squares.length)) {
                let count = 1;

                for (let j = i + grid - 1; j < i + num * (grid - 1); j = j + grid - 1) {
                    if (squares[i].innerHTML == squares[j].innerHTML) {
                        count++;
                    }
                    if (count == num) {
                        alertWiner(i);
                    }
                }
            }
        }


    }


}
function alertWiner(i) {
    let squares = document.querySelectorAll("td");
    alert_winer.innerHTML = squares[i].innerHTML + ' Thắng';
    player = squares[i].innerHTML;
    resetGame.innerHTML = button;
}
function reset() {
    let squares = document.querySelectorAll("td");
    squares.forEach(square => {
        square.innerHTML = '';
        square.className === "x" ? square.classList.remove('x') : square.classList.remove('o');
    })
    click = 0;
    player = '';
    alert_winer.innerHTML = '';
    resetGame.innerHTML = '';
}
playGame.addEventListener('click', startGame);
resetGame.addEventListener('click', reset);


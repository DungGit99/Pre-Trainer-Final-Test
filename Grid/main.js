const row = document.querySelector("#row");
const col = document.querySelector("#col");
const container = document.querySelector("#container");
const submit = document.querySelector("#submit");
let data = [];
function renderBoard(row, col) {
    let html = "<table>";
    for (let i = 0; i <= row; i++) {
        html += "<tr>";
        for (let j = 0; j < col; j++) {
            html += "<td row='" + i + "' col='" + j + "'></td>";
        }
        html += "</tr>";
    }
    html += "</table>";
    return html;
}

function sortGrid(event) {
    let cols = parseInt(col.value);
    let stt = parseInt(this.innerHTML) ;
    let tds = document.querySelectorAll("td");
    let arr = [];
    data.sort((a, b) => {
        return a[stt-1] - b[stt-1];
    })
    for (let i = 0; i < data.length; i++) {
        arr.push(...data[i]);
    }
    for (let i = cols; i < tds.length; i++) {
        tds[i].innerHTML = arr[i - cols];
    }
}
function dataGrid() {
    let cols = parseInt(col.value);
    let tds = document.querySelectorAll("td");
    for (let i = cols; i < tds.length; i += cols) {
        let arr = [];
        for (let j = i; j < i + cols; j++) {
            arr.push(tds[j].innerHTML);
        }
        data.push(arr);
    }
}
function viewGrid() {
    let cols = parseInt(col.value);
    let tds = document.querySelectorAll("td");
    for (let i = 0; i < tds.length; i++) {
        if (i < cols) {
            tds[i].innerHTML = i + 1;
        } else {
            tds[i].innerHTML = Math.floor(Math.random() * 1000) + 1;
        }
    }
}
function loadGrid() {
    let rows = parseInt(row.value);
    let cols = parseInt(col.value);
    container.innerHTML = renderBoard(rows, cols);
    viewGrid();
    dataGrid();
    let stt = document.querySelectorAll("tr:first-child td");
    stt.forEach(col => col.addEventListener('click', sortGrid));
}
submit.addEventListener('click', loadGrid);

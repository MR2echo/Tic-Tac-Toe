const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.reset');
const currentTurn = document.querySelector('.current-trun');
const plaer1score = document.querySelector('.score1');
const plaer2score = document.querySelector('.score2');
const draw = document.querySelector('.draw');
const messageContent = document.querySelector('.content');
const overlay = document.getElementById('overlay');
const closeBtn  = document.getElementById('close');


const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let trun = true;
let usedCells = [];
let winner = false;
let ties = 0;

let player1 = {
    symbol : '<i class="fa fa-close"></i>',
    played : [],
    score : 0 
}
let player2 = {
    symbol : '<i class="fa-regular fa-circle"></i>',
    played : [],
    score : 0
}


checkTrun();

for(let i=0; i<9; i++){
    cells[i].addEventListener('click', () =>{
        if(isEmpty(i)){
            if(trun){
                addSymbole(player1, i);
                trun = false;
                checkWin(player1);
                checkTrun();
            }else{
                addSymbole(player2, i);
                trun = true;
                checkWin(player2);
                checkTrun();
            }
        }else{
            alert('choose an empty cell')
        }
        
    })
}


function addSymbole(player, i) {
    cells[i].innerHTML =player.symbol;
    player.played.push(i);
    usedCells.push(i);
}


function checkWin(player){
   if(!winner){
    winCombos.some(combo => {
        if(combo.every(index => player.played.includes(index))){
            winner = true;
            player.score++;
            showScore();
            setTimeout(showMessage, 500, player, winner);
            reset();           
         }
       })
   }

   if(!winner && usedCells.length == 9){
     ties++;
     showScore();
     setTimeout(showMessage, 500);
   }
}


function isEmpty(i){
    if(usedCells.includes(i)){
        return false;
    }
    return true;
}



function reset(){
    cells.forEach(cell => {
        cell.innerHTML = '';
    })

    winner = false;
    usedCells = [];
    player1.played = [];
    player2.played = [];
    trun = true;
    checkTrun();
}


resetBtn.addEventListener('click', reset);

function checkTrun() {
    if(trun){
       currentTurn.innerHTML = player1.symbol;
    }else{
        currentTurn.innerHTML = player2.symbol;
    }
}



function showScore(){
    plaer1score.innerHTML = player1.score;
    plaer2score.innerHTML = player2.score;
    draw.innerHTML = ties;
}




closeBtn.addEventListener('click', () =>{
    overlay.style.display ='none';
})


function showMessage(player, winner){
    overlay.style.display = 'flex';
    if(winner){
        messageContent.innerHTML = player.symbol + ' is the <h2>Winner</h2>';
    }else{
        messageContent.innerHTML ='It is a <h2>Draw</h2>';
    }
    reset();
}
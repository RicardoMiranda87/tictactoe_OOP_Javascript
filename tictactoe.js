var turn = 0;
const ticTacToeGame = new TicTacToeGame();

ticTacToeGame.start();

function TicTacToeGame() {
  const board = new Board();
  const player1 = new Player1(board);
  const player2 = new Player2(board);

  // Inicia o game
  this.start = function() {
    const config = { childList: true };
    const observer = new MutationObserver(() => takeTurn());
    board.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  }

  // Função da vez
  function takeTurn() {
    if (board.checkForWinner()) {
      return;
    }

    if (turn % 2 == 0) {
      player1.takeTurn();
    } else {
      player2.takeTurn();
    }
    // Verificação velha
    if (turn == 9){
      swal({ 
        title: "Deu Velha !!!",
        text: "Clique para continuar!",
        icon: "warning",
      }).then((ok) => { 
        if(ok){ 
          turn = 0;
          for(var i = 1; i <= 9; i++){ 
          document.getElementById('pos' + i).innerHTML = '';
         }  
        }
      });
    }

    turn++;
  };
}

function Board() {
  this.positions = Array.from(document.querySelectorAll('.col'));

  this.checkForWinner = function() {
    let winner = false;

    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];

    // Verificação de vencedor
    const positions = this.positions;
    winningCombinations.forEach((winningCombo) => {
      const pos0InnerText = positions[winningCombo[0]].innerText;
      const pos1InnerText = positions[winningCombo[1]].innerText;
      const pos2InnerText = positions[winningCombo[2]].innerText;
      const isWinningCombo = pos0InnerText !== '' && pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;

      if (isWinningCombo) {
        winner = true;

        // Cálculo do placar
        let p1 = parseInt(document.querySelector("#win" + pos0InnerText).innerText);
        const p2 = parseInt(1);
        document.querySelector("#win" + pos0InnerText).innerText = p1 + p2;

        swal({ 
          title: pos0InnerText + " Ganhou!!!",
          text: "Clique para continuar!",
          icon: "success",
        }).then((ok) => { 
          if(ok){ 
            turn = 0;
            for(var i = 1; i <= 9; i++){ 
            document.getElementById('pos' + i).innerHTML = '';
            }  
          }
        });
      }
    });

    return winner;
  }
}

function Player1(board) {
  this.takeTurn = function() {
    board.positions.forEach(el =>
      el.addEventListener('click', handleTurnTaken));
  }

  function handleTurnTaken(event) {
    if (event.target.innerText == ''){
      event.target.innerText = 'X';
      event.target.style.color = "#A52A2A";
      board.positions
        .forEach(el => el.removeEventListener('click', handleTurnTaken));
    }
  }
}

function Player2(board) {
  this.takeTurn = function() {
    board.positions.forEach(el =>
      el.addEventListener('click', handleTurnTaken));
  }

  function handleTurnTaken(event) {
    if (event.target.innerText == ''){
      event.target.innerText = 'O';
      event.target.style.color = "#1E90FF";
      board.positions
        .forEach(el => el.removeEventListener('click', handleTurnTaken));
    }
  }
}

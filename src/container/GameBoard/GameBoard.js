import React, { Component } from 'react';

import Slat from '../../component/Slat/Slat';
import './GameBoard.css';

class GameBoard extends Component {
    state = {
        boardState: new Array(7).fill(new Array(6).fill(null)),
        playerTurn: "Red",
        gameMode: "",
        gameSelected: false,
        winner: ""
    };
  
    selectedGame = (mode) => {
        this.setState({
            gameMode: mode,
            gameSelected: true, 
            boardState: new Array(7).fill(new Array(6).fill(null))
        });
    };
  
    makeMove = (slatID) => {
        const updateBoard = this.state.boardState.map(function(arr) {
            return arr.slice();
        });
        if (updateBoard[slatID].indexOf(null) !== -1) {
            let newSlat = updateBoard[slatID].reverse();
            newSlat[newSlat.indexOf(null)] = this.state.playerTurn;
            newSlat.reverse();
            this.setState({
                playerTurn: this.state.playerTurn === "Red" ? "Blue" : "Red",
                boardState: updateBoard
            });
        }
    };

    handleClick = (slatID) => {
        if (this.state.winner === "") {
            this.makeMove(slatID);
        }
    };
    
    componentDidUpdate () {
        let winner = this.checkWinner(this.state.boardState);
        if (this.state.winner !== winner) {
            this.setState({
                winner: winner
            });
        }
        else {
            if (this.state.gameMode === "ai" && this.state.playerTurn === "Blue") {
                let validMove = -1;
                while (validMove === -1) {
                    let slat = Math.floor((Math.random() * 7));
                    if (this.state.boardState[slat].indexOf(null) !== -1) {
                        validMove = slat;
                    }
                    else {
                        validMove = -1;
                    }
                }
                this.makeMove(validMove);
            }
        }
    }

    checkLine = (a, b, c, d) => {
        return ((a !== null) && (a === b) && (a === c) && (a === d));
    };
    
    checkWinner = (bs) => {
        for (let c = 0; c < 7; c++) {
            for (let r = 0; r < 4; r++) {
                if (this.checkLine(bs[c][r], bs[c][r+1], bs[c][r+2], bs[c][r+3])) {
                    return bs[c][r] + " wins! Game has finished!";
                }
            }
        }
    
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 4; c++) {
                if (this.checkLine(bs[c][r], bs[c+1][r], bs[c+2][r], bs[c+3][r])) {
                    return bs[c][r] + " wins! Game has finished!";
                }
            }
        }
    
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 4; c++) {
                if (this.checkLine(bs[c][r], bs[c+1][r+1], bs[c+2][r+2], bs[c+3][r+3])) {
                    return bs[c][r] + " wins! Game has finished!";
                }
            }
        }
    
        for (let r = 0; r < 4; r++) {
            for (let c = 3; c < 6; c++) {
                if (this.checkLine(bs[c][r], bs[c-1][r+1], bs[c-2][r+2], bs[c-3][r+3])) {
                    return bs[c][r] + " wins! Game has finished!";
                }
            }
        }
    
        return "";
    };
  
    render(){
        let winnerMessageStyle = "winnerMessage"; 
        
        if (this.state.winner !== "") {
            winnerMessageStyle += " appear";
        }

        let slats = (
            [...Array(this.state.boardState.length)].map((x, i) => {
                return (
                    <Slat 
                        key={i}
                        holes={this.state.boardState[i]}
                        handleClick={() => this.handleClick(i)}
                        numberValue={i}>
                    </Slat>
                );
            })
        );

        let playerTurnMessage = "";

        if(this.state.gameSelected && !this.state.winner) {
            playerTurnMessage = this.state.playerTurn + " Turn";
        }
  
        return (
        <div className="Game">
            {
                this.state.gameSelected &&
                <div className="Board">
                    {slats}
                </div>
            }
            <div className="winnerMessage appear">
                {playerTurnMessage}
            </div>
            <div className={winnerMessageStyle}>
                {this.state.winner}
            </div>
            {
                (!this.state.gameSelected || this.state.winner !== "") &&
                <div>
                    <button onClick={() => this.selectedGame("human")}>Play Human</button>
                    <button onClick={() => this.selectedGame("ai")}>Play AI</button>
                </div>
            }
        </div>
        )
    }
}

export default GameBoard;
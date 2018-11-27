var Coin = require('./coin.js');
var Chris = require('./chris.js');

function Game() {
    this.board = document.querySelectorAll('#board > div');
    this.chris = new Chris();
    this.coin = new Coin();
    this.score = 0;
    this.isOver = false;

    this.index = function(x,y) {
        return x + y*10;
    };

    this.hideVisibleChris = function () {
        document.querySelector('.chris').classList.remove('chris', 'up', 'down', 'left', 'right');
    };

    this.showChris = function() {
        this.board[ this.index(this.chris.x,this.chris.y) ].classList.add('chris', this.chris.direction);
    };

    this.showCoin = function () {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    };

    this.moveChris = function () {
        this.hideVisibleChris();
        if(this.chris.direction === "right") {
            this.chris.x++;
        } else if (this.chris.direction === "left") {
            this.chris.x--;
        } else if (this.chris.direction === "up") {
            this.chris.y--;
        } else if (this.chris.direction === "down") {
            this.chris.y++;
        }
        this.checkCoinCollision();
        this.gameOver();
        if (!this.isOver) {
            this.showChris();
        } else {
            this.showScore();
        }
    };

    this.turnChris = function(event) {
        switch (event.code) {
            case "ArrowDown":
                this.chris.direction = "down";
                break;
            case "ArrowUp":
                this.chris.direction = "up";
                break;
            case "ArrowLeft":
                this.chris.direction = "left";
                break;
            case "ArrowRight":
                this.chris.direction = "right";
                break;
        }
    };

    this.checkCoinCollision = function() {
        if(this.coin.x === this.chris.x && this.coin.y === this.chris.y) {
            document.querySelector('.coin').classList.remove('coin');
            this.score ++;
            document.querySelector('#score strong').innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function() {
        if(this.chris.x > 9 || this.chris.x < 0 || this.chris.y > 9 || this.chris.y < 0) {
            clearInterval(this.idSetInterval);
            this.isOver = true;
        }
    };
    this.showScore = function() {
        document.querySelector('#over strong').innerText = this.score;
        document.querySelector('#over').classList.remove('invisible');
    };

    this.startGame = function () {
        this.showChris();
        this.showCoin();
        this.idSetInterval = setInterval(()=> {
            this.moveChris();
        }, 500);
    };
}

module.exports = Game;
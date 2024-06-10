class automata {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.cells = [];
        this.height = 200;
        this.width = 200;
        this.tickCount = 0;
        this.ticks = 0;
        this.speed = parseInt(document.getElementById("speed").value, 5);

        for (let col = 0; col < this.width; col++) {
            this.cells.push([]);
            for (let row = 0; row < this.height; row++) {
                this.cells[col][row] = 0;
            }
        }
        this.loadRandomCells();
    };

    loadRandomCells() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.cells[col][row] = this.getRandomState();
            }
        }
    };

    getRandomState() {
        return Math.random() < 0.5 ? 0 : 1;
    }

    addBlock(col, row) {
        this.cells[col][row] = 1;
        this.cells[col + 1][row] = 1;
        this.cells[col][row + 1] = 1;
        this.cells[col + 1][row + 1] = 1;
    };

    countNeighbors(col, row) {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ((i || j) && this.cells[col + i] && this.cells[col + i][row + j]) count++;
            }
        }
        return count;
    };

    loadAutomata() {
        this.cells = [];
        for (let col = 0; col < this.width; col++) {
            this.cells.push([]);
            for (let row = 0; row < this.height; row++) {
                this.cells[col][row] = 0;
            }
        }
        this.addBlock(10, 10);
    };

    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);
        if (this.tickCount++ >= this.speed && this.speed != 120) {
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            let nextGen = [];
            for (let col = 0; col < this.width; col++) {
                nextGen.push([]);
                for (let row = 0; row < this.height; row++) {
                    nextGen[col].push(0);
                }
            }

            for (let col = 0; col < this.width; col++) {
                for (let row = 0; row < this.height; row++) {
                    let alive = this.cells[col][row];
                    let neighbors = this.countNeighbors(col, row);
                    if (alive && (neighbors === 2 || neighbors === 3)) nextGen[col][row] = 1;
                    if (!alive && neighbors === 3) nextGen[col][row] = 1;
                }
            }
            this.cells = nextGen;
        }
    };

    draw(ctx) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = "Blue";
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.cells[col][row];
                if (cell) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
            }
        }
    };
};
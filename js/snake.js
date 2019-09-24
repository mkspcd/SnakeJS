// Constants - modify the CSS accordingly
const COLUMNS	= 20;
const ROWS	= 20;
const SIZE	= 20;

// Grid content values
const EMPTY	= 0;
const SNAKE	= 1;
const FOOD	= 2;

// Snake directions
const NONE	= 0;
const LEFT	= 1;
const UP		= 2;
const RIGHT	= 3;
const DOWN	= 4;

// Game speed (higher is slower)
const SPEED	= 10;

// Keycodes
const KEY_LEFT	= 37;
const KEY_UP		= 38;
const KEY_RIGHT	= 39;
const KEY_DOWN	= 40;

// Game colors
const EMPTY_COLOR	= "#bbc701";
const SNAKE_COLOR	= "#6c5f00";
const FOOD_COLOR	= "#6c5f00";

//-----------------------------------------------------
const board = {
	width	: null,
	height	: null,
	grid	: null,

	init: function() {
		this.width	= COLUMNS;
		this.height	= ROWS;

		this.grid = [];
		for ( var x = 0; x < COLUMNS; x++ ) {
			this.grid.push([]);
			for ( var y = 0; y < ROWS; y++ ) {
				this.grid[x].push(EMPTY);
			}
		}
	},

	set: function(value, x, y) {
		this.grid[x][y] = value;
	},

	get: function(x, y) {
		return this.grid[x][y];
	}
}

//-----------------------------------------------------
const snake = {
	direction	: null,
	last		: null,
	queue		: null,

	init: function() {
		this.direction	= RIGHT;
		this.queue		= [];

		// Insert the firts joints :
		this.insert( Math.floor(COLUMNS/2) - 3, Math.floor(ROWS/2));
		this.insert( Math.floor(COLUMNS/2) - 2, Math.floor(ROWS/2));
		this.insert( Math.floor(COLUMNS/2) - 1, Math.floor(ROWS/2));

		for ( let i = 0; i < snake.queue.length; i++) {
			board.set(SNAKE, snake.queue[i].x, snake.queue[i].y);
		}
	},

	// Prepends a new element in the queue, and set 'last' to this new prepended element
	insert: function(x, y) {
		this.queue.unshift( {x:x, y:y} );
		this.last = this.queue[0];
	},

	// Remove and return the last element of the queue
	remove: function() {
		return this.queue.pop()
	}
}

//-----------------------------------------------------
function setFood() {

	// We need to track all the empty spaces in the grid
	const empty = [];
	for ( let x = 0; x < board.width; x++ ) {
		for ( let y = 0; y < board.height; y++ ) {
			if ( board.get(x, y) == EMPTY ) {
				empty.push( {x:x, y:y} );
			}
		}
	}

	const randomPosition = empty[Math.floor( Math.random() * empty.length )];
	board.set(FOOD, randomPosition.x, randomPosition.y);
}

//-----------------------------------------------------
// Game objects
let canvas, context, keystate, frames, points;

function main() {
	canvas = document.createElement("canvas");
	canvas.width = COLUMNS * SIZE;
	canvas.height = ROWS * SIZE;
	context = canvas.getContext("2d");
	document.getElementById("game").appendChild(canvas);

	frames = 0;
	keystate = 0;
	points = 0;

	document.addEventListener("keydown", function(event) {
		keystate = event.keyCode;
	});
	document.addEventListener("keyup", function(event) {
		keystate = 0;
	});

	init();
	loop();
}

function init() {
	board.init();
	snake.init();
	setFood();
	points = 0;
}

function loop() {
	update();
	draw();

	window.requestAnimationFrame(loop, canvas);
}

function update() {
	frames++;

	if (keystate == KEY_LEFT && snake.direction !== RIGHT) { snake.direction = LEFT; }
	if (keystate == KEY_UP && snake.direction !== DOWN) { snake.direction = UP; }
	if (keystate == KEY_RIGHT && snake.direction !== LEFT){ snake.direction = RIGHT; }
	if (keystate == KEY_DOWN && snake.direction !== UP) { snake.direction = DOWN; }

	if (frames % SPEED == 0) {
		console.log("Frames : " + frames);
		if (frames === 1000 * SPEED) { frames = 0; }

		let newX = snake.last.x;
		let newY = snake.last.y;

		switch(snake.direction) {
			case LEFT:
				newX--;
				break;
			case UP:
				newY--;
				break;
			case RIGHT:
				newX++;
				break;
			case DOWN:
				newY++;
				break;
		}

		if ( 0 > newX || newX > board.width - 1 || 0 > newY || newY > board.height - 1 || board.get(newX, newY) == SNAKE) {
			return init();
		}

		let tail;
		if ( board.get(newX, newY) == FOOD ) {
			tail = {x:newX, y:newY};
			points++;
			setFood();
		} else {
			tail = snake.remove();
			board.set(EMPTY, tail.x, tail.y);
			tail.x = newX;
			tail.y = newY;
		}

		board.set(SNAKE, tail.x, tail.y);
		snake.insert(tail.x, tail.y);

		const score = document.getElementById("score");
		score.innerHTML = "SCORE : " + points;
	}
}

function draw() {

	for ( let x = 0; x < board.width; x++ ) {
		for ( let y = 0; y < board.height; y++ ) {
			switch ( board.get(x, y) ) {
				case EMPTY:
					context.fillStyle = EMPTY_COLOR;
					break;
				case SNAKE:
					context.fillStyle = SNAKE_COLOR;
					break;
				case FOOD:
					context.fillStyle = FOOD_COLOR;
					break;
			}
			context.fillRect( x * SIZE, y * SIZE, SIZE, SIZE );
		}
	}
}

//-----------------------------------------------------

main();


/*
Ameliorations to consider :
	- Body bg color bg and font ccolor so that if someone want to switch colors, he only needs to mmodify the snake.js file (and not the style.css file),
	- Food cannot be near/against the snake at the beginning of the game,
	- Variable speed game : the longer the snake, the faster the game,
	- Snake start still, and doesn't move until the player press a direction.
	- Different gamestates (pregame, ingame, paused, gameover) : useful if I want to add the ability to pause the game, etc.
*/

// Constants - modify the CSS accordingly
var COLUMNS	= 20;
var ROWS	= 20;
var SIZE	= 20;

// Grid content values
var EMPTY	= 0;
var SNAKE	= 1;
var FOOD	= 2;

// Snake directions
var NONE	= 0;
var LEFT	= 1;
var UP		= 2;
var RIGHT	= 3;
var DOWN	= 4;

// Game colors
var EMPTY_COLOR	= "#bbc701";
var SNAKE_COLOR	= "#6c5f00";
var FOOD_COLOR	= "#6c5f00";

// GameState (pregame, ingame, paused, gameover)



//-----------------------------------------------------
var board = {
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
var snake = {
	direction	: null,
	last		: null,
	queue		: null,
	
	init: function() {
		this.direction	= NONE;		
		this.queue		= [];
		
		// Insert the firts joints : 
		this.insert( Math.floor(COLUMNS/2) - 3, Math.floor(ROWS/2));
		this.insert( Math.floor(COLUMNS/2) - 2, Math.floor(ROWS/2));
		this.insert( Math.floor(COLUMNS/2) - 1, Math.floor(ROWS/2));

		for ( var i = 0; i < snake.queue.length; i++) {
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
	var empty = [];
	for ( var x = 0; x < board.width; x++ ) {
		for ( var y = 0; y < board.height; y++ ) {
			if ( board.get(x, y) == EMPTY ) {
				empty.push( {x:x, y:y} );
			}
		}
	}
	
	var randomPosition = empty[Math.floor( Math.random() * empty.length )];
	board.set(FOOD, randomPosition.x, randomPosition.y);
}

//-----------------------------------------------------
// Game objects
var canvas, context, keystate, frames;

function main() {
	canvas = document.createElement("canvas");
	canvas.width = COLUMNS * SIZE;
	canvas.height = ROWS * SIZE;
	context = canvas.getContext("2d");
	document.getElementById("game").appendChild(canvas);
	
	frames = 0;
	
	init();
	loop();
}

function init() {
	board.init();
	snake.init();
	setFood();	
}

function loop() {
	update();
	draw();
	
	window.requestAnimationFrame(loop, canvas);
}

function update() {
}

function draw() {
	
	for ( var x = 0; x < board.width; x++ ) {
		for ( var y = 0; y < board.height; y++ ) {
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
Amelioration : 
color bg and font in js
food cannot be near snake at beginning


*/























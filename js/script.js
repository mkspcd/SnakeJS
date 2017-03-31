// Constants
var COLUMNS	= 20;
var ROWS	= 20;

// Grid content
var EMPTY = 0;
var SNAKE = 1;
var FRUIT = 2;

// Directions
var LEFT	= 0;
var UP		= 1;
var RIGHT	= 2;
var DOWN	= 3;

//-----------------------------------------------------
var grid = {
	width: null,
	height: null,
	_grid: null,
	
	init: function(defaultId, columns, rows) {
		this.width = columns;
		this.height = rows;
		
		this._grid = [];
		for ( var x = 0; x < columns; x++ ) {
			this._grid.push([]);
			for ( var y = 0; y < rows; y++ ) {
				this._grid[x].push(defaultId);
			}
		}
	},
	
	set: function(id, x, y) {
		this._grid[x][y] = id;
	},
	
	get: function(x, y) {
		return this._grid[x][y];
	}
}


//-----------------------------------------------------
var snake = {
	direction: null,
	last: null,
	queue: null,
	
	init: function(direction, column, row) {
		this.direction = direction;
		
		this.queue = [];
		this.insert(column, row);
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
	for ( var x = 0; x < grid.width; x++ ) {
		for ( var y = 0; y < grid.height; y++ ) {
			if ( grid.get(x, y) == EMPTY ) {
				empty.push( {x:x, y:y} );
			}
		}
	}
	
	var randomPosition = empty[Math.floor( Math.random() * empty.length )];
	grid.set(FRUIT, randomPosition.x, randomPosition.y);
}

//-----------------------------------------------------
// Game objects
var canvas, context, keystate, frames;

function main() {
	canvas = document.createElement("canvas");
	canvas.width = COLUMNS * 20;
	canvas.height = ROWS * 20;
	context = canvas.getContext("2d");
	document.body.appendChild(canvas);
	
	frames = 0;
	keystate = {};
	
	init();
	loop();
}

function init() {
	grid.init(EMPTY, COLUMNS, ROWS);
	
	var startPosition = {x:Math.floor(COLUMNS/2), y:Math.floor(ROWS/2)};
	snake.init(UP, startPosition.x, startPosition.y);
	grid.set(SNAKE, startPosition.x, startPosition.y);
	
	setFood();
}

function loop() {
	update();
	draw();
	
	window.requestAnimationFrame(loop, canvas);
}

function update() {
	frames++;
	
	if (frames%5 === 0) {
		var newX = snake.last.x;
		var newY = snake.last.y;
		console.log("newX : " + newX + ", newY : " + newY);
			
		switch(snake.direction) {
			case LEFT:
				newX--;
				break;
			case RIGHT:
				newX++
				break;
			case UP:
				newY--;
				break;
			case DOWN:
				newY++;
				break;
			default:
				break;
		}
		
		// Checks if the snake touches the borders
		if(	0 > newX || newX > grid.width - 1 
		   	|| 0 > newY || newY > grid.height - 1 
		   	|| grid.get(newX, newY) === SNAKE ) {
		   return init();
		}

		var tail = snake.remove();
		grid.set(EMPTY, tail.x, tail.y);
		tail.x = newX;
		tail.y = newY;

		snake.insert(tail.x, tail.y);
	}
}

function draw() {
	var tileWidth = canvas.width / grid.width;
	var tileHeight = canvas.height / grid.height;
	
	for ( var x = 0; x < grid.width; x++ ) {
		for ( var y = 0; y < grid.height; y++ ) {
			switch ( grid.get(x, y) ) {
				case EMPTY:
					context.fillStyle = "#ecf0f1";
					break;
				case SNAKE:
					context.fillStyle = "#2ecc71";
					break;
				case FRUIT:
					context.fillStyle = "#e74c3c";
					break;
			}
			context.fillRect( x * tileWidth, y * tileHeight, tileWidth, tileHeight );
		}
	}

}

//-----------------------------------------------------

main();

// Constants
var COLUMNS = 20;
var ROWS = 20;

// Grid content
var EMPTY = 0;
var SNAKE = 1;
var FRUIT = 2;

//-----------------------------------------------------
var grid = {
	width: null,
	heigth: null,
	grid: null,
	
	init: function(defaultId, columns, rows) {
		this.width = columns;
		this.heigth = rows;
		
		this.grid = [];
		for ( var x = 0; x < columns; x++ ) {
			this.grid.push([]);
			for ( var y = 0; y < rows; y++ ) {
				this.grid[x].push(defaultId);
			}
		}
	},
	
	set: function(id, x, y) {
		this.grid[x][y] = id;
	},
	
	get: function(x, y) {
		return this.grid[x][y];
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
	
	insert: function(value, x, y) {
	
	
	},
	
	remove: function() {}
}

//-----------------------------------------------------
function setFood() {}

//-----------------------------------------------------
function main() {}

function init() {}

function loop() {}

function draw() {}


//-----------------------------------------------------

main();

# Snake JS

The classic game Snake, written in Javascript.


I used a grid data structure to represent the world and its elements.

````
┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃
┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
┃ 0 ┃ 1 ┃ 1 ┃ 1 ┃ 1 ┃ 0 ┃ 0 ┃ 0 ┃
┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 1 ┃ 0 ┃ 0 ┃ 0 ┃
┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃
┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃
┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
┃ 0 ┃ 0 ┃ 2 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃
┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃
┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃ 0 ┃
┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
````

The 0s are the empty spaces, the 1s represents the snake, 2 represent the food.

The snake work as a queue (FIFO) of data with all the current positions in the grid with the snake id.
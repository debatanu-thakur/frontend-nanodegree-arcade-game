# HMTL5 Canvas Game
## Description
This game is developed in HTML 5 Canvas. This game has a `player`, i.e. you and `enemies`.
The `player` has to start from one end of the screen and reach the other side. The `enemies` move from left to right and block the `player` from reaching the destination. You as a `player` have to avoid colliding the `enemy` and reach the top, which is the water and the destination of the game.
## Pre-requisites
Please have the following softwares installed.
- Goolge Chrome or any HTML 5 Canvas supporting browser. You can find the supported browser details [here](http://caniuse.com/#search=canvas);

## Setup
Please follow the below instructions to setup the environment.
```sh
$ git clone https://github.com/debatanu-thakur/frontend-nanodegree-arcade-game.git

```
You can play the game by following either of the below instructions
- Open the `index.html` in any of the HTML5 Canvas supported browser.

**OR**
- If you have node installed in your system.
```sh
$ npm install -g live-server
....
....
$ cd frontend-nanodegree-arcade-game
$ live-server
```
The default browser opens with `index.html` hosted at `port: 8080`.
Now you can play the game.
## Game Instructions
1. The player - ![player](//raw.githubusercontent.com/debatanu-thakur/frontend-nanodegree-arcade-game/master/images/char-boy.png).
2. The enemy - ![enemy](//raw.githubusercontent.com/debatanu-thakur/frontend-nanodegree-arcade-game/master/images/enemy-bug.png).
3. `Up`, `Down`, `Left` and `Right` button moves the player in the respective directions.
4. The enemies move from `left` to `right`.
5. You win by reaching to the top, to the water.
6. If you collide with the enemy the game resets and you begin again.
## License
The contents of this repo is subjected to [MIT License](https://github.com/debatanu-thakur/license-store/blob/master/mit_license.txt).

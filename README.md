# Minesweeper
### Created with ReactJS and Express.
All the logic of the game is implemented on the backend and then rendered the revealed cells on the front-end, avoiding the possibility of getting the position of the mines from the client side.


# API Documentation
#### The methods always return the current state of the player's games

## /api/player/:email
- Gets current player state
#### method: `GET`
#### response
- ##### email `[String]`: current player's email
- ##### currentGame `[Object]`: `Game` object containing the `board` array, `started` time and `ended` time
- ##### games `[Array]`: list of `Game` objects previously played


## /api/create
- Creates a new game for the current player
#### method `POST`
#### params
- ##### email `[String]`
- ##### config `[Object]` containing `rows`, `columns` and `mines` Numbers

#### response
- ##### email `[String]`: current player's email
- ##### currentGame `[Object]`: new `Game` object containing the `board` array and `started` time
- ##### games `[Array]`: list of `Game` objects previously played


## /api/click
- Informs user click at the specified cell ([x, y] coordinates), being the coordinate `[0,0]` the top left corner.
#### method `POST`
#### params
- ##### email `[String]`
- ##### x `[Number]`
- ##### y `[Number]`

#### response
- ##### email `[String]`: current player's email
- ##### currentGame `[Object]`: `Game` object containing the `board` array, `started` time and `ended` time
- ##### games `[Array]`: list of `Game` objects previously played

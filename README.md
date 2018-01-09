##    Technologies Used
1.    HTML5
2.    SCSS
3.    JavaScript
4.    jQuery
5.    Ajax
6.    Bootstrap

##    Wire-frame
[my wire-frame](https://projects.invisionapp.com/freehand/document/S5mSo0MdL)

After reviewing the required specs I decided to update my wireframe.

[my wire-frame updated](https://projects.invisionapp.com/freehand/document/TjHvDLQSg)

After finishing my project I updated the wireframe to match my new project
[final wire-frame](https://projects.invisionapp.com/freehand/document/wN0PUxYBJ)
##    My story
-    As a user I want to access the tic-tac-toe games.
-    As a coder I want access to the files via github
-    As a user/coder viewing the file, I would want a clear cut understanding of the process in creating the game.
-    As a coder/employer I want a clear README doc, to:
    1.    explain the process of creating the game
    1.   List technologies used
    1.    List problems/tricky parts of the code
    1.    Link wire-frame and story
    1.    Explain any thing that the designer would improve in the future
-    As a user/coder/employer I want easy access to the site via git-hub.
-    As a user I want to see a modern page, that seamlessly transitions between pages(as a coder I know it's actually different views!)
-    As a user I want to play the game tic-tac-toe, having the tokens switch from x to o, without me having to do anything!
-   As I user I want an indication of win, loss or draw.
-   As a user I want to be able to sign up, log-in and change my password and logging out as needed & I want to know if I was successful in doing these actions.

##    Plan of attack
### Planning
1.   Create User Stories
1.   Review Wire Frames

### Set Up
1.   Download Browser Template
1.   Create a Github Repository
1.   Deploy to Github Pages

### Design Skeleton
1.   Design with HTML and Bootstrap
1.   Style with SCSS

### Game Engine
1.   Create Empty Board in JS
1.   Add to Board
    -  Turn rotates between x and o
    -  Can not choose already occupied spots
    -  Check Board for Winner

### Authentication
1.   Sign Up (curl then web app)
1.   Sign In (curl then web app)
1.   Change Password (curl then web app)
1.   Sign Out (curl then web page)
1.   All API calls have success or failure messages

### Game UI
1.   Upate wireframe
1.   Design a game board accordingly
1.   Add a click handler for when a space on the game board is clicked
1.   If the user clicks on a valid space then add their X or O
1.   Do not allow users to add an X or O to an invalid space
1.   Do not allow users to add an X or O to any spaces after the game is over
1.   Update the game engine when the game board is updated
1.   Add messaging for the user when the turn changes
1.   Add messaging for the user when the user clicks on an invalid space
1.   Add messaging for the user when the game is over (win or draw)

### Game API
1.   Research / Review query-ajax-post
1.   Create Game, start new game (curl then web app)
1.   Update Game, play the game (curl then web app)
1.   Get User Stats (curl then web page)
1.   Return to previous game (curl then web page)

### Final Touches
1.   Remove all logs to the console
2.   Troubleshoot/Debug
3.   README
3.   Style

### After Thought
  - Additionally I would like to:
1.   Create multi-player game from different devices
2.   Add a table-side chat to game
3.   Add AI element to game (one you can't beat!)
4.  Indicate with color(SCSS) the winning combination


##    Development
### Structure
##### HTML / Bootstrap
The [`./index.html`](./index.html)  is divided into a `navbar`, `main` and `footer
It is written with bootstrap, but styled in SCSS
##### SCSS
  - The [`./assets/styles/`](./assets/styles/) was designed such that a change in one place (for example colors) will allow changes everywhere else in the style. It is divided as follows
  - [`animations.scss`](./assets/styles/animations.scss) for `@keyframe`, `.winning` and any animation or moving on the page.  Use SCSS loop to create smooth transitions with animation
```scss
@keyframes spin {
  @for $i from 0 through 100 {
    #{$i * 1%} {
      transform: rotate(#{$i / 10}turn);
    }
  }
}
```
  - [`breakpoints.scss`](./assets/styles/breakpoints.scss) for `@breakpoint`,  Use `mixens` and standard bootstrap breakpoints to dynamically create boxes / tic-tac-toe squares
  - [`colors.scss`](./assets/styles/colors.scss) organize colors and make simple color rules.
  - [`dimensions.scss`](./assets/styles/dimensions.scss) Create dimensions standards for page
  - [`display.scss`](./assets/styles/display.scss) Display used for classes that hide or show content.
  - [`formatting.scss`](./assets/styles/formatting.scss)  Formatting is mostly automatically done in BootStrap, but the footer and .message are styled here
  - [`index.scss`](./assets/styles/index.scss) This file imports and correctly orderes all other files in this directory.  It has no rules on it’s own
  - [`tttboarders.scss`](./assets/styles/tttboarders.scss) or tic-tac-toe-boarders, is how the board is created.  Using a mixin I was able to easily format the borders so that they only show on correct side, and are consistent.
##### JavaScript

The [`./assets/scripts/`](./assets/scripts/) is generally (I’m only including what I edited or used) divided as follows:
*  [`config.js`](./assets/scripts/config.js) accesses the client side API created by [GA](https://generalassemb.ly/)
*  [`copyToClipBoard.js`](./assets/scripts/copyToClipBoard.js) is a single function as described
*  [`index.js`](./assets/scripts/index.js) is the access point for all functions.  Contains the different event listeners required in
*  [`store.js`](./assets/scripts/store.js)’s relevant data, authentication tokens, stored game, board and more
*  [`authentication/`](./assets/scripts/authentication/) contains all the account information, such as sign-in, sign-up, change-password and sign-out.  It is divided by:
  1.	[`api.js`](./assets/scripts/game/api.js) or application programming interface is where JS sends ajax requests to client server
  1. 	[`events.js`](./assets/scripts/game/events.js) is where event listeners are added.
  1.	[`ui.js`](./assets/scripts/game/ui.js) or user interface, is where the user is notified of success or failure of events.


*  [`game/`](./assets/scripts/game/)
  1.	[`api.js`](./assets/scripts/game/api.js) or application programming interface is where JS sends ajax requests to client server
  1. 	[`events.js`](./assets/scripts/game/events.js) is where event listeners are added.
  1.	[`ui.js`](./assets/scripts/game/ui.js) or user interface, is where the user is notified of success or failure of events.
  1.	[`aiMove.js/`](./assets/scripts/game/aiMove.js)  Is a large function that controls exactly how the ai plays. Implemented in events
  1.	[`logic.js/`](./assets/scripts/game/logic.js) contains the game logic, when and if a player may put a token in a particular place, and if they won / lost  / drew the game


*  [`multiplayer/`](./assets/scripts/multiplayer/) contains `ai/` and `events/` directories.  Eventually would like to combine into one `js` file and put in `game/`





### Process

  -   I tried to commit small and frequently and for the most part did so.

  -   Steps taken
	1.	Create basic Bootstrap layout
	1.	Create wire-frame
	1. 	Write user story
- 	Create tic-tac-toe board using SCSS
	1. 	Create authentication:
		1.	Sign-in
		1.	Sign-up
		1.	logout
		1.	change-password
	1. 	Create game logic.  Game logic is based off of the api, and assumption that the board is represented by an `Array` of length 9.
	1.	Create basic interface to actual bootstrap html (no link to server yet)
	1.	Create user interface, to mark according to
	1.	Create api that connects game with server
		1.  Create Game
		1.  Send move
		1.  Retrieve stats
		1.  Retrieve previous game
	1.	Update responsiveness of game (SCSS)
	1.	Create Multiplayer
		1.	Create game button, with ability to copy and paste game id
		1. 	Join game button, which has input which takes game id
	1.	Fix some visual aspects, with Bootstrap and SCSS / create new wireframe
	1.	Create AI
		1.  Lots and lots of testing!  Initially did not work as expected.
		1. Fix bugs accordingly
	1.	Attempt to create own copy of heroku api, in order to continue testing / refactoring multiplayer.
		1.	Create copy, and launch, but unable to connect
		1. 	After a couple hours of testing, revert back to original api
	1.	Refactor
		1.	Re-organize file structure
		1. 	Remove unnecessary code
	1.	Add some fun show win classes
	1.	Finish README.md


### Difficulties
1.   Creating the multiplayer section, spent much time trying to understand how the helper function worked.  Eventually successfully created, but initially made it without closing it ever.  This code error aided in slowly down and eventually stopping the server for some hours.
1.   to circular references through require.  Very frustrating bug, but once I understood the problem, refactored code so circular references where unnecessary.
1.   Once I added multiplayer, I had to refactor game logic so that stats would properly show who one or lost.  Originally it assumed player was always ‘x’


### Issues
1.   When the game visually shows the winner, it only shows one row.  If player won in two places, it is not indicated
1.   Organization of multiplayer could be better

### Features to Add
1.   Make more user friendly, play again button, option to play vs AI
1.   Create tableside chat as I had planned
1.   Create a countdown clock for multiplayer, and if there is a timeout by one player, make it their loss!
2.   Display player_o's user name on player join on x side

### Credit
I would like to thank:

-	[Sophia Derugen-Toomey](https://github.com/quidprocrow)  for helping with AI ideas, and my inspiration for my README.md file, and this Credit section!

-	[Kostant](https://github.com/Ko-stant) for dropdown inspiration.  He reminded me how sleek Bootstrap dropdowns look!

-	[Shuan](https://github.com/skinnybuff) for talking through AI concepts, and helping me review page.

- [Ted](https://github.com/TedCart) for inadvertently solving display player_o's user name porblem.

- 	[Rebecca](https://github.com/rcoras) & [Sarah](https://github.com/smb2255) for coding and climbing.  Parallel work is very motivating!  And Rebecca thank you for testing my code!  You found a strange and an awesome bug!

- 	[GA](https://generalassemb.ly/) staff for re-deploying gameplay APIU after crash! Also for creating API, and templateI used for the whole project.

-	[bookcasey](https://stackoverflow.com/users/1052923/bookcasey) for his answer about SASS/SCSS [percentage-loops](https://stackoverflow.com/questions/15994136/sass-or-less-keyframes-percentage-loop)

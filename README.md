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
1.   Check Board for Winner

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
3   Add AI element to game (one you can't beat!)
4.  Indicate with color(SCSS) the winning combination

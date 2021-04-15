# <img src="https://raw.githubusercontent.com/JadenBalogh/cosc360-project/master/client/src/assets/images/logo.svg" style="text-align:center; width:100%" width="100" height="100">

Postn is a discussion forum website. It allows registered users to participate in online discussions
in a similar format to Reddit. Unregistered users will be allowed to view the discussions but will be unable to comment
or create their own posts. Users can register, create discussions (image or text-based), and reply to posts/comments.

## Links
The _website_ is hosted at https://postn-dev.herokuapp.com/, check it out!<br>
The _site map_ can be found [here](https://github.com/JadenBalogh/cosc360-project/blob/master/site-map.pdf).
The _project report_ can be found [here](https://github.com/JadenBalogh/cosc360-project/blob/master/project-report.pdf).
The _criteria checklist_ can be found [here](https://github.com/JadenBalogh/cosc360-project/blob/master/criteria-checklist.pdf).

## Features Implemented
### Non-User:
- [x] View all discussion posts.
- [x] Search for discussions.
- [x] Create an account.
- [x] Can navigate to any part of the website regardless of the current page.
- [x] Sort feed by activity.
- [x] Advanced styling.
- [x] Collapsible threads.
- [x] Resolve user problems.
### User:
- [x] View all discussion posts.
- [x] Create their own posts (with images and text).
- [x] Comment on posts.
- [x] Reply to comments to create a thread.
- [x] Update their profile (username, email, password, profile picture).
- [x] Can navigate to any part of the website regardless of the current page.
- [x] Must maintain state between page navigation.
- [x] Search for discussions.
- [x] Simple login with email and password.
- [x] Password recovery if required.
- [x] Sort feed by activity.
- [x] Advanced styling.
- [x] Collapsible threads.
- [x] Resolve user problems.
### Admin:
- [x] Search for a user by name, email, or post.
- [x] Enable/disable users.
- [x] Edit/remove posts and comments.

## Tech/frameworks used
### Front end:
 - React
 - Tailwind CSS
 - Headless UI
 - Heroicons

### Back end:
 - Node.js
 - Express
 - Postgres
 - Sequelize

## API
### Account
#### GET
 - /accounts/profile - Authenticate the user and return their profile information
#### POST
 - /accounts/login - Login and authenticate the user with a JWT token
 - /accounts/signup - Create a new user and save their information to the database
 - /accounts/password-recovery - Find a user’s account information in the database and send them a password recovery email
 - /accounts/activate - Admin-only. Set the target user account as active
 - /accounts/deactivate - Admin-only. Set the target user account as inactive
#### PUT
 - /accounts/profile - Authenticate the user and update their profile information
### Posts and Comments
#### GET
 - /feed/get-feed - Return all posts with optional filtering by search text and ordering by date
 - /feed/get-post - Retrieve a post by id from the database and return its data
 - /feed/comments - Return all comments for a given post id
#### POST
 - /feed/publish-post - Authenticate the user and create a new post
 - /feed/add-comment - Authenticate the user and create a new comment on the given post
#### PUT
 - /feed/edit-post - Authenticate the user and update the given post
 - /feed/edit-comment - Authenticate the user and update the given comment
#### DELETE
 - /feed/delete-post - Authenticate the user and delete the given post
 - /feed/delete-comment - Authenticate the user and delete the given comment


## Tests
### Front end:
run `craco test` to run the test.
### Back end:
run `npm test` to run the test. There are 3 tests for major functionalities.
1. Accounts and Authentication
2. Posts
3. Comments

## How to Start?
### Front end:
run `craco start` to launch the front end
### Back end:
run `nodemon server.js` to launch the server

## Credits
#### Mathew de Vin
 - https://github.com/MtheDV
#### Jaden Balogh
 - https://github.com/JadenBalogh
#### Keyvan Khademi
 - https://github.com/keyvankhademi
#### Carson Ricca
 - https://github.com/carson-ricca

##
✨ Thanks for reading ✨

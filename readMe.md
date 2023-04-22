<h1 align="center"> Facebook Authentication using Node.js, Express, and Mongoose </h1>

<br/>
<br/>

<table>
<tr>
    <td>
      <h3 align="center">Before Login</h3>
    </td>
    <td>
      <h3 align="center">After Login</h3>
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://i.imgur.com/6mHbhs9.png" alt="Before Login">
    </td>
    <td>
      <img src="https://i.imgur.com/EOUYMOY.png" alt="After Login">
    </td>
  </tr>
  
</table>

<br/>

<h2>Overview</h2>
 
### This code implements a Facebook authentication system using Node.js, Express, Passport.js and Mongoose.

<br/>

<h2>Requirements</h2>

- Node.js
- npm or yarn
- MongoDB instance
- Facebook App credentials

<br/>

## Installation

### 1. Clone the repository and install the dependencies:

- git clone https://github.com/souravpl8092/QuestLabs-Assignment.git
- cd QuestLabs-Assignment
- npm install

<br/>

<h3> 2. Create a .env file in the root directory of the project and add the following variables: </h3>

- SESSION_SECRET = [ your session secret ]
- FACEBOOK_CLIENT_ID = [ your facebook app client ID ]
- FACEBOOK_SECRET_KEY = [ your facebook app secret key ]
- FACEBOOK_CALLBACK_URL = [ your facebook app callback URL ]
- mongoURL = [ your mongodb URL ]
- PORT = [ port number to run the server ]

<br/>
<br/>

<h3> 3. Start the server: </h3>

- npm start

<br/>

## Code Explanation

### config/db.js

- This file connects to the MongoDB server using the mongoose library.

<br/>

### models/User.model.js

- This file defines a User schema using the mongoose.Schema method.

<br/>

### routes/facebook-auth.js

- This file defines a facebook-auth router using the express.Router method and implements the Facebook authentication strategy using the passport-facebook library.

<br/>

### server.js

- This file initializes the Express application, sets up the session middleware, passport.js authentication, and defines the routes for the Facebook authentication.

<br/>

<h2 align="center">Thank You</h2>

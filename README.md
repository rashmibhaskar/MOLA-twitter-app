# MOLA-twitter-app
Description: The MOLA-twitter-app is created to search for twitter username and render top 10 tweets if the user exists by integrating the twitterAPI.
The backend is created using the node.js proxy server that makes calls to the twitterAPI.
The frontend is created using react.js(create-react-app template)

Here is the look of the Application:
CASEE 1: When User does not exist
![alt text](https://github.com/rashmibhaskar/MOLA-twitter-app/blob/master/App_Screenshots/User%20Does%20Not%20exist.png?raw=true)

To run Backend:
  1. cd node-server
  2. cd server/index.js -> replace 'YOUR BEARER TOKEN' on line 19 and save file.
  3. npm install
  4. npm start

To run Frontend:
  1. cd client
  2. npm install
  3. npm start

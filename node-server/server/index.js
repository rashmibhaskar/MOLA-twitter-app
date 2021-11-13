// server/index.js

const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const request = require("request");
const path = require("path");
const http = require("http");

const PORT = process.env.PORT || 3001;

const app = express();
const post = util.promisify(request.post);
const get = util.promisify(request.get);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const BEARER_TOKEN = `YOUr BEARER TOKEN`;


  
  const errorMessage = {
    title: "Please Wait",
    detail: "Waiting for new Tweets to be posted...",
  };
  
  const authMessage = {
    title: "Could not authenticate",
    details: [
      `Please make sure your bearer token is correct. 
        If using Glitch, remix this app and add it to the .env file`,
    ],
    type: "https://developer.twitter.com/en/docs/authentication",
  };

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.get("/api/twitter/:username", async (req, res) => {
    if (!BEARER_TOKEN) {
      res.status(400).send(authMessage);
    }
    const rulesURL = new URL(
        `https://api.twitter.com/2/users/by/username/${req.params.username}`
      );
    const token = BEARER_TOKEN;
    const requestConfig = {
      url: rulesURL,
      auth: {
        bearer: token,
      },
      json: true,
    };
    console.log("req=====",req.params);
    try {
      const response = await get(requestConfig);
  
      if (response.statusCode !== 200) {
        if (response.statusCode === 403) {
          res.status(403).send(response.body);
        } else {
          throw new Error(response.body.error.message);
        }
      }
  
      res.send(response);
    } catch (e) {
      res.send(e);
    }
  });

  app.get("/api/tweets/:userID", async (req, res) => {
    if (!BEARER_TOKEN) {
      res.status(400).send(authMessage);
    }
    
    const tweetURL=new URL(`https://api.twitter.com/2/users/${req.params.userID}/tweets`);
    const token = BEARER_TOKEN;
    const requestConfig = {
      url: tweetURL,
      auth: {
        bearer: token,
      },
      json: true,
    };
  
    try {
      const response = await get(requestConfig);
  
      if (response.statusCode !== 200) {
        if (response.statusCode === 403) {
          res.status(403).send(response.body);
        } else {
          throw new Error(response.body.error.message);
        }
      }
  
      res.send(response);
    } catch (e) {
      res.send(e);
    }
  });


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
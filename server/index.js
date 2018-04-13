const request = require("request");
const level = require("level");
const express = require("express");
const cors = require('cors');
const path = require('path');
const db = level("cache.db");
const app = express();

// Port number
const PORT = process.env.PORT || 4000;

app.use(cors());

// Priority serve any static files
app.use(express.static(path.join(__dirname, '/../frontend/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const API_ENDPOINT = "https://api-v3.mojepanstwo.pl/dane/poslowie.json?conditions[poslowie.kadencja]=8";

function getPage(url, callback) {
  console.log("downloading: " + url);
  
  db.get(url, function (error, caschedBody) {
    if (error) {
      request(url, function(error, response) {
        if (error) {
          callback(error, null);
          return;
        }

        db.put(url, response.body, function(error) {
          if (error) {
            callback(error, null);
            return;
          }

          const data = JSON.parse(response.body);
          callback(null, data);
        });
      });
    } else {
      const data = JSON.parse(caschedBody);
      callback(null, data);
    }
  }); 
}

function getAllPages(startURL, allData, callback) {
  getPage(startURL, function(error, data) {
    if (error) {
      callback(error, null);
      return;
    }

    allData = allData.concat(data.Dataobject);

    if (data.Links.next) {
      getAllPages(data.Links.next, allData, callback);
    } else {
      callback(null, allData);
    }
  });
}

app.get("/api/poslowie", function(req, res) {
  getAllPages(API_ENDPOINT, [], function (error, data) {
    if (error) {
      res.status(500);
      return;
    }
    
    res.send(data);
  });
});

app.listen(PORT);
console.log("HTTP server runs on http://localhost:4000");
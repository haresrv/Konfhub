# This repo contains API for Konfhub conferences made using NodeJS serving static HTML

* All Events are listed in human-readable form 
![Screenshot](https://github.com/haresrv/Konfhub/blob/master/Screenshots/ScreenShots2.png)

* Exact and Semantic Duplicates are removed
![Screenshot](https://github.com/haresrv/Konfhub/blob/master/Screenshots/ScreenShots.png)



API Endpoint - https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences

Method used to identify duplicates-->

* First events are sorted based on dates
* Event Names are checked for common subsequences
* Check if crow flies distance b/w venues of events with same names on the same date is, less than 10km of each other.

How to reproduce screenshots:
* Clone the repo
* Run "npm install"
* Run "nodemon KonfHub.js"
* Headover to "http://localhost:3000/request"


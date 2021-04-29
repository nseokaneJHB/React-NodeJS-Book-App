# **Components**

*You will find a Full Stack Book App built with NodeJS && Express and ReactJS which you can checkout out anytime*

#

## **Prerequisites**

- **MongoDB**
    - `MongoDB Compass`
	- `MongoDB shell version v4.4`

- **Node & NPM**
	- `NodeJS v14.16.0`
	- `npm 7.6.3`

> *NB: If you have not installed `MongoDB` on your machine please visit the [MongoDB Official Site](https://docs.mongodb.com/manual/installation/), download and set it up*

> *NB: If you have not installed `MongoDB Compass` on your machine please visit the [MongoDB Official Site](https://docs.mongodb.com/compass/current/install/), download the latest stable and set it up*

> *NB: If you have not installed `NodeJS` on your machine please visit the [NodeJS Official Site](https://nodejs.org/en/), download and set it up*

#

## ***Project Setup***

1. **_Clone this project to your desired directory._**
2. **_Install [NodeJS](https://nodejs.org/en/), [MongoDB](https://docs.mongodb.com/manual/installation/) and  [MongoDB Compass](https://docs.mongodb.com/compass/current/install/)_**
3. **_Open MongoDB Compass and create a database named `FULL-STACK-DATABASE`, create a collection inside it and name it `books`_**
	- > NB: Please make sure to change the port number under `app.listen()` on the mongodb.js file to your port number of MongoDB Compass
4. **_Open another terminal and navigate to --> cloned project directory --> Backend directory, then run the following command:_**
	- **_`npm install`_**
5. **_Open another terminal and navigate to --> cloned project directory --> Frontend directory, then run the following command:_**
	- **_`npm install`_**

#

## ***Running the project***
> NB: Change the port numbers to your respective ports
6. ***On your backend terminal run:***
   - **_`nodemon mongodb.js`_**
7. ***Go to the browser and enter `http://localhost:5000/api/books` on the address bar to run the Backend App***
8. ***On your Frontend terminal run:***
   - **_`npm start`_**
9. ***Go to the browser and enter `http://localhost:3000/` on the address bar to run the Frontend App***

#

## **Login and Register Component**

#

***`Nolan Seokane Ⓒ Copyright 2021`***
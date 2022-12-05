# Starship[Work In Progress]
<img width="599" alt="Screen Shot 2022-10-12 at 3 24 38 PM" src="https://user-images.githubusercontent.com/106919616/195460871-306b09ba-6f77-40a6-91bf-6ed39f22dc10.png">

## Description
Starship provides users the platform to track stock market data. Users are able to track 

But that's not all! 

Users can also make connections by users they follow and users who follow them. 

 Giglr is an application made for posting the most amazing memes to a close community of developers. The application is very interactive and secure and offers an amazing user interface as well as experience that will have users hooked and wanting to come back for more. The application is built with various technologies which can be found in the  section. This project utilizes RESTful API and authentication. It follows the concepts of Object-Oriented Programming, Object-Relational Mapping and Model-View-Controllers

 [Technologies Used](#technologies-used)

## User Story
As a developer looking to share hilarious and sometimes outright stupid memes...
I WANT a secure application with a friendly user interface...
SO THAT I can post my feelings and thoughts using memes(uploaded or using weblinks), be able to vote and make comments on my post and the post of others.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Technologies Used](#technologies-used)
* [License](#license)
* [Contributors](#contributors)

## Installation
Run the following line of code in your terminal to install all the needed packages: 
```
npm i
```

Once all the packages have been installed, return to the terminal and run the following code on the command line : 
```
node server.js
```
This will run the server where you can find the page on localhost:3007. To end your server in your terminal type: control + c.
As this application uses MYSQL to store data to the database, you will need to load the database.
Type the following line to the command line and enter your MYSQL password:
```
mysql -u root -p
```
Once this step is done, proceed to load the database using the following command:
```
USE giglr_db
```
The next step will be to load the database using the following command:
```
source db/schema.sql
```

## Usage
This application is fully functional and can be [viewed here!](https://giglr.herokuapp.com/). Giglr is hosted by Heroku, therefore we advise that users give the page a moment to load. Once loaded users will be brought to the home page. In order to view and make post the user will need to sign-up or login using the link in the upper right hand corner of the webpage. Once logged in the user will be able to make uploads using the upload link and be able to view their own uploads from the dashboard link. The user will also be able to view their posts from the homepage as well as the posts of other users and will also be able to vote and comment on posts. 

## Technologies Used:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Node Packages Used ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
- Sequelize - Sequelize is an easy-to-use promise-based Node.js ORM tool for various database programs. For the sake of this project MySQL was used.

- Cloudinary - The Cloudinary Node SDK allows you to quickly and easily integrate your application with Cloudinary and Effortlessly optimize, transform, upload and manage your cloud's assets. For this project, cloudinary was added to our frontend to allow for easy uploads to our application from the dashboard.

- Mysql2  - For better performance 

- Bcrypt - For the security of user authentication and app integrity the NPM was used to hash user passwords.

- Connect-session-sequelize - This NPM was used to store user sessions and Session records are automatically expired and removed from the database on an interval.

- Dotenv - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

- Express - The express NPM is used for performing robust routing. This package is required for starting the server.

- Express-handlebars - This package acts a view engine which allows for the applications code to be separated to create templates which will be used on the frontend. This package helps to complete the view portion of the MVC concept.

- Express-session - Create a session middleware with the given options. The Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.



## License
![Unlicensed](https://img.shields.io/badge/license-Unlicense-blue.svg)

## URLs
1) GitHub Repository Link: https://github.com/KeeveRW11/giglr
2) Heroku Application Link: https://giglr.herokuapp.com/

## Contributors
- [Keeve Whyte](https://github.com/KeeveRW11)
- [Shantanu Mazumder](https://github.com/ShawnMaz)
- [Bryan Dumpit](https://github.com/Bryandumpit)
- [Mahesh Ramdas](https://github.com/maheshramdas)
- [Damon Paoletti](https://github.com/DamonPaoletti)

## Screenshots
![image (2)](https://user-images.githubusercontent.com/109004012/195243172-19a5955e-1483-41e3-a701-42530c927e90.png)
![image (1)](https://user-images.githubusercontent.com/109004012/195243174-5cc0ca7e-83b4-4e20-aab2-d2de6b797879.png)
![image](https://user-images.githubusercontent.com/109004012/195243169-d6c7a4a2-45a5-42ee-a67d-5e2523631574.png)



 ![image](http://imgs.xkcd.com/comics/frequency/heartbeat.gif)

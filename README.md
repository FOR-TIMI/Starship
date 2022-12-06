
<p align="center">
  <img src="https://github.com/FOR-TIMI/Starship/blob/main/client/public/assets/logo.svg?raw=true" width="250px" height="150px"/>
  <p align="center">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white"/>
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white"/>
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
</p>
</p>
<br/>



<br/>


## Description
`StarShip` provides users the platform to track stock market data. Users are able to track the market in general or they can search up a specific stock. After searching for a specific stock and checking it's performance through different analyses tools and visualizations (e.g. Fear & Greed Index, Zoomable Time Series, News etc.), the user can decide whether to add the stock in a basket where they can track a shortlist of stocks they were interested in. 

But that's not all! 

Users can also make connections by users they follow and users who follow them. The users can then check each other's baskets either through:
 * The Socials page where they can see who they are following or who are following them. They can then click the link to a specific users baskets page.
 * The Tavern page where users can post their baskets or just their thoughts in general, like other users posts, comment on them, and even follow other users.

Try it for yourself and visit the website here!
[StarShip](insert URL here)

## Support the project ⭐
If you feel awesome and want to support us in a small way, please consider checking out our other projects, starring and sharing this repo! This helps us getting known and grow the community. 🙏
 
 ![image](https://raw.githubusercontent.com/lusaxweb/vuesax/master/public/github-vuesax-star.gif)

## User Story
### AS A USER:
* I am looking for a secure market overview dashboard with a social feature...

### SO THAT:
* I can see how the market is doing in general and also select specific stocks to track...
* I would also like to be able to share how my stocks are performing to other users...

## Table of Contents
* [Local Installation](#local-installation)
* [Usage](#usage)
* [Technologies Used](#technologies-used)
* [License](#license)
* [Contributors](#contributors)

## Local Installation
* `Clone` the code into your machine and open in your code editor (e.g. VS Code).

* Go to the `root` directory for the app.

* Run `npm i` in your terminal to install all the needed packages

* After all packages have been installed, run `npm run seed` to seed the local database.

* Run `npm run develop` to start the server and build the website.

## Usage
#### Landing Page
* Upon loading the website, you are led into the landing page.
  - If you are not logged in, there will be a `Login` button.
  - A `search bar` at the top of the page.
  - Market Overview for SPY stock (SPDR S&P 500 ETF Trust) and related SPY news.
#### Login/Sign-Up:
 * On the landing page, press on the `login` button. 
 * If you have an account, input your `email` and `password`.
 * If you do not have an account, click on the `sign-up link` and set your `username`, `email` and `password`.

#### Tickers and Basekts:
 * There is a `search bar` located at the top of the page. Click on the `search bar` and input a stock symbol (e.g. AAPL for Apple Inc, GOOG for Alphabet Inc Class C etc.)
 * Click on `Search` button. This will lead you to the market summary page of the stock (e.g. Fear and Greed Index, Current Open Price, Zoomable Time Series etc.)
 * After going through the summary you can add the stock/ticker to a `basket`. Click on `Add To Basket`.
 * You have an option to add the ticker to an existing basket or you can create a new basket by clicking `Create New Basket`.
 * You can see all your `baskets` by clicking on `Product` on the side navigation bar.
 * You can click on each `basket` to see a summary of the performance of all the `tickers` added to the basket.

 #### Socials: Followers
 * The `Socials` page provides a list of either the users are currently following (`Following`) or users who are following you (`Followers`).
 * You can access the either the `Following` or `Follower` list by click the `toggle button` at the top.
 * The list provides the `avatar, username, link to the user's baskets page` and either an `Unfollow` button under the Following list or a `Follow` button under the Followers list.
 
 #### Tavern
 * The `Tavern` pages provides posts from other users signed up on the website. Their posts contain either a `text, a basket of tickers, or both`.
 * The user can click on each post and go to the `basket's page`.
 * From the tavern, the `user can also follow other users`, which are then added to their Following list under the `Socials` page.

 #### Premium
 * Users can pay a `premium` to have their account `verified`. A verified user will have a `blue ribbon` beside their name.

 #### Edit Profile
 * Users can `edit their avatar` by clicking on their avatar on the top left of the page.
 * This button is a drop down menu. If the user clicks on `Profile`, they are taken to a page where they can pick a new avatar.
 * The other buttons are `Home`, which brings the user back to the `landing page`, and `Logout`, which `logs the user out`.


## Technologies Used:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)



## APIs Used
* [Alpaca API](https://www.npmjs.com/package/@alpacahq/alpaca-trade-api)
* [jwt-decode](https://www.npmjs.com/package/jwt-decode)
* [Material UI](https://mui.com/)



## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## URLs
1) GitHub Repository Link: https://github.com/FOR-TIMI/Starship
2) Heroku Application Link: 

## Contributors
- [Femi Ladiran Erifeoluwa](https://github.com/FOR-TIMI)
- [Bawandeep Singh](https://github.com/singhbawan)
- [Jatin Saini](https://github.com/jatin1211)
- [Jacob Adelman](https://github.com/jakeadelman)
- [Adam Gaboury](https://github.com/AdamGabo)
- [Bryan Dumpit](https://github.com/Bryandumpit)

## Screenshots
![image](https://via.placeholder.com/500x300)
![image](https://via.placeholder.com/500x300)
![image](https://via.placeholder.com/500x300)



 ![image](http://imgs.xkcd.com/comics/frequency/heartbeat.gif)

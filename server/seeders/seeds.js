const faker = require('faker')
const db = require('../config/connection');
const { User,Post, Basket } = require('../model');

db.once('open', async () => {

  
  // Delete all current users
  await User.deleteMany({});

  console.log('\n ----- Deleted all current Users ----- \n ');
  
  //Delete all current posts
  await Post.deleteMany({});

  console.log('\n ----- Deleted all current Posts ----- \n ');
  
  //Delete all current posts
  await Basket.deleteMany({});

  console.log('\n ----- Deleted all current Baskets ----- \n ');


  // create user data
  const userData = [];
 
  // add 50 random users to userData array
  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }
 
  // FOllowers are people following me. When they follow me, i add their user id into my follower array
  // Following are people i follow.
  
  const createdUsers = await User.collection.insertMany(userData);
  
  console.log('\n ----- Added Users ----- \n ');

  // create followers and following
  for(let i=0; i < 30; i++){

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const {  _id: userId  } = createdUsers.ops[randomUserIndex];
 
    //Get random people to follow
    const randomFollowingIndex = Math.floor(Math.random() * createdUsers.ops.length);
    
    
    let followingId = createdUsers.ops[randomFollowingIndex]
    let followerId = userId
 

    while(followerId === userId){
      const randomFollowerIndex = Math.floor(Math.random() * createdUsers.ops.length);
      followerId = createdUsers.ops[randomFollowerIndex]
    }

    await User.updateOne({ _id: userId }, { $addToSet: { followers: followerId, followings : followingId  } });
  }
  
  console.log('\n ----- Added Followers and following ----- \n');


  

  // create Posts
  let createdPosts = [];

  for(let i=0; i < 20; i++){

    /**
     * Make random 10 character titles for posts
     */
    const title = faker.lorem.words(Math.round(Math.random() * 10) + 1);
  
    /**
     * get a random user from the createdUser array
     */
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId} = createdUsers.ops[randomUserIndex];
  

    /**
     * create a post
     */
    const createdPost = await Post.create({ title, username, userId });
   
    /**
     * Add post id to the posts field in the user's data
     */
    await User.updateOne(
       {_id: userId},
       {$push: { posts: createdPost._id}}
    )
    /**
     * Add to the list of created posts
     */
    createdPosts.push(createdPost);
  }

  console.log('\n ----- Added Posts ----- \n');


//Create Comments

  for(let i=0; i <10; i++){
    /**
     * Make random comment texts
     */
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    
      
    /**
     * get a random user from the createdUser array
     */
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

      
    /**
     * get a random post from the createdPost array
     */
    const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
    const { _id : postId } = createdPosts[randomPostIndex];
  
    /**
     * add comments to a Post
     */
    await Post.updateOne(
      { _id: postId },
      { $push: { comments: { commentText,username }}},
      { runValidators: true }
    )
  }

 

console.log('\n ----- Added Comments ----- \n');



/**
 *  Add Likes
 * */ 

  for(let i=0; i < 10; i++){

    /**
     * get a user from the createdUser array
     */
    const { username } = createdUsers.ops[i];
   

    /**
     * get a random post from the createdPost array
    */
    const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
    const { _id : postId } = createdPosts[randomPostIndex];
    
    /**
     * Add unique like to a post
     */
    await Post.updateOne(
      { _id: postId },
      { $addToSet : { likes : { username }}},
      { runValidators: true }
    )
  }

 console.log('\n ----- Added likes ----- \n');

 
 //Create baskets

let createdBaskets = [];

   for(let i=0; i < 10; i++){

     /**
      * get a random user from the createdUser array
      */
     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
     const { username, _id: userId} = createdUsers.ops[randomUserIndex];
   
 
    /**
     * create one basket
    */
     const createdBasket = await Basket.create({ username });
    
     /**
      * Add post id to the posts field in the user's data
      */
     await User.updateOne(
        {_id: userId},
        {$push: { baskets: createdBasket._id}}
     )
     /**
      * Add to the list of created baskets
      */
     createdBaskets.push(createdBasket);
   }
 
 console.log('\n ----- Added Baskets ----- \n');

   /**
    * Add Tickers to baskets
    */
  const tickerData = [
      {
      symbol: "NKN-USDT",
      market: "crypto",
      API: "kucoin"

      },
      {
      symbol: "LOOM-BTC",
      market: "crypto",
      API: "kucoin"
      },
      {
      symbol: "JUP-ETH",
      market: "crypto",
      API: "kucoin"
  
      },
      {
      symbol: "GEM-USDT",
      market: "crypto",
      API: "kucoin"
      },

]

for(let i=0; i <10; i++){
  /**
   * Make random tickers from ticker data array
   */
  const randomTickerIndex = Math.floor(Math.random() * tickerData.length);
  const { symbol, market, API } = tickerData[randomTickerIndex] 
  
    
  /**
   * get a random Basket from the createdBasket array
   */
  const randomBasketIndex = Math.floor(Math.random() * createdBaskets.length);
  const { _id : basketId } = createdBaskets[randomBasketIndex];


  /**
   * add ticker to a Basket
   */
  await Basket.updateOne(
    { _id: basketId },
    { $push: { tickers : { symbol, market, API }}},
    { runValidators: true }
  )
}

 console.log(`-----Added ticker data ----`)




 console.log('all done!');

  process.exit(0);
});

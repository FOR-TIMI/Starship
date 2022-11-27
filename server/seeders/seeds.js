const faker = require('faker')
const db = require('../config/connection');
const { User,Post } = require('../model');

db.once('open', async () => {
  
  // Delete all current users
  await User.deleteMany({});

  console.log('\n ----- Deleted all current Users ----- \n ');
  
  //Delete all current posts
  await Post.deleteMany({});

  console.log('\n ----- Deleted all current Posts ----- \n ');

  // create user data
  const userData = [];
 
  // add 50 random users to userData array
  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  
  const createdUsers = await User.collection.insertMany(userData);
  
  console.log('\n ----- Added Users ----- \n ');

  // create friends
  for (let i = 0; i < 20; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }
  
  console.log('\n ----- Added Friends ----- \n');

  // create Posts

  let createdPosts = [];

  for(let i=0; i < 10; i++){

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
    const createdPost = await Post.create({ title, username });
   
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

// add Likes

  for(let i=0; i < createdUsers.ops.length; i++){

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
     * Add like to a post
     */
    await Post.updateOne(
      { _id: postId },
      { $push: { likes : { username }}},
      { runValidators: true }
    )
  }

 console.log('\n ----- Added likes ----- \n');




 console.log('all done!');

  process.exit(0);
});

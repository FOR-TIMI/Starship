const faker = require('faker')
const db = require('../config/connection');
const { User } = require('../model');

db.once('open', async () => {
  
  // Delete all current users
  await User.deleteMany({});

  // create user data
  const userData = [];
 
  // add 50 random users to userData array
  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  
  const createdUsers = await User.collection.insertMany(userData);
  
  console.log('\n ----- Added Users ----- \n ');

  // create friends
  for (let i = 0; i < 100; i += 1) {
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

 


 



  process.exit(0);
});

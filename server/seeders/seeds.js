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
 

   await User.collection.insertMany(userData);
   console.log('----- Added Users -----');


  process.exit(0);
});

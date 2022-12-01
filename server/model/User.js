const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    baskets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Basket",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    followings: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      }
    ],
    avatarUrl: {
      type: String,
      default: 'avatar_default.jpg'
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  //Check if it's a new user or a current user updating their password
  if (this.isNew || this.isModified("password")) {
    try {
      const SALT_FACTOR = 10;
      const salt = await bcrypt.genSalt(SALT_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//Number of followers the user has
userSchema
  .virtual('followerCount')
  .get( function() {
  return this.followers.length;
  });

// Number of people the user id currently following
userSchema
  .virtual('followingCount')
  .get( function() {
  return this.followings.length;
  });

const User = model("User", userSchema);

module.exports = User;

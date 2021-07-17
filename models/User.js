const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
      userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      email: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      // prevents virtuals from creating duplicate of _id as `id`
      id: false
    }
  );

  UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
      (total, friend) => total + friend.length + 1,
      0
    );
  });

  const User = model('User', UserSchema);

module.exports = User;
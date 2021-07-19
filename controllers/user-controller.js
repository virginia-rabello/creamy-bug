const { Thought } = require('../models');
const User = require('../models/User');

const userController = {
    getAllUser(req, res) {
        User.find({})
          .populate({
            path: 'thougths',
            select: '-__v'
          })
          .populate({
              path: 'friends',
              select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },
    
      // get one User by id
      getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thougths',
            select: '-__v'
          })
          .populate({
              path: 'friends',
              select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },
    
      // createUser
      createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },
    
      // update User by id
      updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
    
      // delete User
      deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },
      // add Thought to User
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
          { _id: params.id},
          { $push: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
      .then(dbUserData => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  removeFriend({ params }, res) {
        return User.findOneAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.friendId } },
          { new: true }
        )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }
}

module.exports = userController;
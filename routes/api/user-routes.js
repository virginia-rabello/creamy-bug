const router = require('express').Router();

const {
    addFriend,
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    removeFriend
  } = require('../../controllers/user-controller');
  
  // /api/Users
  router
    .route('/')
    .get(getAllUser)
    .post(createUser);
  
  // /api/Users/:id
  router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

  // /api/users/:id/friends/:friendId  
  router.route('/:id/friends/:friendId').put(addFriend);

  router.route('/:id/friendsRemove/:friendId').put(removeFriend);

module.exports = router;
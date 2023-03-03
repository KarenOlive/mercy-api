const express = require('express');
const router = express.Router();

const {getAllUsers, userSignup, userLogin, show_decoded_token_data} = require('../controllers/UserController');
const checkAuth = require('../../helpers/auth');

//show decoded data from the token
router.get('/auth', checkAuth, show_decoded_token_data);

router.get("/", getAllUsers);
router.post("/signup", userSignup);
router.post("/auth/login", userLogin);

//router.get("/:userId", getOneUser);

//router.post("/", createNewUser);

//router.patch("/v1/users/:userId", updateOneUser);

//router.delete("/v1/users/:userId", deleteOneUser);

module.exports = router;

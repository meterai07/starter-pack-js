const express = require("express");
const userHandler = require('../handlers/user_handler');
const roleHandler = require('../handlers/role_handler');
const orderHandler = require('../handlers/order_handler');
const jwtAuth = require('../middlewares/jwt');
const { authenticatePassportJwt } = require('../middlewares/passport-jwt');

// Create a router
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// User routes
router.post("/user/login", userHandler.login);
router.post("/user/register", userHandler.register);
router.get("/user", userHandler.getList);
router.get("/user/:id", userHandler.getOneByUserId);
router.put("/user/:id", userHandler.updateOne);
router.delete("/user/:id", userHandler.deleteOne);

// Role routes
router.post("/role", roleHandler.create);
router.get("/role", roleHandler.getList);
router.get("/role/:id", roleHandler.getOneByRoleId);
router.put("/role/:id", roleHandler.updateOneByRoleId);
router.delete("/role/:id", roleHandler.deleteOneByRoleId);

// Order routes
router.post("/order", jwtAuth, orderHandler.create);
router.get("/order", authenticatePassportJwt(), orderHandler.getList);
router.get("/order/:id", authenticatePassportJwt(), orderHandler.getOneByOrderId);
router.put("/order/:id", authenticatePassportJwt(), orderHandler.updateOneByOrderId);
router.delete("/order/:id", authenticatePassportJwt(), orderHandler.deleteOneByOrderId);

module.exports = router;
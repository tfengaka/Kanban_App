const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/boards", require("./board"));
router.use("/boards/:boardID/sections", require("./section"));
router.use("/boards/:boardID/tasks", require("./task"));

module.exports = router;

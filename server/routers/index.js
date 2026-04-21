const router = require("express").Router();
const authRouter = require("./authRouter");
const buildRouter = require("./buildRouter");

router.get("/", (req, res) => {
  res.send("Welcome to Skirk Portal API");
});

router.use("/auth", authRouter);

const authentication = require("../middlewares/authentication");
router.use(authentication);

router.use("/builds", buildRouter);

module.exports = router;

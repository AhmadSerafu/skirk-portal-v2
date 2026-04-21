const router = require("express").Router();
const characterRouter = require("./characterRouter");
const authRouter = require("./authRouter");
const buildRouter = require("./buildRouter");
const aiRouter = require("./aiRouter");

router.get("/", (req, res) => {
  res.send("Welcome to Skirk Portal API");
});

router.use("/characters", characterRouter);
router.use("/auth", authRouter);

const authentication = require("../middlewares/authentication");
router.use(authentication);

router.use("/builds", buildRouter);
router.use("/ai", aiRouter);

module.exports = router;

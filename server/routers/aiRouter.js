const router = require("express").Router();
const AiController = require("../controllers/AiController");

router.post("/analyze", AiController.analyze);

module.exports = router;

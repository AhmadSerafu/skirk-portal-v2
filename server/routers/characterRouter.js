const router = require("express").Router();
const CharacterController = require("../controllers/CharacterController");

router.get("/", CharacterController.getCharacters);
router.get("/:id", CharacterController.getCharacterById);

module.exports = router;

const router = require("express").Router();
const authorization = require("../middlewares/authorization");
const BuildController = require("../controllers/BuildController");

router.get("/", BuildController.getBuilds);
router.post("/", BuildController.createBuild);

router.get("/:id", authorization, BuildController.getBuildById);
router.put("/:id", authorization, BuildController.updateBuild);
router.delete("/:id", authorization, BuildController.deleteBuild);

module.exports = router;

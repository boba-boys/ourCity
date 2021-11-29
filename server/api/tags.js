const router = require("express").Router();
const Tag = require("../db/models/Tag");
const Sequelize = require("sequelize");
// const Op = Sequelize.Op;

// /api/tags
router.get("/", async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.send(tags);
  } catch (err) {
    next(err);
  }
});

// /api/tags/:groupId
router.get("/:groupId", async (req, res, next) => {
  try {
    const tag = await Tag.findAll({
      where: {
        groupId: req.params.groupId,
      },
    });
    console.log("made it to backend", tag);
    res.send(tag);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

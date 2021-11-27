const router = require("express").Router();
const Tag = require("../db/models/Tag");
const Sequelize = require("sequelize");
// const Op = Sequelize.Op;

router.get("/", async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.send(tags);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const tag = await Tag.findAll({
      where: {
        groupId: req.params.id,
      },
    });
    console.log("made it to backend", tag);
    res.send(tag);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

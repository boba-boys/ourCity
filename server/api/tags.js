const router = require("express").Router();
const Tag = require("../db/models/Tag");
const Sequelize = require("sequelize");
const Comment = require("../db/models/Comment");
const Group = require("../db/models/Group");
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
    const tags = await Tag.findAll({
      include: [{ model: Comment, where: { groupId: req.params.groupId } }],
    });
    res.send(tags);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

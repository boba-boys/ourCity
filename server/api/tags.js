const router = require("express").Router();
const Tag = require("../db/models/Tag");
const Comment = require("../db/models/Comment");
const Group = require("../db/models/Group");

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
      include: [{
        model: Comment,
        where: {
          groupId: req.params.groupId,
        },
      }],
    });
    // console.log("Tags of a group:", tags);
    res.send(tags);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

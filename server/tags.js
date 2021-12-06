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
    res.send(tags);
  } catch (err) {
    next(err);
  }
});

// /api/tags/details/:tagId
router.get("/details/:tagId", async (req, res, next) => {
  try {
    const singleTag = await Tag.findOne({
      where: {
        id: req.params.tagId,
      },
    });
    res.send(singleTag);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

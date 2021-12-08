const router = require("express").Router();
const Tag = require("../db/models/Tag");
const Comment = require("../db/models/Comment");
const Group = require("../db/models/Group");
const User = require("../db/models/User");

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
      include: [
        {
          model: Comment,
          where: {
            groupId: req.params.groupId,
          },
        },
      ],
    });
    res.send(tags);
  } catch (err) {
    next(err);
  }
});

router.post("/comments/:tagId/:groupId", async (req, res, next) => {
  try {
    const description = req.body.description;
    const tagId = req.params.tagId;
    const groupId = req.params.groupId;
    const userId = req.body.userId;
    const comment = await Comment.create({
      description,
      tagId,
      groupId,
      userId,
    });
    res.send(comment);
  } catch (err) {
    next(err);
  }
});

//Get all comments for a tag
// /api/tags/comments/:tagId groupId is in
router.get("/comments/:tagId/:groupId", async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const comments = await Comment.findAll({
      where: {
        tagId: req.params.tagId,
        groupId: groupId,
      },
      include: [{ model: User }],
    });
    res.send(comments);
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

const router = require("express").Router();
const Tag = require("../db/models/Tag");
const Comment = require("../db/models/Comment");
const User = require("../db/models/User");

// /api/users/:groupId
router.get("/:groupId", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Comment,
          where: {
            groupId: req.params.groupId,
          },
        },
      ],
    });

    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.delete("/comment/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });

    await comment.destroy();

    res.send(comment);
  } catch (err) {
    next(err);
  }
});

// /api/users/:groupId/userId
// groupId and userId in params
router.delete("/:groupId/:userId", async (req, res, next) => {
  try {
    const { groupId, userId } = req.params;
    //console.log("userId: ", userId, "| groupId: ", groupId);
    const comments = await Comment.findAll({
      where: {
        groupId: groupId,
        userId: userId,
      },
    });
    console.log(comments);
    await comments.map(
      async (comment) => await comment.update({ userId: null })
    );
    res.send(comments);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

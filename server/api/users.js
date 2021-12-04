const router = require("express").Router();
const Tag = require("../db/models/Tag");
const Comment = require("../db/models/Comment");
const User = require("../db/models/User");

// /api/users/:groupId
router.get("/:groupId", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Comment,
        where: {
          groupId: req.params.groupId,
        },
      }],
    });
    // console.log("Tags of a group:", users);
    res.send(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

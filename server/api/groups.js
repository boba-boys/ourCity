const router = require("express").Router();
const Tag = require("../db/models/Tag");
const Comment = require("../db/models/Comment");
const Group = require("../db/models/Group");
const User = require("../db/models/User")

// /api/groups/:userId
//we're trying to get ALL groups for a particular userId
//search comments for user id and off the comments you'll get those groups
router.get('/:userId', async (req, res, next) => {
  try {
    const comments = await Group.findAll({
      include: [{
        model: Comment,
        where: {
          userId: req.params.userId,
        },
      }]
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
})

module.exports = router;

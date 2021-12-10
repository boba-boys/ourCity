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

    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({where:{email: req.body.email}})
    res.send(user)
  } catch (error) {
    next(error)

  }

})

module.exports = router;
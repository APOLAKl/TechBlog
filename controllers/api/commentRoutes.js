const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET ALL --> /api/comment/
router.get("/", (req, res) => {
  Comment.findAll().then((results) => {
    res.json(results);
  });
});

// Create (POST comment)
router.post("/", withAuth, (req, res) => {
  Comment.create({
    ...req.body,
    user_id: req.session.user_id,
  }).then((results) => {
    res.json(results);
  });
});

// Destroy (DELETE comment)
router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  }).then((results) => {
    res.json(results);
  });
});

module.exports = router;

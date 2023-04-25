const router = require('express').Router();
const { Blog } = require("../../models")

// GET ALL --> /api/blogs/
router.get("/", (req, res) => {
  Blog.findAll()
  .then(results => {
    res.json(results)
  })
})

// GEt by ID
router.get("/:id", (req, res) => {
  Blog.findByPk(req.params.id)
  .then(results => {
    res.json(results)
  })
})

// Create (POST)
router.post("/", (req, res) => {
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  })
  .then(results => {
    res.json(results)
  })
})

// Update (PUT)
router.put("/:id", (req, res) => {
  Blog.update(
    {
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(results => {
    res.json(results)
  })
})

// Destroy (DELETE)
router.delete("/:id", (req, res) => {
  Blog.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(results => {
    res.json(results)
  })
})

module.exports = router;
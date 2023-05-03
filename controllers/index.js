const router = require("express").Router();

const { Blog, User, Comment } = require("../models");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/new-post", (req, res) => {
  res.render("new-post");
});

router.get("/blog/:blog_id", (req, res) => {
  Blog.findByPk(req.params.blog_id, {
    include: [
      { model: User },
      {
        model: Comment,
        include: User,
      },
    ],
  }).then((result) => {
    const data = result.get({ plain: true });
    console.log(data);
    res.render("single-post", {
      blog: data,
    });
  });
});

// render homepage
router.get("/", (req, res) => {
  Blog.findAll({
    include: User,
  }).then((results) => {
    console.log(results);
    const data = results.map((result) => result.get({ plain: true }));
    console.log(data);
    res.render("homepage", {
      blogs: data,
      logged_in: req.session.logged_in,
    });
  });
});

module.exports = router;

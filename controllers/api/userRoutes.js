const router = require('express').Router();
const { User } = require("../../models")

// GET ALL --> /api/users/
router.get("/", (req, res) => {
  User.findAll()
  .then(results => {
    res.json(results)
  })
})


// GEt by ID
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
  .then(results => {
    res.json(results)
  })
})

// Create (POST) -> SIGNUP
router.post("/", (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then(results => {

    req.session.save(() => {
      req.session.user_id = results.id;
      req.session.logged_in = true;
      
      res.json(results)
    })
  })
})

router.post("/login", (req, res) => {
  //  req.body.email + req.body.password

  // Step 1: Check if email exists
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(foundUser => {
    console.log(foundUser)
    if(foundUser == null) {
      res.status(400).send("No user found!")
      return
    }

    // Step 2: Check the password if matches!
    // foundUser.password == req.body.password

    const isPasswordCorrect = foundUser.checkPassword(req.body.password);

    if(!isPasswordCorrect) {
      res.status(400).send("Incorrect credentials")
      return;
    }

    // Step 3: Create the session

    req.session.save(() => {
      req.session.user_id = foundUser.id;
      req.session.logged_in = true;
      
      res.json(foundUser)
    })

  })
})

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy();

  res.send("Logout success!")
})

// Update (PUT)
router.put("/:id", (req, res) => {
  User.update(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
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
  User.destroy(
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
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require("../user/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config");
var VerifyToken = require("./VerifyToken");

router.post("/register", function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
    function (err, user) {
      if (err)
        return res.status(500).send("There was a problem registering a user");
      // create a token for the user
      let token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }
  );
});

router.get("/me", VerifyToken, function (req, res, next) {
  User.findById(decoded.id, { password: 0 }, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
    //  next(user);
  });
});

//midleware
/* router.use(function (user, req, res, next) {
   res.status(200).send(user);
  }); */

router.post("/login", function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Eroor on the server.");
    if (!user) return res.status(404).send("No user found");
    var passwordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordValid)
      return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

router.get("/logout", function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;

const express = require("express");
const { check, validationResult } = require("express-validator");
const authentification = require("../middlewares/authentification");
const admin = require("../middlewares/admin");
const vendeur = require("../middlewares/vendeur");
const client = require("../middlewares/client");

const router = express.Router();
const Publication = require("../Models/publication");

// @route    GET annonces/
// @desc     get ads
// @access   Public
router.get("/", async (req, res) => {
  try {
    const publications = req.query.user_id
      ? await Publication.find({ user: req.query.user_id })
      : req.query.marque
      ? await Publication.find({
          $and: [{ marque: req.query.marque }]
        }).populate("user", "-password")
      : req.query.marque
      ? await Publication.find({
          marque: req.query.marque
        }).populate("user", "-password")
      : await Publication.find().populate("user", "-password");

    if (!publications)
      return res.status(404).send({ msg: "There are no ads yet" });

    return res.send(publications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route    GET annonces/
// @desc     get  recent 5 ads
// @access   Public
router.get("/recent", async (req, res) => {
  try {
    const publications = await Publication.find()
      .limit(4)
      .sort({ date: -1 });

    if (!publications)
      return res.status(404).send({ msg: "There are no ads yet" });

    return res.send(publications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route    GET annonces/:id
// @desc     get an ad
// @access   Public i guess
router.get("/:id", async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id)
      .populate("user", "-password")
      .populate("Comments.user", "-password");

    if (!publication)
      return res
        .status(404)
        .send({ msg: "The ad with the given ID was not found." });

    return res.send(publication);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route    POST annonces/
// @desc     add an ad
// @access   Private
router.post(
  "/",
  [
    authentification,
    vendeur,
    check("title", "please enter your pub title")
      .not()
      .isEmpty(),
    check("description", "please enter your pub description")
      .not()
      .isEmpty(),
    check("image", "please enter your instrument image")
      .not()
      .isEmpty(),

    check("price", "please enter your instrument price")
      .not()
      .isEmpty(),
    check("marque", "please enter your instrument marque")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { title, description, image, price, marque } = req.body;
      const publication = new Publication({
        user: req.user._id,
        title,
        marque,
        description,
        image,

        price
      });
      publication.save();
      res.status(201).send(publication);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    PUT annonces/:id
// @desc     update an ad
// @access   Private
router.put(
  "/:id",
  [
    authentification,
    vendeur,
    check("title", "please enter your pub title")
      .not()
      .isEmpty(),
    check("description", "please enter your pub description")
      .not()
      .isEmpty(),
    check("image", "please enter your instrument image")
      .not()
      .isEmpty(),
    check("marque", "please enter your instrument marque")
      .not()
      .isEmpty(),

    check("price", "please enter your instrument price")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      let publication = await Publication.findById(req.params.id);
      if (!publication)
        return res
          .status(404)
          .send({ msg: "The ad with the given ID was not found." });

      if (publication.user.toString() !== req.user._id)
        return res.status(403).send({ msg: "you are not authentification" });
      publication = await Publication.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );
      publication.populate("user");
      res.send(publication);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    DELETE annonces/:id
// @desc     delete an ad
// @access   Private
router.delete("/:id", authentification, async (req, res) => {
  try {
    let publication = await Publication.findById(req.params.id);
    if (!publication)
      return res
        .status(404)
        .send({ msg: "The ad with the given ID was not found." });
    if (
      publication.user.toString() !== req.user._id &&
      req.user.role !== "Admin"
    )
      return res.status(403).send({ msg: "unauthentification" });
    publication = await Publication.findByIdAndDelete(req.params.id);
    res.send("ad removed");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route    PUT annonces/like/:id
// @desc     like an ad
// @access   Private
// router.put("/like/:id", authentification, async (req, res) => {
//   try {
//     const publication = await Publication.findById(req.params.id);

//     if (
//       publication.likes.filter(like => like.user.toString() === req.user._id)
//         .length > 0
//     ) {
//       return res.status(400).json({ msg: "Ad already liked" });
//     }
//     publication.likes.unshift({ user: req.user._id });

//     await publication.save();

//     res.json(publication);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route    PUT annonces/unlike/:id
// // @desc     unlike an ad
// // @access   Private
// router.put("/unlike/:id", authentification, async (req, res) => {
//   try {
//     const publication = await Publication.findById(req.params.id);

//     if (
//       publication.likes.filter(like => like.user.toString() === req.user._id)
//         .length === 0
//     ) {
//       return res.status(400).json({ msg: "Ad has not yet been liked" });
//     }

//     const removeIndex = publication.likes
//       .map(like => like.user.toString())
//       .indexOf(req.user._id);

//     publication.likes.splice(removeIndex, 1);

//     await publication.save();

//     res.json(publication);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route    POST annonces/comment/:id/:comment_id
// @desc     add a comment
// @access   Private
router.post(
  "/comment/:id",
  [
    authentification,
    client,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const publication = await Publication.findById(req.params.id);

      const newComment = {
        user: req.user._id,
        text: req.body.text
      };

      publication.Comments.unshift(newComment);
      await publication.save();

      res.json(publication.Comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE annonces/comment/:id/:comment_id
// @desc     delete a comment
// @access   Private
router.delete(
  "/comment/:id/:comment_id",
  authentification,
  async (req, res) => {
    try {
      const publication = await Publication.findById(req.params.id);

      const comment = publication.Comments.find(
        comment => comment.id === req.params.comment_id
      );

      if (!comment) {
        return res.status(404).json({ msg: "Comment does not exist" });
      }

      if (
        comment.user.toString() !== req.user._id &&
        req.user.role !== "Admin"
      ) {
        return res.status(401).json({ msg: "unauthentification" });
      }

      const removeIndex = publication.Comments.map(
        comment => comment.id
      ).indexOf(req.params.comment_id);

      publication.Comments.splice(removeIndex, 1);

      await publication.save();

      res.json(publication.Comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;

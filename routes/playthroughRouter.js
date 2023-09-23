const express = require("express");
const playthroughRouter = express.Router();
const Playthrough = require("../models/playthrough.js");

// Get All Playthroughs
playthroughRouter.get("/", (req, res, next) => {
  Playthrough.find((err, playthroughs) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(playthroughs);
  });
});

// Get Playthroughs by user id
playthroughRouter.get("/user", (req, res, next) => {
  Playthrough.find({ user: req.auth._id }, (err, playthroughs) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(playthroughs);
  });
});

// Get Playthroughs by Room id
playthroughRouter.get("/:roomId", (req, res, next) => {
  const filter = req.params.roomId ? { room: req.params.roomId } : {};
  Playthrough.find(filter, (err, comments) => {
    if (err) {
      return handleErrors(res, next, err);
    }
    return res.status(200).send(comments);
  }).populate("user");
});

// Get Playthroughs by User & Room id
playthroughRouter.get("/user/:roomId", (req, res, next) => {
  const filter = req.params.roomId ? { room: req.params.roomId } : {};
  Playthrough.find(filter, (err, comments) => {
    if (err) {
      return handleErrors(res, next, err);
    }
    return res.status(200).send(comments);
  });
});

// Add new Playthrough
playthroughRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id;
  const newPlaythrough = new Playthrough(req.body);
  newPlaythrough.save((err, savedPlaythrough) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedPlaythrough);
  });
});

// Update Playthrough
playthroughRouter.put("/:playthroughId", (req, res, next) => {
  Playthrough.findOneAndUpdate(
    { _id: req.params.playthroughId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedPlaythrough) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedPlaythrough);
    }
  );
});

// Delete Playthrough
playthroughRouter.delete("/:playthroughId", (req, res, next) => {
  Playthrough.findOneAndDelete(
    { _id: req.params.playthroughId, user: req.auth._id },
    (err, deletedPlaythrough) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Successfully deleted Playthrough: ${deletedPlaythrough.text}`);
    }
  );
});

module.exports = playthroughRouter;

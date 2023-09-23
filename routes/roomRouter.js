const express = require("express");
const roomRouter = express.Router();
const Playthrough = require("../models/room.js");

// Get All Rooms
roomRouter.get("/", (req, res, next) => {
  Playthrough.find((err, rooms) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(rooms);
  });
});

// Get Playthroughs by Room id
// roomRouter.get("/:roomId", (req, res, next) => {
//   Playthrough.find({ user: req.auth._id }, (err, rooms) => {
//     if (err) {
//       res.status(500);
//       return next(err);
//     }
//     return res.status(200).send(rooms);
//   });
// });

// Add new Room
roomRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id;
  const newRoom = new Playthrough(req.body);
  newRoom.save((err, savedRoom) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedRoom);
  });
});

// Update Room
roomRouter.put("/:roomId", (req, res, next) => {
  Playthrough.findOneAndUpdate(
    { _id: req.params.roomId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedRoom) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedRoom);
    }
  );
});

// Delete Room
roomRouter.delete("/:roomId", (req, res, next) => {
  Playthrough.findOneAndDelete(
    { _id: req.params.roomId, user: req.auth._id },
    (err, deletedRoom) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Successfully delete Playthrough: ${deletedRoom.text}`);
    }
  );
});

module.exports = roomRouter;

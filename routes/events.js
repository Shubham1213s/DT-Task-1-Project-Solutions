// const express = require("express");
// const { ObjectId } = require("mongodb");

// const { getDB } = require("../db");

const express = require("express");
const mongodb = require("mongodb");
const { getDB } = require("../database");

const ObjectId = mongodb.ObjectId;

const router = express.Router();

/**
 * GET event by ID
 * /events?id=event_id
 */
router.get("/", async (req, res) => {
  const db = getDB();

  if (req.query.id) {
    const event = await db
      .collection("events")
      .findOne({ _id: new ObjectId(req.query.id) });

    return res.json(event);
  }

  if (req.query.type === "latest") {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;

    const events = await db
      .collection("events")
      .find()
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return res.json(events);
  }

  res.status(400).json({ message: "Invalid query" });
});

/**
 * POST create event
 */
router.post("/", async (req, res) => {
  const db = getDB();
  const result = await db.collection("events").insertOne(req.body);

  res.json({ event_id: result.insertedId });
});

/**
 * PUT update event
 */
router.put("/:id", async (req, res) => {
  const db = getDB();

  await db.collection("events").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );

  res.json({ message: "Event updated" });
});

/**
 * DELETE event
 */
router.delete("/:id", async (req, res) => {
  const db = getDB();

  await db.collection("events").deleteOne({
    _id: new ObjectId(req.params.id),
  });

  res.json({ message: "Event deleted" });
});

module.exports = router;

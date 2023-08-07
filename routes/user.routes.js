const express = require("express");
const router = express.Router();
const db = require("../utils/database");
const { json } = require("body-parser");

//Get all
router.get("/", async (req, res) => {
  try {
    let data = await db.execute("SELECT * FROM user");
    let row = data[0];
    res.json({
      msessage: "data-users",
      data: row,
    });
  } catch (error) {
    console.log(error);
  }
});

//Get one
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let user = await db.execute("SELECT * FROM user WHERE user_id = ?", [id]);
    let row = user[0];
    res.json({
      message: `user with id = ${id}`,
      user: row,
    });
  } catch (error) {
    console.log(error);
  }
});

//Create
router.post("/", async (req, res) => {
  let { name, gmail, age } = req.body;
  try {
    let newUser = await db.execute(
      `INSERT INTO user ( user_name, user_gmail, user_age) VALUES ("${name}", "${gmail}", "${age}")`
    );
    res.json({
      message: "create success",
    });
  } catch (error) {
    console.log(error);
  }
});

//Update
router.patch("/:id", async (req, res) => {
  let { id } = req.params;
  let { name, gmail, age } = req.body;
  try {
    let updateUser = await db.execute(
      "UPDATE user_hkt.user SET user_name=?, user_gmail=?, user_age=? WHERE user_id=?",
      [name, gmail, age, +id]
    );
    res.json({
      message: "Update user sucsess",
    });
  } catch (error) {
    console.log(error);
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let deleteUser = await db.execute(
      "DELETE FROM user_hkt.user WHERE user_id = ?",
      [id]
    );
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

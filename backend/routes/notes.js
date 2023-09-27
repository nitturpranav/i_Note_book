const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
//Route 1:get all the notes using:get "/api/notes/getuser".login requires
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});
//Route 2:Add a new note  using:post "/api/notes/addnote".login requires
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a description of atleast 5 characters ").isLength({min: 5}),
  ],async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      })
      const savednote = await note.save();

      res.json(savednote);
    } 
    catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
//Route 3:update a new note  using:put "/api/notes/addnote".login requires
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};

        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        //find the note to be updated and update it

        let note = await Note.findById(req.params.id);

        if (!note) {
            console.log("Note not found:", req.params.id);
            return res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            console.log("Unauthorized:", req.user.id);
            return res.status(401).send("Unauthorized");
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );

        console.log("Note updated:", updatedNote);
        res.json({title,description,tag})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});
//Route 4:delet an existing note  using:delete "/api/notes/deletenote".login requires
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
        const { title, description, tag } = req.body;

        let note = await Note.findById(req.params.id);

        if (!note) {
            console.log("Note not found:", req.params.id);
            return res.status(404).send("Note not found");
        }
         
        if (note.user.toString() !== req.user.id) {
            console.log("Unauthorized:", req.user.id);
            return res.status(401).send("Unauthorized");
        }

        const updatedNote = await Note.findByIdAndDelete(
            req.params.id
        );

        res.json({"Success":"Note has been deleted",note:note})
    
});
module.exports = router;

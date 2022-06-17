 const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

//ROUTE:1,get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured!")
    }



})
//ROUTE:2, add notes
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters ').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there are errors return bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();
        res.json(savednote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured!")
    }

})

//ROUTE:3, update an existing note using :POST "api/auth/updatenote". login required 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try{
    //create a new note
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(404).send("Not Found!") }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed!")
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured!")
    }

});



//ROUTE:4, delete an existing note using :DELETE "api/auth/deletenote". login required 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   try {
    //find the note to be deleted and delete it
    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(404).send("Not Found!") }

    //allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed!")
    }
    note = await Note.findByIdAndDelete(req.params.id)
       res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured!")
    }

});

module.exports = router;
const express = require('express');
const fetchUser =require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

const router = express.Router();


//ROUTE 1 :get all the notes using: GET "/api/notes/fetchnotes". Login required
router.get('/fetchnotes',fetchUser, async (req,res) => {

    try {
        const notes=await Notes.find({user:req.user.id})
        res.json(notes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports =router

//ROUTE 2 :add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote',fetchUser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5})], async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {title,description,tag}=req.body;
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote=await note.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 3 :update an existing note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id',fetchUser,async(req,res)=>{
    const {title,description,tag}=req.body;
    try {
        //finding the note to be updated and update it
        let note=await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found");
        }
        if(title){
            note.title=title;
        }
        if(description){    
            note.description=description;
        }
        if(tag){
            note.tag=tag;
        }

        if(note.user.toString()!=req.user.id){
            return res.status(401).send("Not allowed");
        }

        const updatedNote=await Notes.findByIdAndUpdate(req.params.id,{$set:note},{new:true});
        res.json(updatedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//route 4 :delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id',fetchUser,async(req,res)=>{
    try {
        //finding the note to be deletedcand delete it
        let note=await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found");
        }
        
        if(note.user.toString()!=req.user.id){
            return res.status(401).send("Not allowed");
        }

        const deletedNote=await Notes.findByIdAndDelete(req.params.id);
        res.json({message:"Note deleted successfully",deletedNote});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
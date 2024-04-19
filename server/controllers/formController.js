const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose")
const multer = require('multer');
const Recording = require('../models/recording');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });


const submitForm = asyncHandler(async (req, res, next) => {

  
    if (!req.file||!req.body.doctorName || !req.body.patientName || !req.body.patientAge || !req.body.date) {
      
        return res.status(400).json({ message: 'All fields are required' });
      }
    
      try {
      
        const date = new Date(req.body.date);

        const newRecording = new Recording({
          doctorName: req.body.doctorName,
          patientName: req.body.patientName,
          patientAge: req.body.patientAge,
          date: date,
          soundFile: req.file.buffer, 
        });
    
        
        await newRecording.save();
    
        res.status(201).json({ message: 'Recording saved successfully' });
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error saving recording', error: error });
      }
});

const getData = asyncHandler(async (req, res, next) => {
  try {
    // Fetch all recordings from the database
    const recordings = await Recording.find({}).select("doctorName patientName patientAge date ");
    
   
    res.status(200).json(recordings);
  } catch (error) {
    console.error(error);
 
    res.status(500).json({ message: 'Error fetching recordings', error: error });
  }
})

const getRecording = asyncHandler(async (req, res, next) => {
  try {
    
    
    const fileId = req.params.id;
    console.log(fileId)
    const soundFile = await Recording.findById(new mongoose.Types.ObjectId(fileId)).select("soundFile");
    console.log(soundFile)
    res.set('content-type', 'audio/mp3');
    
    
    res.send(soundFile.soundFile)
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ message: 'Error fetching recordings', error: error });
  }
})

module.exports = {
  submitForm,
  getData,
  getRecording,
};
const express = require("express");
const router = express.Router();
const cors = require('cors')
const multer = require('multer');
const Recording = require('../models/recording');
// Set up Multer for handling file uploads
const storage = multer.memoryStorage()

const upload = multer({ storage: storage });
// Require controller modules.
const form_controller = require("../controllers/formController");
router.use(cors());
router.post('/submit',upload.single('file'), form_controller.submitForm);
router.get('/records', form_controller.getData);
router.get('/soundfile/:id', form_controller.getRecording);

module.exports = router;
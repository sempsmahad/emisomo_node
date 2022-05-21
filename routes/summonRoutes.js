const express = require('express')
const router = express.Router()

const {
  createSummon,
  getAllSummons,
} = require('../controllers/summonController')
const { uploadSummonAudio } = require('../controllers/uploadsController')

router.route('/').post(createSummon).get(getAllSummons)
router.route('/uploads').post(uploadSummonAudio)

module.exports = router

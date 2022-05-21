const Summon = require('../models/Summon')
const { StatusCodes } = require('http-status-codes')

const createSummon = async (req, res) => {
  const summon = await Summon.create(req.body)
  res.status(StatusCodes.CREATED).json({ summon })
}
const getAllSummons = async (req, res) => {
  const summons = await Summon.find({})
  res.status(StatusCodes.OK).json({ summons })
}

module.exports = {
  createSummon,
  getAllSummons,
}

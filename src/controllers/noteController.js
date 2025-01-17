'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getNote = exports.createNote = void 0
const blockchainService_1 = require('../services/blockchainService')
const Note_1 = __importDefault(require('../models/Note'))
const createNote = async (req, res) => {
  const { content } = req.body
  const hash = require('crypto')
    .createHash('sha256')
    .update(content)
    .digest('hex')
  await (0, blockchainService_1.saveNoteOnBlockchain)(hash)
  const note = new Note_1.default({ content, hash })
  await note.save()
  return res.status(201).json({ message: 'Note saved successfully', hash })
}
exports.createNote = createNote
const getNote = async (req, res) => {
  const { hash } = req.params
  const note = await Note_1.default.findOne({ hash })
  if (!note) {
    return res.status(404).json({ message: 'Note not found' })
  }
  const timestamp = await (0, blockchainService_1.getNoteFromBlockchain)(hash)
  return res.status(200).json({ content: note.content, timestamp })
}
exports.getNote = getNote

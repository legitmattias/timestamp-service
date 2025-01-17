import { Request, Response } from 'express'
import {
  saveNoteOnBlockchain,
  getNoteFromBlockchain,
} from '../services/blockchainService'
import Note from '../models/Note'

export const createNote = async (req: Request, res: Response) => {
  const { content } = req.body
  const hash = require('crypto')
    .createHash('sha256')
    .update(content)
    .digest('hex')

  await saveNoteOnBlockchain(hash)
  const note = new Note({ content, hash })
  await note.save()
  return res.status(201).json({ message: 'Note saved successfully', hash })
}

export const getNote = async (req: Request, res: Response) => {
  const { hash } = req.params

  const note = await Note.findOne({ hash })
  if (!note) {
    return res.status(404).json({ message: 'Note not found' })
  }

  const timestamp = await getNoteFromBlockchain(hash)
  return res.status(200).json({ content: note.content, timestamp })
}

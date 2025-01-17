import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  content: String,
  hash: String,
})

export default mongoose.model('Note', noteSchema)

import { Router } from 'express'
import { createNote, getNote } from '../controllers/noteController'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.post('/', asyncHandler(createNote))
router.get('/:hash', asyncHandler(getNote))

export default router

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noteController_1 = require("../controllers/noteController");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const router = (0, express_1.Router)();
router.post('/', (0, asyncHandler_1.default)(noteController_1.createNote));
router.get('/:hash', (0, asyncHandler_1.default)(noteController_1.getNote));
exports.default = router;

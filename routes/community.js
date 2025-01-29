import express from 'express';
import { createPost, deletePostById, getAllPosts, getPostById, addComment, getCommentsByPostId } from '../controllers/postController.js';
const router = express.Router();

router.post('/add', createPost);
router.get('/all', getAllPosts);
router.delete('/del/:id', deletePostById);
router.get('/:id', getPostById);
router.post('/:id/comment', addComment);
router.get('/:id/comments', getCommentsByPostId);
export default router;

import { CommunityPost } from "../model/communityPost.js";
import { CommentModel } from "../model/commentModel.js";
import { User } from "../model/userModel.js";

import { z } from "zod";

const postSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    userId: z.string(),
    type: z.string().optional(),
});

const commentSchema = z.object({
    text: z.string().min(4, 'Text is required'),
    userId: z.string(),
    postId: z.string(),
});

export const createPost = async (req, res) => {
    
    console.log('hit the server');
    
    const parseResult = postSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            error: parseResult.error.errors.map(err => err.message).join(', '),
        });
    }

    const { title, content, userId, type } = req.body;

    try {
        const post = await CommunityPost.create({
            title,
            content,
            userId,
            type,
        });

        if (post) {
            res.status(201).json(post);
        } else {
            res.status(400).json({ error: 'Invalid post data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await CommunityPost.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const addComment = async (req, res) => {

    const parseResult = commentSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            error: parseResult.error.errors.map(err => err.message).join(', '),
        });
    }

    const { text, userId, postId } = req.body;

    try {
        const comment = await CommentModel.create({
            text,
            userId,
            postId,
        });

        if (comment) {
            res.status(201).json(comment);
        } else {
            res.status(400).json({ error: 'Invalid comment data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await CommentModel.find({ postId: req.params.id });
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}


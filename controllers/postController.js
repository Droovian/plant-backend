import { CommunityPost } from "../model/communityPost.js";
import { CommentModel } from "../model/commentModel.js";
import { User } from "../model/userModel.js";
import client from "../redis/client.js";
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
    const parseResult = postSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            error: parseResult.error.errors.map(err => err.message).join(', '),
        });
    }

    const { title, content, userId, type } = req.body;

    try {
        const post = await CommunityPost.create({ title, content, userId, type });

        if (post) {
            try {
                await client.del('posts');
            } catch (redisError) {
                console.error("Redis error (could not delete cache):", redisError.message);
            }
            res.status(201).json(post);
        } else {
            res.status(400).json({ error: 'Invalid post data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        // Try getting cached posts from Redis
        const cachedPosts = await client.json.get('posts');

        if (cachedPosts) {
            return res.status(200).json(cachedPosts);
        }

        const posts = await CommunityPost.find().lean();

        if (posts.length > 0) {
            await client.json.set('posts', '$', posts);
            await client.expire('posts', 3600);
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Server error" });
    }
};


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
};

export const addComment = async (req, res) => {
    const parseResult = commentSchema.safeParse(req.body);
    
    if (!parseResult.success) {
        return res.status(400).json({
            error: parseResult.error.errors.map(err => err.message).join(', '),
        });
    }

    const { text, userId, postId } = req.body;
    const cacheKey = `comments:${postId}`;

    try {
        const comment = await CommentModel.create({ text, userId, postId });

        if (comment) {
            try {
                await client.del(cacheKey);
            } catch (redisError) {
                console.error("Redis error (could not delete cache):", redisError.message);
            }
            res.status(201).json(comment);
        } else {
            res.status(400).json({ error: 'Invalid comment data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getCommentsByPostId = async (req, res) => {
    const { id: postId } = req.params;
    const cacheKey = `comments:${postId}`;

    try {
        let cachedComments = null;
        try {
            cachedComments = await client.json.get(cacheKey);
        } catch (redisError) {
            console.error("Redis error (fallback to DB):", redisError.message);
        }

        if (cachedComments) {
            return res.status(200).json(cachedComments);
        }

        const comments = await CommentModel.find({ postId });
        try {
            await client.json.set(cacheKey, '$', comments);
            await client.expire(cacheKey, 3600);
        } catch (redisError) {
            console.error("Redis error (could not cache):", redisError.message);
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const deletePostById = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (post) {
            await post.deleteOne();
            try {
                await client.del('posts');
                await client.del(`comments:${req.params.id}`);
            } catch (redisError) {
                console.error("Redis error (could not delete cache):", redisError.message);
            }
            res.status(200).json({ message: 'Post removed' });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

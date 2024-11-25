import { Blogs } from '../models/blog.model.js'; // Assuming you have a Blog model
import { fileDestroy, fileUploader } from '../utils/fileUpload.js';

// Add a new blog with or without an image
export const addBlog = async (req, res) => {
    try {
        const { content } = req.body;
        const { file } = req.body; // Image file if provided
        const { id } = req.user

        if (!content ) {
            return res.status(400).json({
                message: "Title, content, and author are required!",
                success: false,
            });
        }

        // Handle optional image upload
        let image = null;
        if (file) {
            const { url, public_id, error } = await fileUploader(file);
            if (error) {
                return res.status(400).json({
                    message: "Image upload failed!",
                    success: false,
                });
            }
            image = { url, public_id };
        }

        const blog = await Blogs.create({
            content,
            user:id ,
            image,
        });

        res.status(201).json({
            message: "Blog created successfully!",
            success: true,
            blog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add blog. Please try again.",
            success: false,
        });
    }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blogs.findById(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found!",
                success: false,
            });
        }

        // Delete associated image if present
        if (blog.image?.public_id) {
            const isDestroyed = await fileDestroy(blog.image.public_id);
            if (!isDestroyed) {
                return res.status(400).json({
                    message: "Failed to delete associated image!",
                    success: false,
                });
            }
        }

        await blog.deleteOne();
        res.status(200).json({
            message: "Blog deleted successfully!",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete blog. Please try again.",
            success: false,
        });
    }
};

// Update a blog
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, file } = req.body;

        const blog = await Blogs.findById(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found!",
                success: false,
            });
        }

        // Handle image update
        if (file) {
            // Delete old image
            if (blog.image?.public_id) {
                const isDestroyed = await fileDestroy(blog.image.public_id);
                if (!isDestroyed) {
                    return res.status(400).json({
                        message: "Failed to delete old image!",
                        success: false,
                    });
                }
            }
            // Upload new image
            const { url, public_id, error } = await fileUploader(file);
            if (error) {
                return res.status(400).json({
                    message: "Failed to upload new image!",
                    success: false,
                });
            }
            blog.image = { url, public_id };
        }

        // Update title and content if provided
        if (title) blog.title = title;
        if (content) blog.content = content;

        await blog.save();

        res.status(200).json({
            message: "Blog updated successfully!",
            success: true,
            blog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update blog. Please try again.",
            success: false,
        });
    }
};

// React to a blog (like/dislike)
export const reactToBlog = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID
        const { reaction } = req.body; // Reaction type (e.g., 'like' or 'dislike')

        if (!['like', 'dislike'].includes(reaction)) {
            return res.status(400).json({
                message: "Invalid reaction type!",
                success: false,
            });
        }

        const blog = await Blogs.findById(id);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found!",
                success: false,
            });
        }

        if (reaction === 'like') {
            blog.likes += 1;
        } else if (reaction === 'dislike') {
            blog.dislikes += 1;
        }

        await blog.save();

        res.status(200).json({
            message: `Blog ${reaction}d successfully!`,
            success: true,
            blog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to react to blog. Please try again.",
            success: false,
        });
    }
};

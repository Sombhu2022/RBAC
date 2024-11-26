import { Blogs } from '../models/blog.model.js'; // Assuming you have a Blog model
import { fileDestroy, fileUploader } from '../utils/fileUpload.js';

// Add a new blog with or without an image
export const addBlog = async (req, res) => {
    try {
        const { image , content , title} = req.body;
       console.log(req.body);
       
        const { id } = req.user;
   
        if (!content || !title) {
            return res.status(400).json({
                message: "Title, content are required!",
                success: false,
            });
        }

        // Handle optional image upload
        let tempImage ={
            url : '',
            public_id:''
        };

        if (image) {
            const { url, public_id, error } = await fileUploader(image);
            if (error) {
                return res.status(400).json({
                    message: "Image upload failed!",
                    success: false,
                });
            }
            tempImage = { url, public_id };
        }

        const blog = await Blogs.create({
            content,
            user:id ,
            title,
            image:tempImage,
        });

        res.status(201).json({
            message: "Blog created successfully!",
            success: true,
            data:blog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add blog. Please try again.",
            success: false,
        });
    }
};


// find all blogs 
export const fetchAllBlogs = async (req, res) => {
    try {
        // Fetch blogs and populate the fields
        const blogs = await Blogs.find({})
            .populate({
                path: 'user',
                select: 'name email profile_pic', // Populate only specific fields from User
            })
            .populate({
                path: 'reaction',
                select: 'name email profile_pic', // Populate only specific fields from User for reactions
            })
            .sort({ createdAt: -1 }); // Sort by creation date (latest first)

        if (!blogs.length) {
            return res.status(404).json({
                success: false,
                message: "No blogs found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blogs retrieved successfully",
            data: blogs,
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching blogs",
            error: error.message,
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

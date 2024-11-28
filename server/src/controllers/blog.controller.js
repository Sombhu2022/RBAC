import { Blogs } from '../models/blog.model.js'; // Assuming you have a Blog model
import { Reports } from '../models/report.model.js';
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
        })

        const populateBlog = await Blogs.findById(blog._id).populate({
            path: 'user',
            select: 'name email profile_pic', // Populate specific fields from User
        })
        .populate({
            path: 'reactions',
            select: 'name email profile_pic', // Populate specific fields from User for reactions
        })
        .exec();

        res.status(201).json({
            message: "Blog created successfully!",
            success: true,
            data:populateBlog,
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
        // Fetch blogs if this block is not Blocked and populate the fields
        const blogs = await Blogs.find({isBlock:false})
            .populate({
                path: 'user',
                select: 'name email profile_pic', // Populate only specific fields from User
            })
            .populate({
                path: 'reactions',
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



// fetchBlogById 
export const fetchBlogById = async (req, res) => {
    try {
        const { blogId } = req.params
        // Fetch blogs and populate the fields
        const blog = await Blogs.findById(blogId)
            .populate({
                path: 'user',
                select: 'name email profile_pic', // Populate only specific fields from User
            })
            .populate({
                path: 'reactions',
                select: 'name email profile_pic', // Populate only specific fields from User for reactions
            })
            

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "No blogs found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog retrieved successfully",
            data: blog,
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




export const fetchAllBlogsOfEachUser = async (req, res) => {
    try {
        const { id } = req.user; // Assumes middleware sets `req.user`
        console.log("User ID:", id);

        // Fetch blogs for the user and populate fields
        const blogs = await Blogs.find({ user : id })
            .populate({
                path: 'user',
                select: 'name email profile_pic', // Populate specific fields from User
            })
            .populate({
                path: 'reactions',
                select: 'name email profile_pic', // Populate specific fields from User for reactions
            })
            .sort({ createdAt: -1 }); // Sort by creation date (latest first)

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blogs found for the user",
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
        const { blogId } = req.params;
        const { id } = req.user
        // console.log(blogId , id);
        
        const blog = await Blogs.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found!",
                success: false,
            });
        }
        // console.log(id , blog.user);
        
        // if authenticate user and blog poster are not same user !
       if( id !== blog.user.toString()){

        return res.status(403).json({
            message: "UnAutherized Access!",
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
            data: blog
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
        const { blogId } = req.params;
        const  { id } = req.user ; 
        const { title, content, image } = req.body;

        const blog = await Blogs.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found!",
                success: false,
            });
        }

          // if authenticate user and blog poster are not same user !
       if( id !== blog.user.toString()){

        return res.status(403).json({
            message: "UnAutherized Access!",
            success: false,
        });

       }

        // Handle image update
        if (image) {
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
            const { url, public_id, error } = await fileUploader(image);
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

        const populateBlog = await Blogs.findById(blog._id).populate({
            path: 'user',
            select: 'name email profile_pic', // Populate specific fields from User
        })
        .populate({
            path: 'reactions',
            select: 'name email profile_pic', // Populate specific fields from User for reactions
        })
        .exec();


       return  res.status(200).json({
            message: "Blog updated successfully!",
            success: true,
            data : populateBlog,
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
        const { blogId } = req.params; // Blog ID
        const { id } = req.user
        const { isReaction } = req.body ;

        const blog = await Blogs.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found!",
                success: false,
            });
        }

       // Add the reaction if not already present
       const reactionIndex = blog.reactions.findIndex(
        (reaction) => reaction.toString() === id.toString()
      );
      let status =''
      if (reactionIndex === -1) {
        // User has not reacted yet, add the reaction
        blog.reactions.push(id); // Push user ID as ObjectId
        status = 'Added'
      } else {
        // If user has already reacted, you can either remove or update the reaction
        blog.reactions.splice(reactionIndex, 1); // Remove the reaction
        status = 'Delete'
      }

        // Save the blog with the updated reactions
        await blog.save()
        
        const populateBlog = await Blogs.findById(blog._id).populate({
            path: 'user',
            select: 'name email profile_pic', // Populate specific fields from User
        })
        .populate({
            path: 'reactions',
            select: 'name email profile_pic', // Populate specific fields from User for reactions
        })

        res.status(200).json({
            message: `Blog reaction ${status} successfully!`,
            success: true,
            data:populateBlog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to react to blog. Please try again.",
            success: false,
        });
    }
};


// post block 

// Block a blog and update all related reports
export const blockABlogPost = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Update the blog to set it as blocked
    const blog = await Blogs.findByIdAndUpdate(
      { _id: blogId },
      { $set: { isBlock: true } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Find all reports related to the blog
    const reports = await Reports.updateMany(
      { reportedOn:blogId }, // Filter reports by blogId
      { $set: { status: "Resolved" } } // Update the status to Resolved
    );

    // Respond with success message
    res.status(200).json({
      message: "Blog has been blocked successfully, and all related reports are updated.",
      updatedReports: reports.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
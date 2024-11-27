import { createSlice } from "@reduxjs/toolkit";
import { createBlog, deleteBlog, fetchAllBlogs, fetchAllBlogsOfEachUser, fetchBlogByBlogId, updateBlog } from "./blogController";

const initialState = {
    blogs: [],
    blog: {},
    myBlogs: [],
    message: "",
    error: "",
    status: {
        createBlog: "",
        fetchAllBlog: "",
        fetchBlogByBlogId: '',
        fetchAllBlogsOfEachUser: '',
        deleteBlog: '',
        updateBlog: ''
    },
    loading: {
        createBlogLoading: false,
        fetchAllBlogLoading: false,
        fetchBlogByBlogIdLoading: false,
        fetchAllBlogsOfEachUserLoading: false,
        deleteBlogLoading: false,
        updateBlogLoading: false
    }
};

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        resetBlogState: (state) => {
            state.error = "";
            state.message = "";
            state.status = { createBlog: "", fetchAllBlog: "" };
        }
    },
    extraReducers: (builder) => {
        builder
            // Add Blog
            .addCase(createBlog.pending, (state) => {
                state.loading.createBlogLoading = true;
                state.status.createBlog = "pending";
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.loading.createBlogLoading = false;
                state.status.createBlog = "success";
                state.blogs.push(data);
                state.message = message || "Blog posted successfully!";
            })
            .addCase(createBlog.rejected, (state, action) => {
                const { error, message } = action.payload || {};
                state.loading.createBlogLoading = false;
                state.status.createBlog = "rejected";
                state.message = message || "Blog post failed!";
                state.error = error || "Unknown error occurred.";
            })

            // fetch all Blog
            .addCase(fetchAllBlogs.pending, (state) => {
                state.loading.fetchAllBlogLoading = true;
                state.status.fetchAllBlog = "pending";
            })
            .addCase(fetchAllBlogs.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.loading.fetchAllBlogLoading = false;
                state.status.fetchAllBlog = "success";
                state.blogs = data
                state.message = message || "Blog fetched successfully!";
            })
            .addCase(fetchAllBlogs.rejected, (state, action) => {
                const { error, message } = action.payload || {};
                state.loading.fetchAllBlogLoading = false;
                state.status.fetchAllBlog = "rejected";
                state.message = message || "Blog fetching failed!";
                state.error = error || "Unknown error occurred.";
            })

            // fetch  Blog by blogId 
            .addCase(fetchBlogByBlogId.pending, (state) => {
                state.loading.fetchBlogByBlogIdLoading = true;
                state.status.fetchBlogByBlogId = "pending";
            })
            .addCase(fetchBlogByBlogId.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.loading.fetchBlogByBlogIdLoading = false;
                state.status.fetchBlogByBlogId = "success";
                state.blog = data
                state.message = message || "Blog fetched successfully!";
            })
            .addCase(fetchBlogByBlogId.rejected, (state, action) => {
                const { error, message } = action.payload || {};
                state.loading.fetchBlogByBlogIdLoading = false;
                state.status.fetchBlogByBlogId = "rejected";
                state.message = message || "Blog fetching failed!";
                state.error = error || "Unknown error occurred.";
            })

            // fetch  all Blogs of each user 
            .addCase(fetchAllBlogsOfEachUser.pending, (state) => {
                state.loading.fetchAllBlogsOfEachUserLoading = true;
                state.status.fetchAllBlogsOfEachUser = "pending";
            })
            .addCase(fetchAllBlogsOfEachUser.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.loading.fetchAllBlogsOfEachUserLoading = false;
                state.status.fetchAllBlogsOfEachUser = "success";
                state.myBlogs = data
                state.message = message || "Blog fetched successfully!";
            })
            .addCase(fetchAllBlogsOfEachUser.rejected, (state, action) => {
                const { error, message } = action.payload || {};
                state.loading.fetchAllBlogsOfEachUserLoading = false;
                state.status.fetchAllBlogsOfEachUser = "rejected";
                state.message = message || "Blog fetching failed!";
                state.error = error || "Unknown error occurred.";
            })


            // delete post  
            .addCase(deleteBlog.pending, (state) => {
                state.loading.deleteBlogLoading = true;
                state.status.deleteBlog = "pending";
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.loading.deleteBlogLoading = false;
                state.status.deleteBlog = "success";
                // Remove the blog from `myBlogs` and `blogs` arrays if it exists
                state.myBlogs = state.myBlogs.filter((blog) => blog._id !== data._id);
                state.blogs = state.blogs.filter((blog) => blog._id !== data._id);

                // If the deleted blog is currently viewed, clear the `blog` object
                if (state.blog._id === data._id) {
                    state.blog = {};
                }

                state.message = message || "Blog fetched successfully!";
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                const { error, message } = action.payload || {};
                state.loading.deleteBlogLoading = false;
                state.status.deleteBlog = "rejected";
                state.message = message || "Blog fetching failed!";
                state.error = error || "Unknown error occurred.";
            })

         // update blog 
            .addCase(updateBlog.pending, (state) => {
                state.loading.updateBlogLoading = true;
                state.status.updateBlog = "pending";
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.loading.updateBlogLoading = false;
                state.status.updateBlog = "success";
            
                // Update the blog in `myBlogs` if it exists
                state.myBlogs = state.myBlogs.map((blog) => 
                    blog._id === data._id ? data: blog
                );
            
                // Update the blog in `blogs` if it exists
                state.blogs = state.blogs.map((blog) => 
                    blog._id === data._id ? data : blog
                );
            
                // Update the currently viewed blog if it matches the updated blog
                if (state.blog._id === data._id) {
                    state.blog = data
                }
            
                state.message = message || "Blog updated successfully!";
            })
            .addCase(updateBlog.rejected, (state, action) => {
                const { error, message } = action.payload || {};
                state.loading.updateBlogLoading = false;
                state.status.updateBlog = "rejected";
                state.message = message || "Blog update failed!";
                state.error = error || "Unknown error occurred.";
            });
            
    }
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;

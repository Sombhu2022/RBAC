import { createSlice } from "@reduxjs/toolkit";
import { createBlog, fetchAllBlogs, fetchBlogByBlogId } from "./blogController";

const initialState = {
    blogs: [],
    blog: {},
    message: "",
    error: "",
    status: {
        createBlog: "",
        fetchAllBlog: "" ,
        fetchBlogByBlogId: ''
    },
    loading: {
        createBlogLoading: false,
        fetchAllBlogLoading: false,
        fetchBlogByBlogIdLoading : false
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
    }
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { createBlog, fetchAllBlogs } from "./blogController";

const initialState = {
    blogs: [],
    blog: {},
    message: "",
    error: "",
    status: {
        createBlog: "",
        fetchAllBlog: ""
    },
    loading: {
        createBlogLoading: false,
        fetchAllBlogLoading: false
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
    }
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;

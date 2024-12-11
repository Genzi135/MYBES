import { createSlice } from "@reduxjs/toolkit";

// Định nghĩa initialState cho blogSlice
const initialState = {
    blogList: [],
    currentBlog: null,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        // Action để set danh sách blog mới vào state
        setListBlog(state, action) {
            state.blogList = action.payload;
        },

        // Action để xóa một blog khỏi danh sách blog theo ID
        removeOneBlog(state, action) {
            state.blogList = state.blogList.filter(blog => blog.id !== action.payload);
        },

        // Action để thêm một danh sách blog mới vào blogList hiện tại
        addBlogs(state, action) {
            state.blogList = [...state.blogList, ...action.payload];
        },

        // Action để thay đổi trạng thái `isSave` cho một blog theo ID
        setSaveBlog(state, action) {
            const id = action.payload;
            const blog = state.blogList.find(blog => blog.id === id);
            if (blog) {
                if (blog.isSave) {
                    blog.isSave = false;
                } else {
                    blog.isSave = true;
                }
            }
        },
        setCurrentBlog(state, action) {
            state.currentBlog = action.payload;
        },
    },
});

export const { setListBlog, removeOneBlog, addBlogs, setSaveBlog, setCurrentBlog } = blogSlice.actions;

export default blogSlice.reducer;

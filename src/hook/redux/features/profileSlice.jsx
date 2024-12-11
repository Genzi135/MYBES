import { createSlice } from "@reduxjs/toolkit";

// Định nghĩa initialState cho blogSlice
const initialState = {
    blogList: [],
    savedList: []
};

const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        // Action để set danh sách blog mới vào state
        setListBlogProfile(state, action) {
            state.blogList = action.payload;
        },

        // Action để xóa một blog khỏi danh sách blog theo ID
        removeOneBlogProfile(state, action) {
            state.blogList = state.blogList.filter(blog => blog.id !== action.payload);
        },

        // Action để thêm một danh sách blog mới vào blogList hiện tại
        addBlogsProfile(state, action) {
            state.blogList = [...state.blogList, ...action.payload];
        },

        setSaveBlogProfile(state, action) {
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
        setCurrentBlogProfile(state, action) {
            state.currentBlog = action.payload;
        },
    },
});

export const { setListBlogProfile, removeOneBlogProfile, addBlogsProfile, setSaveBlogProfile, setCurrentBlogProfile } = profileSlice.actions;

export default profileSlice.reducer;

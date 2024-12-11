import { createSlice } from "@reduxjs/toolkit";

// Định nghĩa initialState cho commentSlice
const initialState = {
    commentList: [],
    currentComment: null,
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        // Action để set danh sách comment mới vào state
        setListComment(state, action) {
            state.commentList = action.payload;
        },

        // Action để xóa một comment khỏi danh sách comment theo ID
        removeOneComment(state, action) {
            state.commentList = state.commentList.filter(comment => comment.id !== action.payload);
        },

        // Action để thêm một comment mới vào commentList hiện tại
        addComment(state, action) {
            state.commentList = [action.payload, ...state.commentList];
        },

        // Action để set comment hiện tại
        setCurrentComment(state, action) {
            state.currentComment = action.payload;
        },
    },
});

export const { setListComment, removeOneComment, addComment, setCurrentComment } = commentSlice.actions;

export default commentSlice.reducer;

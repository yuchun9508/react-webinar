import { createSlice } from '@reduxjs/toolkit';

const webinarSlice = createSlice({
  name: 'webinar',
  initialState: {
    items: [],
    currentPage: 1,
    totalPages: null,
  },
  reducers: {
    incrementCurrentPage(state, action) {
      state.currentPage++;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setItems(state, action) {
      const newItems = action.payload;
      state.items = newItems.map((item) => {
        return {
          id: item.id,
          created_at: item.created_at,
          title: item.title,
          content: item.content,
        };
      });
    },
    addItems(state, action) {
      const newItems = action.payload;

      for (const item of newItems) {
        state.items.push({
          id: item.id,
          created_at: item.created_at,
          title: item.title,
          content: item.content,
        });
      }
    },
    reset(state) {
      state.items = [];
      state.currentPage = 1;
      state.totalPages = null;
    },
  },
});

export const webinarActions = webinarSlice.actions;

export default webinarSlice.reducer;

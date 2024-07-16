import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  content: null // iniziamo con null perché content riceverà un oggetto
};

const bookSelectedSlice = createSlice({
  name: "bookSelected",
  initialState,
  reducers: {
    selectBook: (state, action) => {
      // in questo reducer speciale sono permesse le mutazioni dirette dello stato, perché reduxjs/toolkit usa un middleware chiamato immerjs che
      // si occupa di gestire la mutazione in maniera da non creare problemi

      state.content = action.payload;
    }
  }
});

export const { selectBook } = bookSelectedSlice.actions;
export default bookSelectedSlice.reducer;

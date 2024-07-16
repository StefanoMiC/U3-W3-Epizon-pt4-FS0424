import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // qui ci potrebbero essere altre proprietà di stato, vale la pena prevedere di mantenerle tutte
  content: [] // iniziamo con un array vuoto perché content riceverà un array dal nostro reducer
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // in questo reducer speciale sono permesse le mutazioni dirette dello stato, perché reduxjs/toolkit usa un middleware chiamato immerjs che
      // si occupa di gestire la mutazione in maniera da non creare problemi

      state.content.push(action.payload);
    }
  }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

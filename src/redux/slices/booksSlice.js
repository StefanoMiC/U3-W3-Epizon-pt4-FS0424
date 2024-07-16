import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk("books/getBooks", async (dataFromOutside, thunkAPI) => {
  console.log("getState", thunkAPI.getState());
  try {
    let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
    if (resp.ok) {
      let fetchedBooks = await resp.json();
      // a questo punto avremo aspettato la risoluzione della fetch e ottenuto i dati dei libri
      // e quindi potremmo fare la dispatch di un'azione con fetchedBooks come payload!

      // questa dispatch interna comunica a quella esterna che è il momento di riprendere il flusso redux e di far arrivare l'action al reducer
      return fetchedBooks;
    } else {
      throw new Error("Errore nel reperimento dei dati 😥");
    }
  } catch (error) {
    console.log(error);
    // se qualcosa va storto dobbiamo ritornare una cosa speciale:
    return thunkAPI.rejectWithValue(error.message); // attenzione a non tornare l'oggetto intero error, ma solo il suo messaggio, o
    // eventualmente una stringa semplice
  }
});

const initialState = {
  content: [],
  isLoading: false,
  hasError: false,
  errorMessage: ""
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getBooks.pending, state => {
      console.log("PENDING");
      state.isLoading = true;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.content = action.payload;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.hasError = true;
      state.errorMessage = action.payload;
    });
    builder.addMatcher(getBooks.settled, state => {
      // questo è come se fosse il finally della promise,
      // ci permette di spegnere i caricamenti dopo una qualsisi eventualità (risoluzione positiva o negativa)
      state.isLoading = false;
    });
  }
});

// export const {  } = booksSlice.actions;
export default booksSlice.reducer;

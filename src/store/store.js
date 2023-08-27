/* eslint-disable no-unused-vars */
import { configureStore, createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    toogleLoading: (state, actions) => {
      return (state = !state);
    },
    
  },
});



const moviesSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    subscribemovies: (state, actions) => {
      return (state = actions.payload);
    },
    unsuscribemovies: (state, actions) => {
      return (state = "");
    },
  },
});

const tokenSlice = createSlice({
  name: "Token",
  initialState: null,
  reducers: {
    subscribeToken: (state, actions) => {
      return (state = actions.payload);
    },
    unsuscribeToken: (state, actions) => {
      return (state = "");
    },
  },
});
const userSlice = createSlice({
  name: "User",
  initialState: [],
  reducers: {
    subscribeUser: (state, actions) => {
      return (state = actions.payload);
    },
    unsuscribeUser: (state, actions) => {
      return (state = "");
    },
  },
});


const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    token: tokenSlice.reducer,
    movies: moviesSlice.reducer,
    user : userSlice.reducer,
  },
});

export default store;

export const { toogleLoading } = loadingSlice.actions;

export const { subscribemovies, unsuscribemovies } =
  moviesSlice.actions;

  export const { subscribeToken, unsuscribeToken } =
  tokenSlice.actions;

  export const { subscribeUser, unsuscribeUser } =
  userSlice.actions;

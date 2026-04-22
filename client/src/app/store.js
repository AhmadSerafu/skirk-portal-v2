import { configureStore } from "@reduxjs/toolkit";
import { charactersReducer } from "../features/characters/charactersSlice";
import { buildsReducer } from "../features/builds/buildsSlice";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    builds: buildsReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../functions/auth";
import datasetSlice from "../functions/dataset";

const store = configureStore({
    reducer: {
        authSlice,
        datasetSlice
    }
})

export default store
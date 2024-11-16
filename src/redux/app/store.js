import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../functions/auth";

const store = configureStore({
    reducer: {
        authSlice,
    }
})

export default store
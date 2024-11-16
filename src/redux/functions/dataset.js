import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const datasetSlice = createSlice({
    name: 'dataset',
    initialState,
    reducers: {
        setDataset: (state, action) => {
            return [...action.payload]
        }
    }
})

export const { setDataset } = datasetSlice.actions
export default datasetSlice.reducer
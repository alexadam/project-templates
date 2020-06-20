import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum FilterModes {
    ShowAll = "SHOW_ALL",
    ShowCompleted = "SHOW_COMPLETED",
    ShowActive = "SHOW_ACTIVE",
}

const initialState = FilterModes.ShowAll;

const visibilityFilterSlice = createSlice({
    name: 'visibilityFilter',
    initialState,
    reducers: {
        setVisibilityFilter(state, action: PayloadAction<FilterModes>) {
            return action.payload;
        }
    }
});


export const { setVisibilityFilter } = visibilityFilterSlice.actions;

export default visibilityFilterSlice.reducer;  
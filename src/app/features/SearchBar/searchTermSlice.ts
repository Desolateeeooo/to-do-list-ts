import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootState} from "../../store";

interface ISetSearchTerm {
    userInput: string;
}

interface IClearSearchTerm {
    clearInput: string;
}

const initialState: string = "";

const searchTermSlice = createSlice({
    name: "searchTerm",
    initialState: initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<ISetSearchTerm>) => {
            return action.payload.userInput;
        },
        clearSearchTerm: (state, action: PayloadAction<IClearSearchTerm>) => {
            return action.payload.clearInput;
        },
    }
});

export const {
    setSearchTerm,
    clearSearchTerm,
} = searchTermSlice.actions;
export default searchTermSlice.reducer;
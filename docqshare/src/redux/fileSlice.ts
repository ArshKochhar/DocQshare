import { createSlice } from "@reduxjs/toolkit";

export interface FileObj {
    id: string | null;
    file: File | null;
    hash: string | null;
    accessor: string[];
    owner: string | null;
}

export const initialState: FileObj = {
    id: null,
    file: null,
    hash: null,
    accessor: [],
    owner: null
};

export const FileSlice = createSlice({
    name: "FileSlice",
    initialState,
    reducers: {}
})

export default FileSlice.reducer;
export const { } = FileSlice.actions;
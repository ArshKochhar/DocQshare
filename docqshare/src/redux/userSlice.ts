import { createSlice } from "@reduxjs/toolkit";

export interface FileObj {
    id: string | null;
    name: string | null;
    payload: any | null;
    hash: string | null;
    accessor: string[];
    owner: string | null;
}

export interface User {
    id: string | null;
    walletId: string | null;
    userName: string | null;
    files: FileObj[];
    currentFile: FileObj;
}

export const initialState: User = {
    id: null,
    walletId: null,
    userName: null,
    files: [],
    currentFile: {
        id: null,
        name: null,
        payload: null,
        hash: null,
        accessor: [],
        owner: null,
    }
};

export const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        setUser: (state, { payload }: {payload:any}) => {
            state.id = payload.id;
            state.userName = payload.userName;
            state.walletId = payload.walletId;
            state.files = payload.files
        },
        setUserName: (state, { payload }: {payload:any}) => {
            state.userName = payload;
        },
        setWalletId: (state, { payload }: {payload:any}) => {
            state.walletId = payload;
        },
        addFileToList: (state, { payload }: {payload:any}) => {
            state.files = [...state.files, payload ];
        },
        removeFile: (state, { payload }: {payload:any}) => {
            state.files = state.files.filter((file) => file.id !== payload);
        },
        setCurrentFile: (state, { payload }: {payload:any}) => {
            state.currentFile.id = payload.id;
            state.currentFile.name = payload.name;
            state.currentFile.payload = payload.payload;
            state.currentFile.hash = payload.hash;
            state.currentFile.accessor = payload.accessor;
            state.currentFile.owner = payload.owner;
        },
        setCurrentFileAccessorList: (state, { payload }: { payload: any }) => {
            if (state.currentFile) state.currentFile.accessor = [...payload];
        },
        setCurrentFileName: (state, { payload }: { payload: any }) => {
            if (state.currentFile) state.currentFile.name = payload.name;
        }
    }
})

export default UserSlice.reducer;
export const { setUser, setUserName, setWalletId, addFileToList, removeFile, setCurrentFile, setCurrentFileAccessorList } = UserSlice.actions;
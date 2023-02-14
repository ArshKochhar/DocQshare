import { createSlice } from "@reduxjs/toolkit";

export interface FileObj {
    id: string | null;
    file: File | null;
    hash: string | null;
    accessor: string[];
    owner: string | null;
}

export interface User {
    id: string | null;
    walletId: string | null;
    userName: string | null;
    files: FileObj[];
}

export const initialState: User = {
    id: null,
    walletId: null,
    userName: null,
    files: []
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
        addFile: (state, { payload }: {payload:any}) => {
            state.files = [...state.files, payload ];
        },
        removeFile: (state, { payload }: {payload:any}) => {
            state.files = state.files.filter((file) => file.id !== payload);
        },
    }
})

export default UserSlice.reducer;
export const { setUser, setUserName, setWalletId, addFile, removeFile } = UserSlice.actions;
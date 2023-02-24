import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../api"

export const fetchAll = createAsyncThunk(
    'users/fetchAll',
    async (payload, thunkAPI) => await api.get('/')
    .then(res => res.data)  
    .catch(err => console.log(err))
)

export const fetchSingle = createAsyncThunk(
    'users/fetchSingleUser',
    async (payload, thunkAPI) => await api.get(`/${payload}`)
    .then(res => res.data)
    .catch(err => console.log(err))
)

export const saveUser = createAsyncThunk(
    'users/save',
    async (payload, thunkAPI) => await api.post(`/`, {...payload})
    .then(res => res.data)
    .catch(err => console.log(err))
)

export const removeUser = createAsyncThunk(
    'user/removeUser',
    async (payload, thunkAPI) => await api.delete(`/${payload}`)
    .then(res => res.data)
    .catch(err => console.log(err))
)

const initialState = {
    loading: false,
    users: [],
    user: null
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, actions) => {
            state.loading = false
            state.users = actions.payload.details
        })
        builder.addCase(fetchSingle.fulfilled, (state, actions) => {
            state.user = actions.payload
        })
        builder.addCase(removeUser.fulfilled, (state, actions) => {
            state.users = state.users.filter(user => user.id !== actions.meta.arg)
        })
    }
})

export default userSlice.reducer
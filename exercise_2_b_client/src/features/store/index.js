import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './reducers/modalSlice'
import userSlice from './reducers/userSlice'

const store = configureStore({
    reducer: {
        userReducer: userSlice,
        modalReducer: modalSlice
    }
})

export default store
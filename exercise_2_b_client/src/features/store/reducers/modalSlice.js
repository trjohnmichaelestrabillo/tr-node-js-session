import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isModalShow: false
}

export const modalSlice = createSlice({
    name:'modalSlice',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.isModalShow = !state.isModalShow
        }
    }
})


export const {toggleModal} = modalSlice.actions
export default modalSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { Others } from '../../utils/types';

const initialState: Others = {
    loading: false,
    toast: null,
    language: 'en',
    country: null,
    state: null,
    city: null
}

const OtherSlice = createSlice({
    name: 'Loading',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        showHideToast(state, action) {
            state.toast = action.payload;
        },
        setLanguage(state, action) {
            state.language = action.payload;
        },
        setCountry(state, action) {
            state.country = action.payload;
        },
        setState(state, action) {
            state.state = action.payload;
        },
        setCity(state, action) {
            state.city = action.payload;
        }
    }
})

export const { setLoading, showHideToast, setLanguage, setCountry, setState, setCity } = OtherSlice.actions
export default OtherSlice.reducer
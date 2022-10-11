import {createSlice, removeListener} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user : null,
    accessToken : null,
    refreshToken : null
}

const jwtSlice = createSlice({
    name : 'token',
    initialState,
    reducers : {
        setToken : (state, token) => {
            axios.defaults.headers.common['Jwt_Access_Token'] = token.payload.accessToken;

            return {
                user : token.payload.user,
                accessToken : token.payload.accessToken,
                refreshToken : token.payload.refreshToken
            }
        },
        deleteToken : (state) => {
            return initialState;
        },
        refresh : (state, data) => {   
            return data.payload;
        }
    }
});

export const jwtAction = jwtSlice.actions;

export default jwtSlice.reducer;
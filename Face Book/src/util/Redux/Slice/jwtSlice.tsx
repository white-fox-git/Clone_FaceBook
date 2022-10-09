import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
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
                accessToken : token.payload.accessToken,
                refreshToken : token.payload.refreshToken
            }
        },
        deleteToken : (state) => {
            return initialState;
        },
        refresh : (state, data) => {
            axios.post('http://localhost:9200/token', data.payload)
            .then((res) => {
                if(res.data.access == true)
                {
                    axios.defaults.headers.common['Jwt_Access_Token'] = res.data.accessToken;

                    return {
                        accessToken : res.data.accessToken,
                        refreshToken : res.data.refreshToken
                    }
                }
                else
                {
                    return initialState;
                }
            })
            .catch((error) => {
                console.log(error);
                return initialState;
            })
        }
    }
});

export const jwtAction = jwtSlice.actions;

export default jwtSlice.reducer;
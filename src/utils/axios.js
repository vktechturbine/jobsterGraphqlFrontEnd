import axios from 'axios'
import React from 'react'
import  {clearStore} from '../features/user/userSlice';

export const checkForUnauthorizedResponse =(error,thunkAPI) => {
    if(error.response.status === 401){
        thunkAPI.dispatch(clearStore());
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
};

const CustomFetch = axios.create({
    baseURL:'https://jobsterbackend-ozel.onrender.com',
    // baseURL:'http://localhost:3001',
})

export default CustomFetch
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomFetch from '../../utils/axios';
import { toast } from "react-toastify";
import { addUsertoLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from "../job/JobSlice";
// import { MdDoNotDisturbOnTotalSilence } from "react-icons/md";
const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI) => {
    // console.log(`Register User : ${JSON.stringify(user)}`);
    console.log(user);
    try {
        const graphqlQuery = {
            query: `
            mutation{
                createUser(userInput:{email:"${user.email}",name:"${user.name}",password:"${user.password}"}){
                    userId
                    name
                    email
                    location
                    lastName
                    token
                }
            }
        `
        }
        const resp = await CustomFetch.post('/graphql', JSON.stringify(graphqlQuery), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(resp.data)

        if (resp.data.data !== null) {
            return resp.data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});
export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) => {
    // console.log(`Login User : ${JSON.stringify(user)}`);
    const graphqlQuery = {
        query: `
        {
            login(email:"${user.email}",password:"${user.password}"){
                userId
                name
                email
                location
                lastName
                token
            }
        }
    `
    }
    try {
      
        const resp = await CustomFetch.post('/graphql', JSON.stringify(graphqlQuery),{
            headers:{
                'Content-Type': 'application/json'
              },
        });
        console.log("loginslice")
        console.log(resp.data);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})
export const updateUser = createAsyncThunk('user/updateUser', async (user, thunkAPI) => {

    // console.log(thunkAPI.getState().user.user.token);
    
    console.log(user);
    const graphqlQuery = {
        query:`
        mutation{
            updateuserProfiile(userInput:{email:"${user.email}",name:"${user.name}",lastName:"${user.lastName}",location:"${user.location}"}){
                name
                email
                location
                lastName
                token
                userId
            }
        }
        `
    }

    try {
        const resp = await CustomFetch.post('/graphql', JSON.stringify(graphqlQuery), {
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
                'Content-Type': 'application/json'

            },
        });
        return resp.data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('unAuthorized! Logging Out...')
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})
export const clearStore = createAsyncThunk('user/clearStore', async (message, thunkAPI) => {
    try {
        thunkAPI.dispatch(logoutUser(message));
        thunkAPI.dispatch(clearAllJobsState());
        thunkAPI.dispatch(clearValues())
        return Promise.resolve();
    } catch (error) {
        return Promise.reject();
    }
})
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state, { payload }) => {
            state.user = null;
            state.isSidebarOpen = false;
            // toast.success('Logout Successful! ')
            removeUserFromLocalStorage();
            if (payload) {
                toast.success(payload);
            }
        },
        toggleSidebar: (state) => {
            console.log(!state.isSidebarOpen)
            state.isSidebarOpen = !state.isSidebarOpen;

        },

    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, { payload }) => {
            const user = payload.data.createUser;
            state.isLoading = false;
            state.user = user;
            addUsertoLocalStorage(user);
            toast.success(`Hello There ${user.name}`);
        }).addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, { payload }) => {
            const user = payload.data.login;

            // console.log("userslice:");
            console.log(user);
            // console.log("end userslice:");
            state.isLoading = false,
                state.user = user;
            addUsertoLocalStorage(user);
            toast.success(`Welcome Back ${user.name}`)
        }).addCase(loginUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        }).addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateUser.fulfilled, (state, { payload }) => {
            const user = payload.data.updateuserProfiile;
            state.isLoading = false;
            state.user = user;
            addUsertoLocalStorage(user);
            toast.success("User Updated");
        }).addCase(updateUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        }).addCase(clearStore.rejected, () => {
            toast.error(`There Was an error`);
        })
    }
})
export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
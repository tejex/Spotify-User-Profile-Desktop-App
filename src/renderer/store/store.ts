import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
interface User {
    name: string;
    username: string;
    about?: string;
    avatar?: string;
    ranking: number;
    gitHub?: string;
    reputation: number;
    linkedIn?: string;
}

interface APIState {
    currentUser: string;
    loading: boolean;
    users: { [username: string]: User };
}

const initialState: APIState = {
    currentUser: '',
    loading: true,
    users: {},
};

const userSlice = createSlice({
    name: 'users', // More descriptive name
    initialState,
    reducers: {
        setLoading(state, action: { payload: boolean }) {
            state.loading = action.payload;
        },
        setCurrentUser(state, action: { payload: { username: string } }) {
            const { username } = action.payload;
            state.currentUser = username; // Add user data to the state
        },
        addUser(state, action: { payload: { username: string; data: User } }) {
            const { username, data } = action.payload;
            state.users[username] = data; // Add user data to the state
        },
        updateUser(
            state,
            action: { payload: { username: string; data: Partial<User> } },
        ) {
            const { username, data } = action.payload;
            state.users[username] = { ...state.users[username], ...data };
        },
    },
});

const selectUsers = (state: RootState) => state.users;
const selectLoading = (state: RootState) => state;

const userData = createSelector([selectUsers], (data) => {
    return data.users[data.currentUser];
});
const isLoading = createSelector([selectLoading], (data) => {
    return data.users.loading;
});

export { selectUsers, userData, User, isLoading };
export const { addUser, updateUser, setCurrentUser, setLoading } =
    userSlice.actions;

const store = configureStore({
    reducer: {
        users: userSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

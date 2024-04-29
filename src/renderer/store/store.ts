import { configureStore, createSlice } from '@reduxjs/toolkit'
import { UserProfileType } from '../components/UserProfilePage'
import { createSelector } from '@reduxjs/toolkit'

interface TokensState {
    accessToken: string
    refreshToken: string
    expiresIn: string
}
interface APIState {
    userData: UserProfileType | string
    tokens: TokensState
}

const initialState: APIState = {
    userData: {
        country: '',
        display_name: '',
        email: '',
        followers: {
            total: 0,
            hfref: null,
        },
        href: '',
        id: '',
        images: [{ url: '', height: 0, width: 0 }],
        product: '',
        type: '',
        uri: '',
    },
    tokens: {
        accessToken: '',
        refreshToken: '',
        expiresIn: '',
    },
}

const tokens = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setTokens(state, action) {
            state.tokens = action.payload
        },
        setUser(state, action: { payload: UserProfileType }) {
            state.userData = action.payload
        },
    },
})

const selectTokens = (state: RootState) => state.tokens
const selectUser = (state: RootState) => state.tokens.userData
export { selectTokens, selectUser }
export const { setTokens, setUser } = tokens.actions
const store = configureStore({
    reducer: {
        tokens: tokens.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

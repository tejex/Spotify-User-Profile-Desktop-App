import { configureStore, createSlice } from '@reduxjs/toolkit'
import { UserProfileType } from '../interfaces/interfaces'
import { userTemplate, tokensTemplate } from '../utils'

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
    userData: userTemplate,
    tokens: tokensTemplate,
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

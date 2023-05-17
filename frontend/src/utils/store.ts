import {configureStore} from "@reduxjs/toolkit"
import { login } from "../features/login"
import { modal } from "../features/modal"
import { user } from "../features/user"
import { conversation } from "../features/conversation"

export const store = configureStore({
    reducer: {
        login: login.reducer,
        modal: modal.reducer,
        user: user.reducer,
        conversation: conversation.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
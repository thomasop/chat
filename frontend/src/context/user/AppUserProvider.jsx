import { ReactNode, useReducer } from "react"
import AppUserContext from "./AppUserContext"
import AppUserReducer, { initState } from "./AppUserReducer";

const AppUserProvider = ({ children } ) => {
    const [state, dispatch] = useReducer(AppUserReducer, initState)

    return (
        <AppUserContext.Provider
        value={[ state, dispatch ]}
      >
        {children}
      </AppUserContext.Provider>
    );
}

export default AppUserProvider
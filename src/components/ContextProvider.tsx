import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import useAuth, { UserDetailsT } from "../hooks/useAuth";


interface ContextT {
    userDetails: UserDetailsT | null,
    setUserDetails: Dispatch<SetStateAction<UserDetailsT | null>> | null,
}


const initialContext: ContextT = {
    userDetails: null,
    setUserDetails: () => {},
}


export const AppContext = createContext<ContextT>(initialContext);


interface Props {
    children: ReactNode
}


const ContextProvider = ({ children }: Props) => {
    const [userDetails, setUserDetails] = useAuth();
    const context: ContextT = { userDetails, setUserDetails };
    
    return (
        <AppContext.Provider value={ context }>
            { children }
        </AppContext.Provider>
    );
};


export default ContextProvider;
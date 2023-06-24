import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import useClicks from "../hooks/useClicks";
import useAuth, { UserDetailsT } from "../hooks/useAuth";

//----------------------------------------------------------------------------------------------------------------------
export interface CountsT { red: number, blue: number };
export const initialCounts: CountsT = { red: 0, blue: 0 }

//----------------------------------------------------------------------------------------------------------------------
export interface AppContextT {
    userDetails: UserDetailsT | null,
    loading: boolean,
    counts: CountsT,
    userCounts: CountsT,
    redClicks: number,
    blueClicks: number,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setCounts: Dispatch<SetStateAction<CountsT>>
    setUserCounts: Dispatch<SetStateAction<CountsT>>
    setRedClicks: Dispatch<SetStateAction<number>>,
    setBlueClicks: Dispatch<SetStateAction<number>>,
};

const initialAppContext: AppContextT = {
    userDetails: null,
    loading: false,
    counts: initialCounts,
    userCounts: initialCounts,
    redClicks: 0,
    blueClicks: 0,
    setLoading: () => {},
    setCounts: () => {},
    setUserCounts: () => {},
    setRedClicks: () => {},
    setBlueClicks: () => {},
};

export const AppContext = createContext<AppContextT>(initialAppContext);

//----------------------------------------------------------------------------------------------------------------------
interface ContextProviderProps {
    children: ReactNode,
};

const ContextProvider = ({ children }: ContextProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [counts, setCounts] = useState<CountsT>(initialCounts);
    const [userCounts, setUserCounts] = useState<CountsT>(initialCounts);

    const userDetails = useAuth();
    const [redClicks, setRedClicks] = useClicks('red', userDetails, setCounts, setUserCounts);
    const [blueClicks, setBlueClicks] = useClicks('blue', userDetails, setCounts, setUserCounts);

    const value = {
        userDetails,
        loading,
        counts,
        userCounts,
        redClicks,
        blueClicks,
        setLoading,
        setCounts,
        setUserCounts,
        setRedClicks,
        setBlueClicks
    };

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    );
};

export default ContextProvider;

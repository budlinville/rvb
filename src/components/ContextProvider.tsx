import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import useClicks from "../hooks/useClicks";

//----------------------------------------------------------------------------------------------------------------------
export interface CountsT { red: number, blue: number };
export const initialCounts: CountsT = { red: 0, blue: 0 }

//----------------------------------------------------------------------------------------------------------------------
export interface AppContextT {
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
    const [redClicks, setRedClicks] = useClicks('red');
    const [blueClicks, setBlueClicks] = useClicks('blue');

    const value = {
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

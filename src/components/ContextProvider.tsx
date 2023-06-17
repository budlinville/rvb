import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

//----------------------------------------------------------------------------------------------------------------------
export interface CountsT { red: number, blue: number };
export const initialCounts: CountsT = { red: 0, blue: 0 }

//----------------------------------------------------------------------------------------------------------------------
export interface AppContextT {
    loading: boolean,
    counts: CountsT,
    redClicks: number,
    blueClicks: number,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setCounts: Dispatch<SetStateAction<CountsT>>
    setRedClicks: Dispatch<SetStateAction<number>>,
    setBlueClicks: Dispatch<SetStateAction<number>>,
};

const initialAppContext: AppContextT = {
    loading: false,
    counts: initialCounts,
    redClicks: 0,
    blueClicks: 0,
    setLoading: () => {},
    setCounts: () => {},
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
    const [redClicks, setRedClicks] = useState<number>(0);
    const [blueClicks, setBlueClicks] = useState<number>(0);

    const value = { loading, counts, redClicks, blueClicks, setLoading, setCounts, setRedClicks, setBlueClicks };

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    );
};

export default ContextProvider;

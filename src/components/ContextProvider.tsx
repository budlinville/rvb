import { ReactNode, createContext, useEffect, useState } from "react";

import API from '../api';
import RVB_API from '../api/sources';


//----------------------------------------------------------------------------------------------------------------------
interface CountsT {
    red: number,
    blue: number,
};

const initialCounts: CountsT = { red: 0, blue: 0 }


//----------------------------------------------------------------------------------------------------------------------
interface ContextT {
    counts: CountsT,
    loading: boolean,
    setCounts: (counts: CountsT) => void,
    setLoading: (loading: boolean) => void,
}

const initialContext: ContextT = {
    counts: initialCounts,
    loading: false,
    setCounts: () => {},
    setLoading: () => {},
}

export const AppContext = createContext<ContextT>(initialContext);


//----------------------------------------------------------------------------------------------------------------------
const TEN_SECONDS = 5000;

interface Props {
    children: ReactNode
}

const ContextProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState(false);
    const [counts, setCounts] = useState<CountsT>(initialCounts);

    const context: ContextT = { counts, loading, setCounts, setLoading };

    useEffect(() => {
        const fetchClicks = async () => {
            const response = await API.get(RVB_API, '/rvb/clicks');
            setCounts(response.counts)
        };

        fetchClicks();
        const clickIntervalId = setInterval(fetchClicks, TEN_SECONDS)
        return () => clearInterval(clickIntervalId)
    }, []);
    
    return (
        <AppContext.Provider value={ context }>
            { children }
        </AppContext.Provider>
    );
};


export default ContextProvider;
import { ReactNode, useContext, useEffect } from "react";

import API from '../api';
import RVB_API from "../api/sources";
import useAuth from "../hooks/useAuth";
import { AppContext, AppContextT } from "./ContextProvider";


const TEN_SECONDS = 3000;

interface Props {
    children: ReactNode,
}

const CountFetcher = ({ children }: Props) => {
    const [userDetails, _] = useAuth();
    const { counts, setCounts } = useContext<AppContextT>(AppContext)

    useEffect(() => {
        const fetchClicks = async () => {
            const response = await API.get(RVB_API, '/rvb/clicks/global', { userDetails });
            if (response?.counts) {
                const { red, blue } = response?.counts;
                if (red !== counts.red || blue !== counts.blue)
                    setCounts({ red, blue })
            }
        };

        fetchClicks();
        const clickIntervalId = setInterval(fetchClicks, TEN_SECONDS)
        return () => clearInterval(clickIntervalId)
    }, [counts, setCounts]);

    return <>{ children }</>;
};


export default CountFetcher;
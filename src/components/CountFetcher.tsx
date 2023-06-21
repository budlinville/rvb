import { ReactNode, useContext, useEffect } from "react";

import API from '../api';
import RVB_API from "../api/sources";
import useAuth from "../hooks/useAuth";
import { AppContext, AppContextT } from "./ContextProvider";


const TEN_SECONDS = 10000;

interface Props {
    children: ReactNode,
}

const CountFetcher = ({ children }: Props) => {
    const [userDetails, _] = useAuth();
    const { counts, userCounts, setCounts, setUserCounts } = useContext<AppContextT>(AppContext)

    useEffect(() => {
        const fetchClicks = async () => {
            try {
                const response = await API.get(RVB_API, `/rvb/clicks/user/${userDetails?.username || null}`);
                if (response?.counts) {
                        if (response?.counts?.global) {
                            const { red: globalRed, blue: globalBlue } = response?.counts.global;
                            if (globalRed !== counts.red || globalBlue !== counts.blue)
                                setCounts({ red: globalRed, blue: globalBlue });
                        }

                        if (response?.counts?.user) {
                            const { red: userRed, blue: userBlue } = response?.counts.user;
                            if (userRed !== userCounts.red || userBlue !== userCounts.blue)
                                setUserCounts({ red: userRed, blue: userBlue });
                        }

                }
            } catch (e) {
                console.log(e)
            }
        };

        fetchClicks();
        const clickIntervalId = setInterval(fetchClicks, TEN_SECONDS)
        return () => clearInterval(clickIntervalId)
    }, [counts, setCounts]);

    return <>{ children }</>;
};


export default CountFetcher;
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

import { post } from "../api";
import RVB_API from "../api/sources";
import { ColorT } from "../components/pages/Home/Button";
import useAuth, { UserDetailsT } from "./useAuth";
import { AppContext } from "../components/ContextProvider";


const ONE_SECOND = 1000;


interface RvbClickT {
    clicks: number,
    userDetails: UserDetailsT
}


const useClicks = (color: ColorT): [number, Dispatch<SetStateAction<number>>] => {
    const [userDetails, _] = useAuth();
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [clicks, setClicks] = useState<number>(0);
    const { setCounts } = useContext(AppContext);

    const path = `/rvb/click/${color}`

    useEffect(() => {
        const postClicks = async (clicks: number) => {
            if (clicks) {
                const response = await post(RVB_API, path, { userDetails, clicks } as RvbClickT);
                console.log(response)
                if (response?.global?.red && response?.global?.blue) {
                    console.log(response.global)
                    const { red, blue } = response.global;
                    setCounts({ red, blue });
                }
                setClicks(0);
            }
        }

        clearTimeout(timer as NodeJS.Timeout);
        setTimer(setTimeout(() => postClicks(clicks), ONE_SECOND));
        return () => clearTimeout(timer as NodeJS.Timeout);
    }, [clicks, setClicks]);

    return [clicks, setClicks];
}

export default useClicks;

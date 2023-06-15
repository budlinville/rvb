import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { post } from "../api";
import RVB_API from "../api/sources";
import { ButtonT } from "../components/common/Button";
import useAuth, { UserDetailsT } from "./useAuth";


const ONE_SECOND = 1000;


interface RvbClickT {
    clicks: number,
    userDetails: UserDetailsT
}


const useClicks = (type: ButtonT): [number | null, Dispatch<SetStateAction<number>>] => {
    const [userDetails, _] = useAuth();
    const [clicks, setClicks] = useState<number>(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const path = `/rvb/click/${type}`

    const postClicks = async (clicks: number) => {
        if (clicks) {
            console.log(`POSTING: ${clicks}`);
            const response = await post(RVB_API, path, { userDetails, clicks } as RvbClickT);
            setClicks(0);
            console.log(response)
        }
    }

    useEffect(() => {
        clearTimeout(timer as NodeJS.Timeout);
        setTimer(setTimeout(() => postClicks(clicks), ONE_SECOND));
        return () => clearTimeout(timer as NodeJS.Timeout);
    }, [clicks]);

    return [clicks, setClicks]
}

export default useClicks;
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

import { post } from "../api";
import RVB_API from "../api/sources";
import { ColorT } from "../components/common/Button";
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
    const { redClicks, setRedClicks, blueClicks, setBlueClicks } = useContext(AppContext);

    const isRed = color === 'red';
    const clicks = isRed ? redClicks : blueClicks;
    const setClicks = isRed ? setRedClicks : setBlueClicks;
    const path = `/rvb/click/${color}`

    useEffect(() => {
        const postClicks = async (clicks: number) => {
            if (clicks) {
                setClicks(0);
                await post(RVB_API, path, { userDetails, clicks } as RvbClickT);
            }
        }

        clearTimeout(timer as NodeJS.Timeout);
        setTimer(setTimeout(() => postClicks(clicks), ONE_SECOND));
        return () => clearTimeout(timer as NodeJS.Timeout);
    }, [clicks]);

    return [clicks, setClicks]
}

export default useClicks;

import { useEffect, useState } from "react";


const MOBILE_SCREEN_WIDTH = 600;
const APP_BAR_HEIGHT_MOBILE = 56;  // Must be >= 56 (MUI Restriction)
const APP_BAR_HEIGHT_WEB = 64;     // Must be >= 64 (MUI Restriction)


const getHeaderHeight = (screenWidth: number) => screenWidth > MOBILE_SCREEN_WIDTH ? APP_BAR_HEIGHT_WEB : APP_BAR_HEIGHT_MOBILE;


const useHeaderHeight = () => {
    const [height, setHeight] = useState<number>(getHeaderHeight(window.innerWidth));

    useEffect(() => {
        const handleResize = () => setHeight(getHeaderHeight(window.innerWidth));
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return height;
};


export default useHeaderHeight;
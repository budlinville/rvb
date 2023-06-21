import { ReactNode, useEffect, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

import { DARK_MODE } from "../../local-storage/keys";

import classes from './background.module.css';


interface Props {
    children: ReactNode;
}


const Background = ({ children }: Props) => {
    const [isDarkMode, _] = useLocalStorage(DARK_MODE, false);

    const white1 = '#fbfcf8';
    const white2 = '#fffefc';
    const white3 = '#fafafa';
    const white4 = '#fbfcfa';

    const black1 = '#37373d';
    const black2 = '#262626';
    const black3 = '#1f1f1f';
    const black4 = '#181818';

    const red = useMemo(() => getComputedStyle(document.body).getPropertyValue('--RED'), []);
    const blue = useMemo(() => getComputedStyle(document.body).getPropertyValue('--BLUE'), []);

    document.body.style.setProperty('--BACKGROUND-COLOR-1', blue);
    document.body.style.setProperty('--BACKGROUND-COLOR-6', red);

    useEffect(() => {
        if (isDarkMode) {
            document.body.style.setProperty('--BACKGROUND-COLOR-2', black1);
            document.body.style.setProperty('--BACKGROUND-COLOR-3', black2);
            document.body.style.setProperty('--BACKGROUND-COLOR-4', black3);
            document.body.style.setProperty('--BACKGROUND-COLOR-5', black4);
        } else {
            document.body.style.setProperty('--BACKGROUND-COLOR-2', white1);
            document.body.style.setProperty('--BACKGROUND-COLOR-3', white2);
            document.body.style.setProperty('--BACKGROUND-COLOR-4', white3);
            document.body.style.setProperty('--BACKGROUND-COLOR-5', white4);
        }

    }, [isDarkMode]);

    return (
        <div className={classes.background}>
            { children }
        </div>
    )
};

export default Background;
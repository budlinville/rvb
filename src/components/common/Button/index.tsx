import { ReactNode, useEffect, useState } from 'react';

import useAuth, { UserDetailsT } from '../../../hooks/useAuth';
import { post } from '../../../api';
import RVB_API from '../../../api/sources';

import classes from './button.module.css';
import clickSound from '/click.mp3';

export type ButtonT = 'red' | 'blue';


const audio = new Audio(clickSound);
const ONE_SECOND = 1000;

interface ButtonProps {
    children: ReactNode;
    type: ButtonT;
};

interface RvbClickT {
    clicks: number,
    userDetails: UserDetailsT
}

const Button = ({ children, type }: ButtonProps) => {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [clicks, setClicks] = useState<number>(0);
    const [userDetails, _] = useAuth();

    const path = `/rvb/click/${type}`
    const colorClassName = type === 'red' ? classes.red : classes.blue;
    
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

    const onMouseDownHandler = async () => {
        audio.play();
        setClicks(prev => ++prev);
    };

    return (
        <button className={classes.pushable} onMouseDown={onMouseDownHandler}>
            <span className={`${ classes.shadow } ${ colorClassName }`} />
            <span className={`${ classes.edge } ${ colorClassName }`} />
            <span className={`${ classes.front } ${ colorClassName }`}>
                <div className={`${ classes.textContainer } ${ colorClassName }`}>
                    { children }
                </div>
            </span>
        </button>
    );
};

export default Button;
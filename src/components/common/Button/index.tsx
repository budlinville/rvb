import { ReactNode, useEffect, useState } from 'react';

import useAuth, { UserDetailsT } from '../../../hooks/useAuth';
import { post } from '../../../api';
import RVB_API from '../../../api/sources';

import classes from './button.module.css';
import clickSound from '/click.mp3';
import useClicks from '../../../hooks/useClicks';

export type ButtonT = 'red' | 'blue';


const audio = new Audio(clickSound);

interface ButtonProps {
    children: ReactNode;
    type: ButtonT;
};

const Button = ({ children, type }: ButtonProps) => {
    const [_, setClicks] = useClicks(type);

    const colorClassName = type === 'red' ? classes.red : classes.blue;

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
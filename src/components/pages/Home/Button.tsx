import { ReactNode } from 'react';

import classes from './home.module.css';
import clickSound from '/click.mp3';

export type ButtonT = 'red' | 'blue';


const audio = new Audio(clickSound);


interface ButtonProps {
    children: ReactNode;
    type: ButtonT;
};

const Button = ({ children, type }: ButtonProps) => {
    const colorClassName = type === 'red' ? classes.red : classes.blue;

    const onMouseDownHandler = () => {
        audio.play();
    };

    return (
        <button className={classes.pushable} onMouseDown={onMouseDownHandler}>
            <span className={classes.shadow} />
            <span className={`${classes.edge} ${colorClassName}`} />
            <span className={`${classes.front} ${colorClassName}`}>
                { children }
            </span>
        </button>
    );
};

export default Button;
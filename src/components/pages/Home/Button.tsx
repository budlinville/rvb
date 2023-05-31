import { ReactNode } from 'react';
import classes from './home.module.css';

export type ButtonT = 'red' | 'blue';

interface ButtonProps {
    children: ReactNode;
    type: ButtonT;
};

const Button = ({ children, type }: ButtonProps) => {
    const colorClassName = type === 'red' ? classes.red : classes.blue;
    return (
        <button className={classes.pushable}>
            <span className={classes.shadow} />
            <span className={`${classes.edge} ${colorClassName}`} />
            <span className={`${classes.front} ${colorClassName}`}>
                { children }
            </span>
        </button>
    );
};

export default Button;
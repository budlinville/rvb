import { ReactNode } from 'react';
import classes from './home.module.css';

export type ButtonT = 'red' | 'blue';

interface ButtonProps {
    children: ReactNode;
};

const Button = ({ children }: ButtonProps) => {
    return (
        <button className={classes.pushable}>
            <span className={classes.shadow} />
            <span className={classes.edge} />
            <span className={classes.front}>
                { children }
            </span>
        </button>
    );
};

export default Button;
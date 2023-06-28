import { ReactNode, useRef } from 'react';

import classes from './button.module.css';
import clickSound from '/click.mp3';


export type ColorT = 'red' | 'blue';

const audio = new Audio(clickSound);


interface ButtonProps {
    children: ReactNode;
    color: ColorT;
    onClick: () => void;
};

const Button = ({ children, color, onClick }: ButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const colorClassName = color === 'red' ? classes.red : classes.blue;

    const onMouseDownHandler = async () => {
        audio.play();
        onClick();
    };

    return (
        <button ref={buttonRef} className={classes.pushable} onMouseDown={onMouseDownHandler}>
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
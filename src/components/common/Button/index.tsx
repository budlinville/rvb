import { ReactNode } from 'react';

import classes from './button.module.css';
import clickSound from '/click.mp3';
import useClicks from '../../../hooks/useClicks';


export type ColorT = 'red' | 'blue';

const audio = new Audio(clickSound);


interface ButtonProps {
    children: ReactNode;
    color: ColorT;
};

const Button = ({ children, color }: ButtonProps) => {
    const [_, setClicks] = useClicks(color);

    const colorClassName = color === 'red' ? classes.red : classes.blue;

    const onMouseDownHandler = async () => {
        audio.play();
        setClicks((prev: number) => ++prev);
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
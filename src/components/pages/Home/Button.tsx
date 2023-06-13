import { ReactNode } from 'react';
import { API } from 'aws-amplify';

import classes from './home.module.css';
import clickSound from '/click.mp3';
import useAuth from '../../../hooks/useAuth';


export type ButtonT = 'red' | 'blue';


const audio = new Audio(clickSound);
const RVB_API = 'rvbApi';
const PATH = '/rvb/click'

interface ButtonProps {
    children: ReactNode;
    type: ButtonT;
};

const Button = ({ children, type }: ButtonProps) => {
    const [userDetails, _] = useAuth();
    console.log(userDetails)
    const colorClassName = type === 'red' ? classes.red : classes.blue;

    const onMouseDownHandler = async () => {
        audio.play();

        const response = await API.post(RVB_API, PATH, { body: { userDetails }});
        console.log(response);
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
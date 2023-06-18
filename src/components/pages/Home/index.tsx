import { useContext } from "react";

import Button from "./Button";
import { AppContext } from "../../ContextProvider";

import classes from './home.module.css';

const Home = () => {
    const { setRedClicks, setBlueClicks } = useContext(AppContext);

    return (
        <div className={classes.buttonContainer}>
            <Button color='red' onClick={() => setRedClicks((prev: number) => ++prev)}> Red Team </Button>
            <Button color='blue' onClick={() => setBlueClicks((prev: number) => ++prev)}> Blue Team </Button>
        </div>
    );
}


export default Home;
export const HOME_PATH = '/';

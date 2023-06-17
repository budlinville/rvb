import Button from "../../common/Button";

import classes from './home.module.css';


const Home = () => {
    return (
        <div className={classes.buttonContainer}>
            <Button color='red'> Red Team </Button>
            <Button color='blue'> Blue Team </Button>
        </div>
    );
}


export default Home;
export const HOME_PATH = '/';

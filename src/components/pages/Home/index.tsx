import Button from "./Button";

import classes from './home.module.css';


interface HomeProps {

}

const Home = ({ }: HomeProps) => {
    return (
        <div className={classes.buttonContainer}>
            <Button type='red'> Red Team </Button>
            <Button type='blue'> Blue Team </Button>
        </div>
    );
}

export default Home;
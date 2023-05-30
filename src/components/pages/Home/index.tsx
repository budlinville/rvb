import Button from "./Button";

import classes from './home.module.css';

interface HomeProps {
    
}
 
const Home = ({ }: HomeProps) => {
    return ( 
        <div className={classes.buttonContainer}>
            <Button />
            <Button />
        </div>
    );
}
 
export default Home;
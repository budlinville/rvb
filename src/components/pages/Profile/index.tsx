import { CSSProperties, useContext } from "react";

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

import { AppContext } from "../../ContextProvider";


import classes from './profile.module.css';


enum TeamT {
    red='RED',
    blue='BLUE',
    neutral='NEUTRAL',
};


const getTeam = (red: number, blue: number): {team: TeamT, opposition: TeamT | null} => {
    if (red > blue) return { team: TeamT.red, opposition: TeamT.blue };
    if (blue > red) return { team: TeamT.blue, opposition: TeamT.red };
    return { team: TeamT.neutral, opposition: null };
};


const NeutralTeamInfo = ({style}: { style: CSSProperties}) => {
    return (
        <div className={classes.teamInfoContainer} style={style}>
            <Typography variant='h6'>
                You have yet to commit yourself to a side.
            </Typography>
            <Typography variant='body1'>
                Listen up, my friend. Neutrality might seem like a safe haven, a cozy spot where you can avoid the chaos and conflict of taking a stand. But let me tell you, it's a slippery slope that leads to a bland existence. Picture yourself in a sea of opinions, surrounded by people who are passionately debating and defending their beliefs. And what do you do? You choose neutrality. You become the Switzerland of the conversation, the beige wallpaper in a room full of vibrant personalities. Where's the fun in that? Taking a side is like strapping yourself into a roller coaster—terrifying, exhilarating, and definitely not for the faint-hearted. Sure, there might be disagreements, occasional heated arguments, and the occasional awkward family dinner, but hey, at least you're part of the action. Neutrality, on the other hand, is like trying to dance to a beat that doesn't exist. You're left standing alone on the dance floor, awkwardly shuffling your feet while others waltz and tango to the rhythm of life. So, my friend, shed that cloak of neutrality and dive headfirst into the vibrant world of opinions and convictions. Embrace the exhilaration, the camaraderie, and yes, even the occasional intellectual battles. Life is too short to be a wallflower. So, pick a side, let your voice be heard, and join the wild ride of passionate existence. And hey, if all else fails, at least you'll have some great stories to tell at parties.
            </Typography>
        </div>
    );
}


interface TeamInfoProps { red: number, blue: number }
const TeamInfo = ({ red, blue }: TeamInfoProps) => {
    const colorMappings = {
        [`${TeamT.red}`]: getComputedStyle(document.body).getPropertyValue('--RED'),
        [`${TeamT.blue}`]: getComputedStyle(document.body).getPropertyValue('--BLUE'),
        [`${TeamT.neutral}`]: '#ccc',
    };

    const { team, opposition } = getTeam(red, blue);
    const color = colorMappings[team];

    const style={
        border: `2px solid ${color}`,
        background: `linear-gradient(to bottom, ${color} -50%, transparent 200%)`
    };

    if (team === TeamT.neutral) {
        return <NeutralTeamInfo style={style}/>
    }

    const count = team === TeamT.red ? red : blue;
    const oppositionCount = opposition === TeamT.red ? red : blue;

    // const oppositionColor = colorMappings[opposition as TeamT];
    
    return (
        <div className={classes.teamInfoContainer} style={style}>
            <Typography variant='h6'> You are a proud member of the {team} team, with {count} total clicks.</Typography>
            <br />
            <Typography variant='body1'>
                { oppositionCount === 0 
                    ? `You've managed to resist the temptations of that sniveling ${opposition} team. Keep up the good work!`
                    : `You've leant yourself to the dark side with ${oppositionCount} clicks towards that sniveling ${opposition} team. While your infelity has not gone unnoticed, it can be forgiven. You had better get to clicking!`
                }
            </Typography>
            {/* <LineGraph data={lineData} height={400} width={ onMobile ? 600 : '80%' } /> */}
        </div>
    );
}


const Profile = () => {
    const { userDetails, userCounts } = useContext(AppContext);
    
    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Typography variant='h4' component='div'> { userDetails?.email } </Typography>
                <Typography variant='h6' component='div'> ( { userDetails?.username } ) </Typography>
                <Divider sx={{ my: 2 }}/>
                <TeamInfo red={userCounts?.red} blue={userCounts?.blue}/>
            </Box>
        </Container>
    );
};

export default Profile;
export const PROFILE_PATH = '/profile';
import { ReactElement } from 'react';
import { Slide, useScrollTrigger } from '@mui/material';


interface HideOnScrollProps {
    enable: boolean;
    children: ReactElement;
}


const HideOnScroll = ({
    enable,
    children
}: HideOnScrollProps) => {
    if (!enable)
        return children;

    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            { children }
        </Slide>
    );
}


export default HideOnScroll;
import { ReactElement, RefObject } from 'react';
import { Box, Fade, useScrollTrigger } from '@mui/material';


const SCROLL_TOP_OFFSET = 16;


interface ScrollTopProps {
    children: ReactElement;
    headerRef: RefObject<HTMLDivElement>;
}


function ScrollTop({
    children,
    headerRef
}: ScrollTopProps) {
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });

    const handleClick = () => headerRef?.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });

    return (
        <Fade in={ trigger }>
            <Box
                onClick={ handleClick }
                role='presentation'
                sx={{ position: 'fixed', bottom: SCROLL_TOP_OFFSET, right: SCROLL_TOP_OFFSET }}
            >
                { children }
            </Box>
        </Fade>
    );
}


export default ScrollTop;
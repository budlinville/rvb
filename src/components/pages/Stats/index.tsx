import { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

import API from '../../../api';
import RVB_API from "../../../api/sources";
import LineGraph, { ClickDataT, formatLineData, HourlyClicksT } from "../../common/graphs/LineGraph";
import { AppContext } from "../../ContextProvider";

import useWindowWidth from "../../../hooks/useWindowWidth";
import useWindowHeight from "../../../hooks/useWindowHeight";
import PieChart, { formatPieData } from "../../common/graphs/PieChart";

import classes from './stats.module.css';

const Stats = () => {
    const [lineData, setLineData] = useState<ClickDataT[]>([]);
    const { counts } = useContext(AppContext);

    const pieData = formatPieData(counts);

    const windowWidth = useWindowWidth();
    const windowHeight = useWindowHeight();

    const onMobile = windowHeight > windowWidth;

    useEffect(() => {
        const fetchHourlyClicks = async () => {
            try {
                const response: { clicks_hourly: HourlyClicksT } = await API.get(RVB_API, `/rvb/clicks/hourly`);
                setLineData(formatLineData(response.clicks_hourly, counts));
            } catch (e) {
                console.log(e)
            }
        };
        fetchHourlyClicks();
    }, [counts]);

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Typography variant="h3" component="div"> Stats </Typography>
                <Divider />

                <Typography variant='h5'>Red VS Blue</Typography>
                <Divider />
                <div className={classes.pieChartContainer}>
                    <PieChart data={pieData} height={300} />
                </div>

                <Divider />
                <Typography variant='h5'>Over time...</Typography>
                <Divider />
                <div className={classes.lineGraphContainer}>
                    <LineGraph data={lineData} height={400} width={ onMobile ? 600 : '80%' } />
                </div>
                <div style={{ height: '2rem' }}/>
            </Box>
        </Container>
    );
};

export default Stats;
export const STATS_PATH = '/stats';

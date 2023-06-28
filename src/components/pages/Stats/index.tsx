import { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

import API from '../../../api';
import RVB_API from "../../../api/sources";
import LineGraph, { ClickDataT } from "../../common/graphs/LineGraph";
import { AppContext, CountsT } from "../../ContextProvider";

import useWindowWidth from "../../../hooks/useWindowWidth";
import useWindowHeight from "../../../hooks/useWindowHeight";
import PieChart from "../../common/graphs/PieChart";

import classes from './stats.module.css';
import { count } from "console";


interface HourlyClicksT {
    [epochTs: number]: {
        red: number,
        blue: number
    }
};

const formatLineData = (hourlyClicks: HourlyClicksT, currentCounts: CountsT): ClickDataT[] => {
    // Format historical data
    const data = Object.entries(hourlyClicks).reduce<ClickDataT[]>((acc, [ts, clicks]) => {
        const dataItem: ClickDataT = {
            ts: Number(ts),
            redClicks: clicks?.red,
            blueClicks: clicks?.blue,
        }
        acc.push(dataItem);
        return acc;
    }, [] as ClickDataT[]);
    data.sort((a,b) => a.ts - b.ts);

    // Add current click data
    if (currentCounts?.red && currentCounts?.blue) {
        const currentClickData: ClickDataT = {
            ts: new Date().getTime(),
            redClicks: currentCounts?.red,
            blueClicks: currentCounts?.blue,
        }
        data.push(currentClickData);
    }

    return data;
}

const formatPieData = (counts: CountsT) => {
    return Object.entries(counts).map(([key, value]) => ({
        name: key,
        value,
        color: key,
    }));
}

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

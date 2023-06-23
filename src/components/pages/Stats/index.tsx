import { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

import API from '../../../api';
import RVB_API from "../../../api/sources";
import LineGraph, { ClickDataT } from "../../common/graphs/LineGraph";
import { AppContext, CountsT } from "../../ContextProvider";

import classes from './stats.module.css';


interface HourlyClicksT {
    [epochTs: number]: {
        red: number,
        blue: number
    }
};

const formatData = (hourlyClicks: HourlyClicksT, currentCounts: CountsT): ClickDataT[] => {
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


const Stats = () => {
    const [data, setData] = useState<ClickDataT[]>([]);
    const { counts } = useContext(AppContext);

    useEffect(() => {
        const fetchHourlyClicks = async () => {
            try {
                const response: { clicks_hourly: HourlyClicksT } = await API.get(RVB_API, `/rvb/clicks/hourly`);
                setData(formatData(response.clicks_hourly, counts));
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
                <div className={classes.chartContainer}>
                    <LineGraph data={data} height={400} width='80%' />
                </div>
            </Box>
        </Container>
    );
};

export default Stats;
export const STATS_PATH = '/stats';

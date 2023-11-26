import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { useLocalStorage } from "usehooks-ts";

import { DARK_MODE } from "../../../local-storage/keys";
import { CountsT } from "../../ContextProvider";

//----------------------------------------------------------------------------------------------------------------------
// Type Definitions
//----------------------------------------------------------------------------------------------------------------------
export interface ClickDataT {
    ts: number  // epoch time,
    redClicks: number,
    blueClicks: number,
}

export interface HourlyClicksT {
    [epochTs: number]: {
        red: number,
        blue: number
    }
};


//----------------------------------------------------------------------------------------------------------------------
// Data Formatter
//----------------------------------------------------------------------------------------------------------------------
export const formatLineData = (hourlyClicks: HourlyClicksT, currentCounts: CountsT): ClickDataT[] => {
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

//----------------------------------------------------------------------------------------------------------------------
// Component
//----------------------------------------------------------------------------------------------------------------------
interface Props {
    data: ClickDataT[],
    height: number | string,
    width: number | string,
}

const LineGraph = ({ data, height, width }: Props) => {
    const [isDarkMode, _] = useLocalStorage(DARK_MODE, false);


    const RED = getComputedStyle(document.documentElement).getPropertyValue('--RED');
    const BLUE = getComputedStyle(document.documentElement).getPropertyValue('--BLUE');

    const labelFormatter = (label: number) => {
        if (label === data[data.length - 1].ts) {
            return "Current";
        }
        return new Date(label)?.toLocaleString()
    }

    const tooltipStyle = isDarkMode
        ? { backgroundColor: '#222', color: '#fff', border: '1px solid #fff', borderRadius: '0.5rem' }
        : { backgroundColor: '#fff', color: '#333', border: '1px solid #333', borderRadius: '0.5rem' };

    return (
        <ResponsiveContainer height={height} width={width}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis hide={true} dataKey='ts' type='number' scale='time' domain={['auto', 'auto']} />
                <YAxis orientation="right"/>
                <Tooltip labelFormatter={labelFormatter} contentStyle={tooltipStyle} />
                {/* <Legend /> */}
                <Line type='monotone' dataKey='redClicks' stroke={RED} name='Red' dot={false} />
                <Line type='monotone' dataKey='blueClicks' stroke={BLUE} name='Blue' dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineGraph;
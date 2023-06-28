import { PieChart, Pie, Tooltip, Cell } from "recharts";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { CountsT } from "../../ContextProvider";

//----------------------------------------------------------------------------------------------------------------------
// Type Definitions
//----------------------------------------------------------------------------------------------------------------------
interface DataT {
    name: string,
    value: number,
    color: string,
}

//----------------------------------------------------------------------------------------------------------------------
// Data Formatter
//----------------------------------------------------------------------------------------------------------------------
export const formatPieData = (counts: CountsT) => {
    return Object.entries(counts).map(([key, value]) => ({
        name: key,
        value,
        color: key,
    }));
}


//----------------------------------------------------------------------------------------------------------------------
// Component
//----------------------------------------------------------------------------------------------------------------------
interface Props {
    data: DataT[],
    height: number,
}

const RvbPieChart = ({ data, height }: Props) => {
    const width = useWindowWidth() * 0.8;
    return (
        <div style={{ overflow: "hidden", width: '100%' }}>
        <style>{`.recharts-wrapper { margin: 0 auto !important; }`}</style>
            <PieChart height={height} width={width}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={ ({ value, name}) => `${name.toUpperCase()}: ${value}` }
                    stroke='#ccc'
                    strokeWidth={2}
                    labelLine={{ stroke: 'transparent' }}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                {/* <Legend /> */}
            </PieChart>
        </div>
    );
};

export default RvbPieChart;
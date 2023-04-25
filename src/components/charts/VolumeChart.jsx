import { useEffect } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useGetTransactionChartData } from "../../hooks/useGetData";

const VolumeChart = ({ days, setChartVolume }) => {
  const { data, refetch } = useGetTransactionChartData(days, "volume");

  useEffect(() => {
    refetch();
  }, [days]);

  const convertToInternationalCurrencySystem = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(labelValue));
  };

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      //   className="mt-52 text-white z-50"
    >
      <AreaChart
        data={data?.map((val) => {
          return {
            Volume: Number(val?.volume),
            date: val?.to_char,
          };
        })}
        style={{ fill: "white" }}
      >
        <XAxis dataKey="date" stroke="white" style={{ fontSize: "15px" }} />
        {/* <YAxis stroke="white" /> */}
        <Tooltip
          wrapperStyle={{
            outline: "none",
            border: "none",
          }}
          contentStyle={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            width: "200px",
            color: "white",
            fontSize: "30px",
            fontWeight: 600,
            stroke: "white",
          }}
          formatter={(val) => {
            setChartVolume(`$${convertToInternationalCurrencySystem(val)}`);
            return [`$${convertToInternationalCurrencySystem(val)}`, "Volume"];
          }}
        />
        <Area
          type="linear"
          dataKey="Volume"
          stroke="#ff505a"
          strokeWidth={4}
          fill="transparent"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default VolumeChart;

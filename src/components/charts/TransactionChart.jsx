import { useEffect } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useGetTransactionChartData } from "../../hooks/useGetData";

const TransactionChart = ({ days, setChartTransactions }) => {
  const { data, refetch } = useGetTransactionChartData(days, "transaction");

  useEffect(() => {
    refetch();
  }, [days]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data?.map((val) => {
          return {
            Transactions: Number(val?.transactions),
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
          onChange={(e) => console.log(e)}
          formatter={(val) => {
            setChartTransactions(val);
            return [val, "Transactions"];
          }}
        />
        <Area
          type="linear"
          dataKey="Transactions"
          stroke="#ff505a"
          strokeWidth={4}
          fill="transparent"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TransactionChart;

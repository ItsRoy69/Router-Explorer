import React, { useState } from "react";
import {
  useGetMetaData,
  useGetTransactionChartData,
  useGetTransactions,
} from "../../hooks/useGetData";
import StatCard from "../StatCard/StatCard";
import { VscSearch } from "react-icons/vsc";
import { FiX } from "react-icons/fi";
import TransactionCard from "../transactionCard/TransactionCard";
import { Loader, Skeleton } from "@mantine/core";
import TransactionChart from "../charts/TransactionChart";
import VolumeChart from "../charts/VolumeChart";

const CrossChainSwap = () => {
  const { data, isLoading, isSuccess } = useGetMetaData();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [chartTransactions, setChartTransactions] = useState(0);
  const [chartVolume, setChartVolume] = useState(0);
  const [transactionDuration, setTransactionDuration] = useState("30");
  const [volumeDuration, setVolumeDuration] = useState("30");

  const {
    status,
    data: txData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isSuccess: isPageFetchSuccess,
  } = useGetTransactions();

  const handleSearchText = (val) => {
    setSearchText(val);
  };

  const getTransactionList = () => {
    if (isPageFetchSuccess) {
      let finalArray = [];

      txData.pages?.map((page) => {
        page.results.data.map((tx) => finalArray.push(tx));
      });

      if (statusFilter !== "all") {
        if (statusFilter === "pending") {
          finalArray = finalArray.filter(
            (val) => val.transaction_status === "Pending"
          );
        } else {
          finalArray = finalArray.filter(
            (val) => val.transaction_status === "Completed"
          );
        }
      }

      const filteredArray = finalArray.filter((tx) => {
        if (searchText == "") {
          return tx;
        } else if (
          tx.deposit_tx_hash
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          tx.execute_proposal_tx_hash
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          tx.destination_receipient_address
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          tx.depositor_address?.toLowerCase().includes(searchText.toLowerCase())
        ) {
          return tx;
        }
      });

      if (filteredArray.length === 0)
        return (
          <div className="min-h-screen flex justify-center mt-20 text-3xl">
            Sorry. No results found
          </div>
        );

      return filteredArray.map((tx) => (
        <TransactionCard key={tx.id} data={tx} />
      ));
    } else
      return (
        <div className="min-h-screen flex flex-col items-center w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((val) => (
            <div className="h-56 flex justify-center items-center">
              <Loader size={150} variant="dots" color="white" />
            </div>
          ))}
        </div>
      );
  };

  return (
    <div className="min-h-screen h-full bg-transparent mt-44 p-10 flex flex-col items-center text-white overflow-x-hidden">
      {/* Meta data cards */}
      <section className="flex flex-wrap justify-around items-center w-full">
        {isSuccess && !isLoading
          ? data.map(({ label, value }) => (
              <StatCard key={label} label={label} value={value} />
            ))
          : [1, 2, 3, 4].map((val) => (
              <Loader
                size={100}
                variant="dots"
                color="white"
                className="z-50"
              />
            ))}
      </section>
      <section className="xl:flex justify-center gap-10 h-96 items-center w-full m-14 p-4 hidden">
        <div className="h-full w-full flex flex-col relative">
          <div className="absolute left-3 top-5 text-white text-2xl flex flex-col justify-center items-center">
            <p className="text-2xl mb-3">Transactions</p>
            <p>{chartTransactions}</p>
          </div>
          <TransactionChart
            days={transactionDuration}
            setChartTransactions={(val) => setChartTransactions(val)}
          />
          <div className="absolute right-6 top-5 text-white text-xl flex flex-col gap-3 justify-center items-center z-50 cursor-pointer">
            <p
              className={transactionDuration === "7" && "text-gradient"}
              onClick={() => setTransactionDuration("7")}
            >
              7d
            </p>
            <p
              className={transactionDuration === "14" && "text-gradient"}
              onClick={() => setTransactionDuration("14")}
            >
              14d
            </p>
            <p
              className={transactionDuration === "30" && "text-gradient"}
              onClick={() => setTransactionDuration("30")}
            >
              30d
            </p>
          </div>
        </div>
        <div className="h-full w-full flex flex-col relative">
          <div className="absolute left-3 top-5 text-white text-2xl flex flex-col justify-center items-center">
            <p className="text-2xl mb-3">Volume</p>
            <p>{chartVolume}</p>
          </div>
          <VolumeChart
            days={volumeDuration}
            setChartVolume={(val) => setChartVolume(val)}
          />
          <div className="absolute right-6 top-5 text-white text-xl flex flex-col gap-3 justify-center items-center z-50 cursor-pointer">
            <p
              className={volumeDuration === "7" && "text-gradient"}
              onClick={() => setVolumeDuration("7")}
            >
              7d
            </p>
            <p
              className={volumeDuration === "14" && "text-gradient"}
              onClick={() => setVolumeDuration("14")}
            >
              14d
            </p>
            <p
              className={volumeDuration === "30" && "text-gradient"}
              onClick={() => setVolumeDuration("30")}
            >
              30d
            </p>
          </div>
        </div>
      </section>
      <section className="z-50 w-full mt-20 flex justify-center flex-col items-center">
        <div className="w-full xl:w-[65%] 2xl:w-[60%] flex items-center rounded-xl text-white 2xl:h-14 h-12 text-lg p-4 border-[0.6px] border-gray-200">
          <VscSearch className="text-gray-300 mr-3" />
          <input
            type="text"
            onChange={(e) => handleSearchText(e.target.value)}
            value={searchText}
            placeholder="Search by address / tx hash"
            className="bg-transparent w-full h-full outline-none placeholder:text-gray-300"
          />

          {searchText && (
            <FiX
              className="text-2xl cursor-pointer"
              onClick={() => handleSearchText("")}
            />
          )}
        </div>

        <div className="bg-glass w-full xl:w-[65%] 2xl:w-[60%] min-h-screen h-full mt-10 rounded-[2rem] flex flex-col">
          <div className="flex gap-8 p-8 items-center w-full border-b-[0.1px] border-gray-400">
            <p
              className={`text-base md:text-2xl transition-all duration-300 hover:scale-110 cursor-pointer ${
                statusFilter === "all" && "text-gradient"
              } `}
              onClick={() => setStatusFilter("all")}
            >
              All
            </p>
            <p
              className={`text-base md:text-2xl transition-all duration-300 hover:scale-110 cursor-pointer ${
                statusFilter === "completed" && "text-gradient"
              } `}
              onClick={() => setStatusFilter("completed")}
            >
              Completed
            </p>
            <p
              className={`text-base md:text-2xl transition-all duration-300 hover:scale-110 cursor-pointer ${
                statusFilter === "pending" && "text-gradient"
              } `}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </p>
          </div>

          <div className="flex items-center w-[80%] justify-between p-4 text-lg lg:text-2xl">
            <div className="flex justify-center items-center w-full">
              Network
            </div>
            <div className="flex justify-center items-center w-full">Token</div>
            <div className="flex justify-center items-center w-full">
              Transaction
            </div>
          </div>

          <div>{isSuccess && getTransactionList()}</div>
          <div className={`${!hasNextPage ? "hidden" : ""}`}>
            {isFetchingNextPage ? (
              <div className="flex justify-center items-center p-8">
                <Loader size={80} variant="dots" color="white" />
              </div>
            ) : (
              <p
                className="text-xl flex justify-center items-center p-8 cursor-pointer"
                onClick={() => fetchNextPage()}
              >
                Load more transactions
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrossChainSwap;

import { Loader } from "@mantine/core";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { VscSearch } from "react-icons/vsc";
import {
  useGetGenericMetaData,
  useGetGenericTransactions,
} from "../../hooks/useGetData";
import StatCard from "../StatCard/StatCard";
import GenericTransactionCard from "../transactionCard/GenericTransactionCard";

const CrossTalk = () => {
  const { data, isLoading, isSuccess } = useGetGenericMetaData();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    status,
    data: txData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isSuccess: isPageFetchSuccess,
  } = useGetGenericTransactions();

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
        <GenericTransactionCard key={tx.id} data={tx} />
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
      <section className="z-50 w-full mt-20 flex justify-center flex-col items-center">
        <div className="w-full xl:w-[55%] 2xl:w-[45%] flex items-center rounded-xl text-white 2xl:h-14 h-12 text-lg p-4 border-[0.6px] border-gray-200">
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

        <div className="bg-glass w-full xl:w-[55%] 2xl:w-[45%] min-h-screen h-full mt-10 rounded-[2rem] flex flex-col">
          <div className="flex gap-8 p-8 items-center w-full border-b-[0.1px] border-gray-400">
            <p
              className={`text-sm md:text-2xl transition-all duration-300 hover:scale-110 cursor-pointer ${
                statusFilter === "all" && "text-gradient"
              } `}
              onClick={() => setStatusFilter("all")}
            >
              All
            </p>
            <p
              className={`text-sm md:text-2xl transition-all duration-300 hover:scale-110 cursor-pointer ${
                statusFilter === "completed" && "text-gradient"
              } `}
              onClick={() => setStatusFilter("completed")}
            >
              Completed
            </p>
            <p
              className={`text-sm md:text-2xl transition-all duration-300 hover:scale-110 cursor-pointer ${
                statusFilter === "pending" && "text-gradient"
              } `}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </p>
          </div>

          <div className="flex items-center w-[78%] justify-between p-4 text-lg lg:text-2xl">
            <div className="flex justify-center items-center w-full">
              Network
            </div>
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

export default CrossTalk;

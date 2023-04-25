import ChainListDropdown from "../chainListDropDown/ChainListDropDown";
import React, { useEffect, useState } from "react";
import { BiTransferAlt } from "react-icons/bi";
import { chainLogos } from "../constants/chainLogos";
import { useGetFees } from "../../hooks/useGetData";
import { useTokenContext } from "../../hooks/useTokenContext";
import { Loader } from "@mantine/core";
import TokenCard from "./TokenCard";

const FeeCalculator = () => {
  const [sourceChain, setSourceChain] = useState(chainLogos[0]);
  const [targetChain, setTargetChain] = useState(chainLogos[1]);
  const [rotate, setRotate] = useState(false);
  const [feesData, setFeesData] = useState([]);
  const tokenList = useTokenContext();

  const { data, refetch, isFetching, isFetched, remove } = useGetFees({
    srcChainId: sourceChain.value,
    destChainId: targetChain.value,
  });

  console.log(tokenList);

  useEffect(() => {
    if (isFetched) {
      let arr = [];
      const tokenDetails = data.map((val) => {
        return tokenList.find((token) => {
          return token.address === val.token;
        });
      });
      tokenDetails.map((details) => {
        data.map((val) => {
          if (details?.address === val.token) {
            const obj = {
              logo: details.logoURI,
              symbol: details.symbol,
              exchangeFee: val.exchangeFee,
              transferFee: val.transferFee,
              isAccepted: val.isAccepted,
              decimals: details.decimals,
            };
            arr.push(obj);
          }
        });
      });

      setFeesData(arr);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      setFeesData([]);
      remove();
    };
  }, []);

  const changeSourceChain = (val) => {
    const option = chainLogos.find((item) => item.value === val);
    setSourceChain(option);
    remove();
  };

  const changeTargetChain = (val) => {
    const option = chainLogos.find((item) => item.value === val);
    setTargetChain(option);
    remove();
  };

  const toggleChains = () => {
    setSourceChain(targetChain);
    setTargetChain(sourceChain);
    remove();
    setRotate(!rotate);
  };

  const checkFees = () => {
    setFeesData([]);
    refetch();
  };

  return (
    <div className="min-h-screen h-full bg-transparent mt-44 p-10 flex flex-col items-center text-white overflow-x-hidden">
      {/* Meta data cards */}
      <section className="flex flex-col justify-center items-center bg-glass p-10 h-[26rem] w-full xl:w-[50%] rounded-3xl">
        {/* source */}
        <div className="p-5 rounded-xl flex flex-col md:flex-row justify-center items-center w-full h-28 xl:h-24 md:h-16">
          <h2 className="text-gradient text-3xl font-bold mr-4 mb-3 md:mb-0">
            Source
          </h2>
          <ChainListDropdown
            value={sourceChain}
            onChange={changeSourceChain}
            options={chainLogos}
          />
        </div>

        {rotate ? (
          <div
            onClick={toggleChains}
            className="hover:scale-150 transition-all duration-500 rotate-180"
          >
            <BiTransferAlt className="text-5xl text-gray-200 lg:text-7xl rotate-90 cursor-pointer" />
          </div>
        ) : (
          <div
            onClick={toggleChains}
            className="hover:scale-150 transition-all duration-500"
          >
            <BiTransferAlt className="text-5xl text-gray-200 lg:text-7xl rotate-90 cursor-pointer" />
          </div>
        )}

        {/* target */}
        <div className="p-5 rounded-xl flex flex-col md:flex-row justify-center items-center w-full h-28 xl:h-24 md:h-16">
          <h2 className="text-gradient text-3xl font-bold mr-4 mb-3 md:mb-0">
            Target
          </h2>
          <ChainListDropdown
            value={targetChain}
            onChange={changeTargetChain}
            options={chainLogos}
          />
        </div>

        <div className="flex justify-center items-center h-14 w-[60%] xl:w-[40%] mt-5">
          <button
            className="h-full w-full button flex justify-center items-center"
            onClick={checkFees}
          >
            {isFetching ? (
              <Loader size={60} variant="dots" color="white" />
            ) : (
              "Fetch"
            )}
          </button>
        </div>
      </section>

      {isFetched && feesData.length > 0 && (
        <section className="h-full mt-16 z-50 w-full flex justify-center items-center flex-col xl:w-[50%]">
          <p className="text-3xl font-semibold">Supported Tokens</p>
          {feesData.map((token) => (
            <TokenCard token={token} />
          ))}
        </section>
      )}

      {isFetched && feesData.length === 0 && (
        <section className="h-full mt-16 z-50 w-full flex justify-center items-center flex-col xl:w-[50%]">
          <p className="text-3xl font-semibold">No supported tokens found</p>
        </section>
      )}
    </div>
  );
};

export default FeeCalculator;

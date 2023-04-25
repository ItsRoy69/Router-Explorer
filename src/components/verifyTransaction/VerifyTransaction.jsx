import { useEffect, useState } from "react";
import { useVerifyTransaction } from "../../hooks/useGetData";
import { Loader } from "@mantine/core";
import { chainLogos } from "../constants/chainLogos";
import ChainListDropdown from "../chainListDropDown/ChainListDropDown";
import { MdPending, MdDoubleArrow } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const VerifyTransaction = () => {
  const [txHash, setTxHash] = useState("");
  const [txData, setTxData] = useState({});
  const [network, setNetwork] = useState(chainLogos[0]);

  const { data, refetch, isFetching, isFetched, remove } = useVerifyTransaction(
    {
      txHash: txHash,
      networkId: network.value,
    }
  );

  useEffect(() => {
    if (isFetched && data) {
      const sourceChain = chainLogos.find(
        (val) => val.value === data.src_chain_id
      );
      const targetChain = chainLogos.find(
        (val) => val.value === data.dest_chain_id
      );

      setTxData({
        sourceChain,
        targetChain,
      });
    }
  }, [data]);

  useEffect(() => {
    return () => {
      setTxHash("");
      remove();
      setTxData({});
    };
  }, []);

  const changeTxHash = (val) => {
    setTxHash(val);
    remove();
    setTxData({});
  };

  const changeNetwork = (val) => {
    const option = chainLogos.find((item) => item.value === val);
    setNetwork(option);
    remove();
    setTxData({});
  };

  const checkStatus = () => {
    setTxHash("");
    refetch();
    setTxData({});
  };

  return (
    <div className="min-h-screen h-full bg-transparent mt-44 p-10 flex flex-col items-center text-white overflow-x-hidden">
      {/* Meta data cards */}
      <section className="flex flex-col justify-center items-center bg-glass p-8 h-[25rem] w-full xl:w-[50%] rounded-3xl">
        <div className="p-5 rounded-xl flex flex-col md:flex-row justify-center items-center w-full h-28 xl:h-24 md:h-16">
          <h2 className="text-gradient text-3xl font-bold mr-4 mb-3 md:mb-0">
            Network
          </h2>

          <ChainListDropdown
            value={network}
            onChange={changeNetwork}
            options={chainLogos}
          />
        </div>

        <div className="p-5 rounded-xl flex flex-col md:flex-row items-center w-full h-28 xl:h-24 md:h-16">
          <h2 className="text-gradient text-3xl font-bold mr-6 mb-3 md:mb-0 whitespace-nowrap">
            Tx Hash
          </h2>
          <div className="xl:w-[71%] w-full flex justify-start">
            <input
              type="text"
              onChange={(e) => changeTxHash(e.target.value)}
              value={txHash}
              className="2xl:h-14 h-12 bg-transparent text-lg p-3 border-[0.6px] border-gray-200 outline-none rounded-xl text-white w-full"
            />
          </div>
        </div>

        <div className="flex justify-center items-center h-14 w-[60%] xl:w-[40%] mt-5">
          <button
            className="h-full w-full button flex justify-center items-center"
            onClick={checkStatus}
          >
            {isFetching ? (
              <Loader size={60} variant="dots" color="white" />
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </section>

      {isFetched && data && txData && (
        <section className="h-full mt-16 z-50 w-full flex justify-center items-center flex-col xl:w-[50%]">
          {data.tx_status === "Pending" ? (
            <div className="text-white text-2xl lg:text-5xl flex items-center">
              <MdPending className="text-5xl lg:text-8xl mr-3 text-orange-500" />
              <p>Transaction pending</p>
            </div>
          ) : (
            <div className="text-white text-2xl lg:text-4xl flex items-center">
              <FaCheckCircle className="text-green-500 text-5xl lg:text-8xl mr-3" />
              <p>Transaction Successful</p>
            </div>
          )}
          <div className="flex items-center mt-10 w-[80%] lg:w-[60%] justify-between">
            <div>
              <img
                src={txData.sourceChain?.icon}
                className="h-14 w-14 object-contain"
                alt="network logo"
              />
              <p className="text-2xl">{txData.sourceChain?.label}</p>
            </div>
            <div>
              <MdDoubleArrow className="text-8xl" />
            </div>
            <div>
              <img
                src={txData.targetChain?.icon}
                className="h-14 w-14 object-contain"
                alt="network logo"
              />
              <p className="text-2xl">{txData.targetChain?.label}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default VerifyTransaction;

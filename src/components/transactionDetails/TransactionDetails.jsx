import React from "react";
import { useParams } from "react-router-dom";
import { useGetTransactionData } from "../../hooks/useGetData";
import { useTokenContext } from "../../hooks/useTokenContext";
import { chainLogos } from "../constants/chainLogos";
import { useClipboard } from "@mantine/hooks";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import NoImage from "../../assets/noimage.webp";
import { MdContentCopy } from "react-icons/md";

const TransactionDetails = () => {
  const param = useParams().id;
  const clipboard1 = useClipboard({ timeout: 2000 });
  const clipboard2 = useClipboard({ timeout: 2000 });
  const clipboard3 = useClipboard({ timeout: 2000 });
  const clipboard4 = useClipboard({ timeout: 2000 });
  const clipboard5 = useClipboard({ timeout: 2000 });
  const clipboard6 = useClipboard({ timeout: 2000 });

  const { data, isLoading, isSuccess } = useGetTransactionData(param);

  const tokenList = useTokenContext();

  const destTokenData = tokenList.find(
    (val) => val?.address === data?.dest_token_address
  );

  const srcTokenData = tokenList.find(
    (val) => val?.address === data?.src_token_address
  );

  const feeTokenData = tokenList.find(
    (val) => val?.address === data?.feetokenaddress
  );

  const srcNetworkData = chainLogos.find(
    (val) => val?.value === data?.network_id.trim()
  );

  const destNetworkData = chainLogos.find((val) => {
    return val?.value === destTokenData?.chainId.toString();
  });

  const truncate = (input) => {
    if (input) {
      return input.substring(0, 6) + "..." + input?.substring(input.length - 5);
    } else return input;
  };

  const handleImageError = (e) => {
    e.target.src = NoImage;
    e.onerror = null;
  };

  return (
    <div className="min-h-screen h-full bg-transparent mt-44 p-10 flex flex-col items-center justify-center w-full text-white overflow-x-hidden">
      <section className="hidden lg:flex z-50 justify-between items-center w-[60%]">
        <div className="flex flex-col items-center justify-center">
          <img
            src={srcNetworkData?.icon || NoImage}
            className="h-48 w-48 object-contain"
            alt="network logo"
            onError={(e) => handleImageError(e)}
          />
          <p className="text-4xl">{srcNetworkData?.label}</p>
        </div>

        <AiOutlineDoubleRight size={150} />
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src={destNetworkData?.icon || NoImage}
            className="h-48 w-48 object-contain"
            alt="network logo"
            onError={(e) => handleImageError(e)}
          />
          <p className="text-4xl">{destNetworkData?.label}</p>
        </div>
      </section>
      <div className="z-50 flex justify-center items-center mt-14 text-4xl">
        Transaction Details
      </div>
      <section className="flex flex-col justify-center items-center bg-glass p-4 lg:p-8 w-full 2xl:w-[80%] rounded-3xl mt-10 text-lg lg:text-xl">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Date</p>
          <p className="lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg">
            {data?.created_date}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">From</p>
          <div className="flex items-center lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg">
            <img
              src={srcNetworkData?.icon || NoImage}
              className="h-10 w-10 object-contain mr-3"
              alt="network logo"
              onError={(e) => handleImageError(e)}
            />
            <p className="hidden lg:block">{data?.depositor_address}</p>
            <p className="lg:hidden">{truncate(data?.depositor_address)}</p>
            {clipboard1.copied ? (
              <FaCheck className="text-3xl ml-2 text-green-500" />
            ) : (
              <MdContentCopy
                className="text-3xl ml-2 cursor-pointer"
                onClick={() => clipboard1.copy(data?.depositor_address)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">To</p>
          <div className="flex items-center lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg">
            <img
              src={destNetworkData?.icon || NoImage}
              className="h-10 w-10 object-contain mr-3"
              alt="network logo"
              onError={(e) => handleImageError(e)}
            />
            <p className="hidden lg:block">
              {data?.destination_receipient_address}
            </p>
            <p className="lg:hidden">
              {truncate(data?.destination_receipient_address)}
            </p>
            {clipboard2.copied ? (
              <FaCheck className="text-3xl ml-2 text-green-500" />
            ) : (
              <MdContentCopy
                className="text-3xl ml-2 cursor-pointer"
                onClick={() =>
                  clipboard2.copy(data?.destination_receipient_address)
                }
              />
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Source Token</p>
          <div className="flex items-center lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg mt-2 lg:mt-0">
            <img
              src={srcTokenData?.logoURI || NoImage}
              className="h-10 w-10 object-contain mr-3"
              alt="network logo"
              onError={(e) => handleImageError(e)}
            />
            <p>{data?.srctokensymbol}</p>
            {clipboard3.copied ? (
              <FaCheck className="text-3xl ml-2 text-green-500" />
            ) : (
              <MdContentCopy
                className="text-3xl ml-2 cursor-pointer"
                onClick={() => clipboard3.copy(data?.src_token_address)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Source Token Amount</p>
          <p className="lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg">
            {data?.src_token_amount}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Destination Token</p>
          <div className="flex items-center lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg mt-2 lg:mt-0">
            <img
              src={destTokenData?.logoURI || NoImage}
              className="h-10 w-10 object-contain mr-3"
              alt="network logo"
              onError={(e) => handleImageError(e)}
            />
            <p>{data?.destinationtokensymbol}</p>
            {clipboard4.copied ? (
              <FaCheck className="text-3xl ml-2 text-green-500" />
            ) : (
              <MdContentCopy
                className="text-3xl ml-2 cursor-pointer"
                onClick={() => clipboard4.copy(data?.dest_token_address)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Destination Token Amount</p>
          <p className="lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg ">
            {data?.dest_token_amount}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Fee Token</p>
          <div className="flex items-center lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg">
            <img
              src={feeTokenData?.logoURI || NoImage}
              className="h-10 w-10 object-contain mr-3"
              alt="token logo"
              onError={(e) => handleImageError(e)}
            />
            <p>{data?.feetokensymbol}</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Source Transaction Hash</p>
          <div className="flex items-center lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg">
            <a
              href={srcNetworkData?.scanLink + "/" + data?.deposit_tx_hash}
              className="flex items-center hover:underline underline-offset-4"
              target="_blank"
            >
              <p className="hidden lg:block">{data?.deposit_tx_hash}</p>
              <p className="lg:hidden">{truncate(data?.deposit_tx_hash)}</p>
              <FiExternalLink className="text-xl ml-1 mb-2" />
            </a>

            {clipboard5.copied ? (
              <FaCheck className="text-3xl ml-2 text-green-500" />
            ) : (
              <MdContentCopy
                className="text-3xl ml-2 cursor-pointer"
                onClick={() => clipboard5.copy(data?.deposit_tx_hash)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Destination Transaction Hash</p>
          <div className="flex items-center lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg">
            <a
              href={
                destNetworkData?.scanLink + "/" + data?.execute_proposal_tx_hash
              }
              target="_blank"
              className="flex items-center hover:underline underline-offset-4"
            >
              <p className="hidden lg:block">
                {data?.execute_proposal_tx_hash}
              </p>
              <p className="lg:hidden">
                {truncate(data?.execute_proposal_tx_hash)}
              </p>
              <FiExternalLink className="text-xl ml-1 mb-2" />
            </a>

            {clipboard6.copied ? (
              <FaCheck className="text-3xl ml-2 text-green-500" />
            ) : (
              <MdContentCopy
                className="text-3xl ml-2 cursor-pointer"
                onClick={() => clipboard6.copy(data?.execute_proposal_tx_hash)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Deposit Nonce</p>
          <p className="lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg">
            {data?.nonce_id}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Status</p>
          <p className="lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg">
            {data?.transaction_status}
          </p>
        </div>
      </section>
    </div>
  );
};

export default TransactionDetails;

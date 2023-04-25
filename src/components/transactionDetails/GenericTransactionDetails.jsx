import React from "react";
import { useParams } from "react-router-dom";
import { useGetGenericTransactionData } from "../../hooks/useGetData";
import { useTokenContext } from "../../hooks/useTokenContext";
import { chainLogos } from "../constants/chainLogos";
import { useClipboard } from "@mantine/hooks";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import NoImage from "../../assets/noimage.webp";
import { MdContentCopy } from "react-icons/md";

const GenericTransactionDetails = () => {
  const param = useParams().id;
  const clipboard1 = useClipboard({ timeout: 2000 });
  const clipboard2 = useClipboard({ timeout: 2000 });
  const clipboard3 = useClipboard({ timeout: 2000 });
  const clipboard4 = useClipboard({ timeout: 2000 });
  const clipboard5 = useClipboard({ timeout: 2000 });

  const { data, isLoading, isSuccess } = useGetGenericTransactionData(param);

  const tokenList = useTokenContext();

  const feeTokenData = tokenList.find(
    (val) => val?.address === data?.fee_token_address
  );

  const srcNetworkData = chainLogos.find(
    (val) => val?.value === data?.network_id.trim()
  );

  const destNetworkData = chainLogos.find((val) => {
    return val?.value === data?.dest_network_id.trim();
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
    <div className="min-h-screen h-full bg-transparent mt-44 p-10 flex flex-col items-center justify-center w-full text-white overflow-y-hidden">
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
      <section className="flex flex-col justify-center items-center bg-glass p-4 lg:p-8 w-full 2xl:w-[80%] rounded-3xl mt-10 text-xl">
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
            <p className="hidden lg:block">{data?.user_address}</p>
            <p className="lg:hidden">{truncate(data?.user_address)}</p>
            {clipboard1.copied ? (
              <FaCheck className="text-3xl ml-2 text-green-500" />
            ) : (
              <MdContentCopy
                className="text-3xl ml-2 cursor-pointer"
                onClick={() => clipboard1.copy(data?.user_address)}
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
            <p className="hidden lg:block">{data?.user_address}</p>
            <p className="lg:hidden">{truncate(data?.user_address)}</p>
            {clipboard2.copied ? (
              <FaCheck className="text-3xl ml-2 text-green-500" />
            ) : (
              <MdContentCopy
                className="text-3xl ml-2 cursor-pointer"
                onClick={() => clipboard2.copy(data?.user_address)}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Fee Token</p>
          <div className="flex items-center lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg mt-2 lg:mt-0">
            <img
              src={feeTokenData?.logoURI || NoImage}
              className="h-10 w-10 object-contain mr-3"
              alt="token logo"
              onError={(e) => handleImageError(e)}
            />
            <p>{data?.fee_token_symbol}</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-2 lg:m-6">
          <p className="lg:w-3/12">Implementation Contract</p>
          <div className="flex items-center lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg ">
            <a
              href={
                srcNetworkData?.scanLink +
                "/" +
                data?.implementation_contract_address
              }
              className="flex items-center hover:underline underline-offset-4"
              target="_blank"
            >
              <p className="hidden lg:block">
                {data?.implementation_contract_address}
              </p>
              <p className="lg:hidden">
                {truncate(data?.implementation_contract_address)}
              </p>
              <FiExternalLink className="text-xl ml-1 mb-2" />
            </a>

            {clipboard3.copied ? (
              <FaCheck className="text-3xl ml-2 text-green-500" />
            ) : (
              <MdContentCopy
                className="text-3xl ml-2 cursor-pointer"
                onClick={() =>
                  clipboard3.copy(data?.implementation_contract_address)
                }
              />
            )}
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

            {clipboard4.copied ? (
              <FaCheck className="text-3xl ml-2 text-green-500" />
            ) : (
              <MdContentCopy
                className="text-3xl ml-2 cursor-pointer"
                onClick={() => clipboard4.copy(data?.deposit_tx_hash)}
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

            {clipboard5.copied ? (
              <FaCheck className="text-3xl ml-2 text-green-500" />
            ) : (
              <MdContentCopy
                className="text-3xl ml-2 cursor-pointer"
                onClick={() => clipboard5.copy(data?.execute_proposal_tx_hash)}
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
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center w-full m-6">
          <p className="lg:w-3/12">Status</p>
          <p className="lg:border-l-[0.2px] border-gray-300 pl-8 text-sm lg:text-lg">
            {data?.transaction_status}
          </p>
        </div>
      </section>
    </div>
  );
};

export default GenericTransactionDetails;

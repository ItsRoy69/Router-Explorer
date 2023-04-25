import { useTokenContext } from "../../hooks/useTokenContext";
import { chainLogos } from "../constants/chainLogos";
import dayjs from "dayjs";
import { VscFoldDown } from "react-icons/vsc";
import { FiExternalLink } from "react-icons/fi";
import { BiErrorCircle } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { useHover } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import NoImage from "../../assets/noimage.webp";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const TransactionCard = ({ data }) => {
  const {
    created_date,
    deposit_tx_hash,
    execute_proposal_tx_hash,
    destination_receipient_address,
    network_id,
    src_token_amount,
    dest_token_amount,
    src_token_address,
    dest_token_address,
    depositor_address,
    transaction_status,
  } = data;

  const tokenList = useTokenContext();

  const navigate = useNavigate();

  const { hovered, ref } = useHover();
  const { hovered: srcLinkHovered, ref: ref1 } = useHover();
  const { hovered: destLinkHovered, ref: ref2 } = useHover();

  const destTokenData = tokenList.find(
    (val) => val?.address === dest_token_address
  );

  const srcTokenData = tokenList.find(
    (val) => val?.address === src_token_address
  );

  const srcNetworkData = chainLogos.find(
    (val) => val?.value === network_id.trim()
  );

  const destNetworkData = chainLogos.find((val) => {
    return val?.value === destTokenData?.chainId.toString();
  });

  const truncate = (input) => {
    if (input) {
      return input.substring(0, 6) + "..." + input?.substring(input.length - 5);
    } else return input;
  };

  const openTransactionDetailsPage = () => {
    if (!srcLinkHovered && !destLinkHovered) {
      navigate(`/crosschainswap/tx/${deposit_tx_hash}`);
    }
  };

  const handleImageError = (e) => {
    e.target.src = NoImage;
    e.onerror = null;
  };

  return (
    <>
      <div
        className="flex items-center w-full p-6 hover:bg-glass transition-all duration-100 cursor-pointer relative"
        ref={ref}
        onClick={openTransactionDetailsPage}
      >
        <div className="flex items-center w-[95%] md:w-[80%] p-2 justify-between">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <img
                className="h-10 w-10 object-contain mr-3"
                src={srcNetworkData?.icon || NoImage}
                alt="chain logo"
                onError={(e) => handleImageError(e)}
              />

              <div className="hidden lg:block">
                <p className="text-xl">{srcNetworkData?.label}</p>
                <p>{truncate(depositor_address)}</p>
              </div>
            </div>
            <VscFoldDown className="text-xl m-2" />
            <div className="flex justify-center items-center">
              <img
                className="h-10 w-10 object-contain mr-3"
                src={destNetworkData?.icon || NoImage}
                alt="chain logo"
                onError={(e) => handleImageError(e)}
              />
              <div className="hidden lg:block">
                <p className="text-xl">{destNetworkData?.label}</p>
                <p>{truncate(destination_receipient_address)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <img
                className="h-10 w-10 object-contain mr-3"
                src={srcTokenData?.logoURI || NoImage}
                alt="token logo"
                onError={(e) => handleImageError(e)}
              />
              <div className="hidden lg:block">
                <p className="text-xl">{srcTokenData?.symbol}</p>
                <p>({Number(src_token_amount).toFixed(3)})</p>
              </div>
            </div>
            <VscFoldDown className="text-xl m-2" />
            <div className="flex justify-center items-center">
              <img
                className="h-10 w-10 object-contain mr-3"
                src={destTokenData?.logoURI || NoImage}
                alt="token logo"
                onError={(e) => handleImageError(e)}
              />

              <div className="hidden lg:block">
                <p className="text-xl">{destTokenData?.symbol}</p>
                <p>({Number(dest_token_amount).toFixed(3)})</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <a
              href={srcNetworkData?.scanLink + "/" + deposit_tx_hash}
              target="_blank"
            >
              <div className="flex justify-center items-center">
                <img
                  className="h-10 w-10 object-contain mr-3"
                  src={srcNetworkData?.scanIcon || NoImage}
                  alt="network logo"
                  onError={(e) => handleImageError(e)}
                />
                <div ref={ref1} className="hidden lg:block">
                  <p className={`text-xl`}>{srcNetworkData?.scanName}</p>
                  <div className="flex items-center">
                    <p
                      className={
                        srcLinkHovered && "underline underline-offset-4"
                      }
                    >
                      {truncate(deposit_tx_hash, 8)}
                    </p>
                    <FiExternalLink className="text-lg ml-1" />
                  </div>
                </div>
              </div>
            </a>

            <VscFoldDown className="text-xl m-2" />

            <a
              href={destNetworkData?.scanLink + "/" + execute_proposal_tx_hash}
              target="_blank"
            >
              <div className="flex justify-center items-center">
                <img
                  className="h-10 w-10 object-contain mr-3"
                  src={destNetworkData?.scanIcon || NoImage}
                  alt="network logo"
                  onError={(e) => handleImageError(e)}
                />
                <div ref={ref2} className="hidden lg:block">
                  <p className={`text-xl`}>{destNetworkData?.scanName}</p>
                  <div className="flex items-center">
                    <p
                      className={
                        destLinkHovered && "underline underline-offset-4"
                      }
                    >
                      {truncate(execute_proposal_tx_hash, 8)}
                    </p>
                    <FiExternalLink className="text-lg ml-2" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Time */}

        <div className="hidden md:flex flex-col justify-center items-center text-lg ml-4">
          {dayjs(created_date).fromNow()}
        </div>
        {transaction_status === "Pending" ? (
          <BiErrorCircle className="absolute text-4xl text-orange-500 top-4 right-4" />
        ) : (
          <BsCheckCircle className="absolute text-4xl text-green-500 top-4 right-4" />
        )}
      </div>

      {!hovered && (
        <div className="w-full flex justify-center">
          <div className="border-b-[0.1px] border-gray-300 w-[90%]"></div>
        </div>
      )}
    </>
  );
};

export default TransactionCard;

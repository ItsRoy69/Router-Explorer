const TokenCard = ({ token }) => {
  const { logo, symbol, exchangeFee, transferFee, isAccepted, decimals } =
    token;

  if (isAccepted)
    return (
      <div className="h-36 w-full m-8 p-3 flex flex-col justify-between items-center">
        <div className="flex items-center mb-3 ">
          <img
            src={logo}
            className="h-16 w-16 object-contain mr-3"
            alt="token logo"
          />
          <p className="text-2xl font-semibold">{symbol}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <div>
            <p className="text-3xl">Transfer fee</p>
            <p className="text-base">{transferFee / 10 ** decimals}</p>
          </div>
          <div>
            <p className="text-3xl">Exchange fee</p>
            <p className="text-base">{exchangeFee / 10 ** decimals}</p>
          </div>
        </div>
      </div>
    );
};

export default TokenCard;

// Context to fetch and store the details of all tokens

import { createContext, useState, useEffect } from "react";

import axios from "axios";

export const TokenContext = createContext();

const tokenApiList = [
  "https://raw.githubusercontent.com/dfyn/new-host/main/list-token.tokenlist.json",
  "https://unpkg.com/quickswap-default-token-list@1.2.20/build/quickswap-default.tokenlist.json",
  "https://tokens.pancakeswap.finance/pancakeswap-extended.json",
  "https://tokens.pancakeswap.finance/pancakeswap-top-100.json",
  "https://tokens.uniswap.org/",
  "https://raw.githubusercontent.com/pangolindex/tokenlists/main/pangolin.tokenlist.json",
  "https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/joe.tokenlist.json",
  "https://bridge.arbitrum.io/token-list-42161.json",
  "https://static.optimism.io/optimism.tokenlist.json",
  "https://raw.githubusercontent.com/SpookySwap/spooky-info/master/src/constants/token/spookyswap.json",
];

function TokenContextProvider(props) {
  const [tokenList, setTokenList] = useState([]);

  useEffect(() => {
    let arr = [];
    const promiseList = tokenApiList.map((val) => {
      return axios.get(val);
    });

    Promise.allSettled(promiseList).then((dataArr) => {
      dataArr.map((obj) => {
        if (obj.status === "fulfilled") {
          arr.push(obj.value.data.tokens);
        }
      });
      setTokenList(arr.flat());
    });
  }, []);

  return (
    <TokenContext.Provider value={tokenList}>
      {props.children}
    </TokenContext.Provider>
  );
}

export default TokenContextProvider;

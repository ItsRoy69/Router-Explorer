// Hook to consume the token list context

import { useContext } from "react";

import { TokenContext } from "../context/TokenContextProvider";

export const useTokenContext = () => useContext(TokenContext);

// Query to fetch the NFT details

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const getMetaData = async (url) => {
  const res = await axios
    .get("https://api.stats.routerprotocol.com/api/deposits/getMetaData")
    .then((res) => res.data);

  return res.filter((val) => val.label !== "Active Validators");
};

export const useGetMetaData = () => {
  return useQuery(["metaData"], () => getMetaData());
};

const getGenericMetaData = async () => {
  const res = await axios
    .get("https://api.stats.routerprotocol.com/api/generic/getMetaDataGeneric")
    .then((res) => res.data);

  return res.filter((val) => val.label !== "Active Validators");
};

export const useGetGenericMetaData = () => {
  return useQuery(["genericMetaData"], () => getGenericMetaData());
};

const getFees = async (params) => {
  const res = await axios
    .get("https://api.stats.routerprotocol.com/api/fee", { params })
    .then((res) => res.data);

  return res;
};

export const useGetFees = (parameters) => {
  return useQuery(["txFees"], () => getFees(parameters), {
    enabled: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

const verifyTransaction = async (params) => {
  const res = await axios
    .get("https://api.stats.routerprotocol.com/api/status", { params })
    .then((res) => res.data);

  return res;
};

export const useVerifyTransaction = (parameters) => {
  return useQuery(["verifyTransaction"], () => verifyTransaction(parameters), {
    enabled: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

const getTransactions = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://api.stats.routerprotocol.com/api/deposits?networkId=137,56,43114,250,1,42161,10,1666600000,25&limit=11&orderBy=desc&page=${pageParam}`
  );
  const results = res.data;
  return {
    results,
    nextPage: pageParam + 1,
    totalPages: Math.floor(results?.total / 11),
  };
};

export const useGetTransactions = () => {
  return useInfiniteQuery(["transactions"], getTransactions, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    },
    // refetchInterval: 5000,
  });
};

const getGenericTransactions = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://api.stats.routerprotocol.com/api/deposits?networkId=137,56,43114,250,1,42161,10,1666600000,25&limit=11&orderBy=desc&isGeneric=true&page=${pageParam}`
  );
  const results = res.data;
  return {
    results,
    nextPage: pageParam + 1,
    totalPages: Math.floor(results?.total / 11),
  };
};

export const useGetGenericTransactions = () => {
  return useInfiniteQuery(["genericTransactions"], getGenericTransactions, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    },
    // refetchInterval: 5000,
  });
};

const getTransactionData = async (param) => {
  const res = await axios
    .get(`https://api.stats.routerprotocol.com/api/search?q=${param}`)
    .then((res) => res.data);

  return res.data[0];
};

export const useGetTransactionData = (param) => {
  return useQuery(["txData"], () => getTransactionData(param));
};

const getGenericTransactionData = async (param) => {
  const res = await axios
    .get(`https://api.stats.routerprotocol.com/api/generic/search?q=${param}`)
    .then((res) => res.data);

  return res.data[0];
};

export const useGetGenericTransactionData = (param) => {
  return useQuery(["txGenericData"], () => getGenericTransactionData(param));
};

const getTransactionChartData = async (days = 30) => {
  const res = await axios
    .get(
      `https://api.stats.routerprotocol.com/api/aggregated/byday?days=${days}`
    )
    .then((res) => res.data);

  return res.data;
};

export const useGetTransactionChartData = (days, key) => {
  return useQuery(["txChartData", key], () => getTransactionChartData(days));
};

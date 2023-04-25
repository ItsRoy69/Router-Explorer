import Polygon from "../../assets/logos/polygon.svg";
import Ethereum from "../../assets/logos/ethereum.svg";
import Avalanche from "../../assets/logos/avalanche.svg";
import Fantom from "../../assets/logos/fantom.svg";
import Binance from "../../assets/logos/binance.png";
import Arbitrum from "../../assets/logos/arbitrum.png";
import Cronos from "../../assets/logos/cronos.svg";
import Optimism from "../../assets/logos/optimism.svg";
import Harmony from "../../assets/logos/harmony.svg";

import ArbiScan from "../../assets/scans/arbiscan.ico";
import Bscan from "../../assets/scans/bscan.ico";
import CronoScan from "../../assets/scans/cronoscan.ico";
import EthScan from "../../assets/scans/ethscan.ico";
import FantomScan from "../../assets/scans/fantomscan.webp";
import HarmonyScan from "../../assets/scans/harmonyscan.ico";
import PolygonScan from "../../assets/scans/polygonscan.ico";

export const chainLogos = [
  {
    label: "Polygon",
    value: "137",
    icon: Polygon,
    scanIcon: PolygonScan,
    scanLink: "https://polygonscan.com/tx",
    scanName: "PolygonScan",
  },
  {
    label: "Binance",
    value: "56",
    icon: Binance,
    scanIcon: Bscan,
    scanLink: "https://bscscan.com/tx",
    scanName: "BscScan",
  },
  {
    label: "Avalanche",
    value: "43114",
    icon: Avalanche,
    scanIcon: Avalanche,
    scanLink: "https://avascan.info/tx",
    scanName: "AvaScan",
  },
  {
    label: "Fantom",
    value: "250",
    icon: Fantom,
    scanIcon: FantomScan,
    scanLink: "https://ftmscan.com/tx",
    scanName: "FTMScan",
  },
  {
    label: "Ethereum",
    value: "1",
    icon: Ethereum,
    scanIcon: EthScan,
    scanLink: "https://etherscan.io/tx",
    scanName: "EtherScan",
  },
  {
    label: "Arbitrum",
    value: "42161",
    icon: Arbitrum,
    scanIcon: ArbiScan,
    scanLink: "https://arbiscan.io/tx",
    scanName: "ArbiScan",
  },
  {
    label: "Optimism",
    value: "10",
    icon: Optimism,
    scanIcon: Optimism,
    scanLink: "https://optimistic.etherscan.io/tx",
    scanName: "OptiExplore",
  },
  {
    label: "Harmony",
    value: "1666600000",
    icon: Harmony,
    scanIcon: HarmonyScan,
    scanLink: "https://explorer.harmony.one/tx",
    scanName: "HarmonyExplore",
  },
  {
    label: "Cronos",
    value: "25",
    icon: Cronos,
    scanIcon: CronoScan,
    scanLink: "https://cronoscan.com/address",
    scanName: "CronoScan",
  },
];

import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import CrossChainSwap from "./components/Cross-chain-swap/CrossChainSwap";
import Header from "./components/Header";
import Wallpaper from "./assets/wrapper.png";
import CrossTalk from "./components/CrossTalk/CrossTalk";
import FeeCalculator from "./components/feeCalculator/FeeCalculator";
import VerifyTransaction from "./components/verifyTransaction/VerifyTransaction";
import TransactionDetails from "./components/transactionDetails/TransactionDetails";
import GenericTransactionDetails from "./components/transactionDetails/GenericTransactionDetails";

function App() {
  return (
    <Router>
      <Header />
      {/* Background gradient image */}
      <img
        src={Wallpaper}
        alt="wallpaper"
        className="fixed top-0 left-0 h-screen w-screen"
      />

      <Routes>
        <Route exact path="/" element={<Navigate to="/crosschainswap" />} />
        <Route exact path="crosschainswap" element={<CrossChainSwap />} />
        <Route exact path="crosstalk" element={<CrossTalk />} />
        <Route
          exact
          path="crosschainswap/tx/:id"
          element={<TransactionDetails />}
        />
        <Route exact path="crosstalk/tx/:id" element={<GenericTransactionDetails />} />
        <Route exact path="calculate-fees" element={<FeeCalculator />} />
        <Route
          exact
          path="verify-transaction"
          element={<VerifyTransaction />}
        />
        {/* <Route path="*" component={PageNotFound} /> */}
      </Routes>
    </Router>
  );
}

export default App;

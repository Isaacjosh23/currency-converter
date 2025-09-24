import { CurrencyConverter } from "./components/CurrencyConverter";

const App = () => {
  return (
    <div className="flex flex-col items-center gap-20">
      <h1 className="text-5xl text-center text-[#fbfbff] font-bold">
        Instant Currency Conversion
      </h1>
      <CurrencyConverter />;
    </div>
  );
};

export default App;

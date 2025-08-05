const TotalsComponent = () => {
  return (
    <div className="flex flex-col h-full w-6/10">
      <div className="flex flex-row justify-between items-center h-3/12 bg-green-950 mt-1 mr-1 rounded-t-sm">
        <h2 className="text-white  text-start w-6/10 font-bold text-2xl pl-2">
          Total
        </h2>
        <p className="text-white text-end w-4/10 font-bold text-2xl pr-2">
          $ 100,00
        </p>
      </div>
      <div className="flex flex-row bg-green-800 justify-between items-center h-6/12 mr-1">
        <h2 className="text-white text-start w-6/10 font-bold text-2xl pl-2 place-self-start">
          Change
        </h2>
        <p className="text-white text-end w-4/10 font-bold text-2xl pr-2 place-self-end">
          $ 0,00
        </p>
      </div>
      <div className="flex flex-row bg-green-950 justify-between items-center h-3/12 mr-1 rounded-b-sm">
        <h2 className="text-white  text-start w-6/10 font-bold text-2xl pl-2">
          Rounding
        </h2>
        <p className="text-white text-end w-4/10 font-bold text-2xl pr-2">
          $ 0,00
        </p>
      </div>
    </div>
  );
};

export default TotalsComponent;

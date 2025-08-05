import Clock from './Clock';

const Miselaneos = () => {
  return (
    <div className="flex flex-row justify-between w-4/10 h-full">
      <Clock />
      <button
        type="button"
        className="text-white bg-red-800 rounded-sm font-bold w-20 h-20 border-2 border-red-600 text-3xl mt-1"
      >
        X
      </button>
    </div>
  );
};

export default Miselaneos;

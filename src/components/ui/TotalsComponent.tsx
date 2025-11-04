/*import type { Themes } from 'types/types';

type Props = {
  theme: Themes;
};

const TotalsComponent = ({ theme }: Props) => {
  const totalsComponentColors = {
    default: {
      constainer: 'bg-green-950',
      totalh2: 'text-white',
      totalp: 'text-white',
      divchange: 'bg-green-800',
      changeh2: 'text-white',
      changep: 'text-white',
      divRound: 'bg-green-950',
      roundtext: 'text-white',
    },
    LIGHT: {
      constainer: 'bg-blue-100 ',
      totalh2: 'text-black',
      totalp: 'text-black',
      divchange: 'bg-green-800',
      changeh2: 'text-black',
      changep: 'text-black',
      divRound: 'bg-green-950',
      roundtext: 'text-balck',
    },
    DARK: {
      constainer: 'bg-gray-900',
      totalh2: 'text-white',
      totalp: 'text-white',
      divchange: 'bg-gray-800',
      changeh2: 'text-white',
      changep: 'text-white',
      divRound: 'bg-gray-900',
      roundtext: 'text-white',
    },
    DARKBLUE: {
      constainer: 'bg-white',
      totalh2: 'text-white',
      totalp: 'text-white',
      divchange: 'bg-green-800',
      changeh2: 'text-white',
      changep: 'text-white',
      divRound: 'bg-green-950',
      roundtext: 'text-white',
    },
    GREEN: {
      constainer: 'bg-green-950',
      totalh2: 'text-white',
      totalp: 'text-white',
      divchange: 'bg-green-800',
      changeh2: 'text-white',
      changep: 'text-white',
      divRound: 'bg-green-950',
      roundtext: 'text-white',
    },
  };

  return (
    <div className="flex flex-col h-full w-6/10">
      <div
        className={`flex flex-row justify-between items-center h-3/12 mt-1 mr-1 rounded-t-sm ${theme ? totalsComponentColors[theme].constainer : totalsComponentColors.default.constainer}`}
      >
        <h2
          className={`text-start w-6/10 font-bold text-2xl pl-2 ${theme ? totalsComponentColors[theme].totalh2 : totalsComponentColors.default.totalh2}`}
        >
          Total
        </h2>
        <p
          className={`text-end w-4/10 font-bold text-2xl pr-2 ${theme ? totalsComponentColors[theme].totalp : totalsComponentColors.default.totalp}`}
        >
          $ 100,00
        </p>
      </div>
      <div
        className={`flex flex-row justify-between items-center h-6/12 mr-1 ${theme ? totalsComponentColors[theme].divchange : totalsComponentColors.default.divchange}`}
      >
        <h2
          className={`text-start w-6/10 font-bold text-2xl pl-2 place-self-start ${theme ? totalsComponentColors[theme].changeh2 : totalsComponentColors.default.changeh2}`}
        >
          Change
        </h2>
        <p
          className={`text-end w-4/10 font-bold text-2xl pr-2 place-self-end ${theme ? totalsComponentColors[theme].changep : totalsComponentColors.default.changep}`}
        >
          $ 0,00
        </p>
      </div>
      <div
        className={`flex flex-row justify-between items-center h-3/12 mr-1 rounded-b-sm ${theme ? totalsComponentColors[theme].divRound : totalsComponentColors.default.divRound}`}
      >
        <h2
          className={`text-start w-6/10 font-bold text-2xl pl-2 ${theme ? totalsComponentColors[theme].roundtext : totalsComponentColors.default.roundtext}`}
        >
          Rounding
        </h2>
        <p
          className={`text-end w-4/10 font-bold text-2xl pr-2 ${theme ? totalsComponentColors[theme].roundtext : totalsComponentColors.default.roundtext}`}
        >
          $ 0,00
        </p>
      </div>
    </div>
  );
};

export default TotalsComponent;*/

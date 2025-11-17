import AlistarLogo from '@/assets/Alistar-logo.webp';
import { useLayoutStore } from '@/store/LayoutStore';
import { useTraductionsStore } from '@/store/TraductionStore';

type Props = {
  operator?: string | null;
};

const CustomerTop = ({ operator }: Props) => {
  const { t } = useTraductionsStore();
  const lang = useLayoutStore((state) => state.layout.lang);
  return (
    <div className="flex flex-row h-full items-center justify-between">
      <div className="h-full w-1/3 p-1">
        <img
          src={AlistarLogo}
          alt="Alistar"
          className="h-full rounded-lg shadow-lg shadow-gray-400"
        />
      </div>
      <div className="flex items-center justify-center h-full w-1/3">
        <h1 className="font-bold text-5xl text-shadow-lg p-2">
          {t('welcome', lang)}
        </h1>
      </div>
      <div className="flex items-center justify-end h-full w-1/3">
        <label
          className={`text-3xl font-bold p-2 border rounded-2xl
        mr-1 bg-white shadow-lg shadow-gray-400 ${operator ? 'visible' : 'invisible'}`}
        >{`${t('operator', lang)}: ${operator}`}</label>
      </div>
    </div>
  );
};

export default CustomerTop;

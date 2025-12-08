import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useLayoutStore } from '@/store/LayoutStore';
import { useTraductionsStore } from '@/store/TraductionStore';

type Props = {
  type: 'CustomerView' | 'SalesView';
};

const BodyBackgroundColorPicker = ({ type }: Props) => {
  const {
    layout,
    layoutActions: { editLayoutBackground },
  } = type === 'SalesView' ? useLayoutStore() : useCustomerViewStore();
  const { background, lang } = layout;
  const { t } = useTraductionsStore();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editLayoutBackground(e.target.value);
  };

  return (
    <>
      <div
        className="flex flex-row justify-center items-center w-11/12 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50"
      >
        <h2 className="p-1 text-xl w-9/12">
          {`${t('salesBackgroundColor', lang)}:`}
        </h2>
        <input
          type="color"
          onChange={handleColorChange}
          className="w-3/12 h-10 border-solid border-2 border-gray-300 rounded-lg m-1 p-1"
          value={background}
        />
      </div>
    </>
  );
};

export default BodyBackgroundColorPicker;

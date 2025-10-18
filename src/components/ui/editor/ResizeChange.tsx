import { useTraductionsStore } from 'src/store/TraductionsStore';
import type { Langs } from 'src/types/constTypes';

type Props = {
  lang: keyof typeof Langs;
  width: string;
  height: string;
  handleOnResizeManualChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'width' | 'height'
  ) => void;
  handleOnResizeEnd: () => void;
};
const ResizeChange = ({
  lang,
  width,
  height,
  handleOnResizeManualChange,
  handleOnResizeEnd,
}: Props) => {
  const { t } = useTraductionsStore();

  return (
    <>
      <div className="p1 text-xl">{t('dimensionsSett', lang)}</div>
      <label>{t('width', lang)}</label>
      <input
        type="text"
        className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
        value={width}
        onChange={(e) => handleOnResizeManualChange(e, 'width')}
      />
      <label>{t('height', lang)}</label>
      <input
        type="text"
        className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
        value={height}
        onChange={(e) => handleOnResizeManualChange(e, 'height')}
      />
      <button
        className="w-11/12 h-10 bg-blue-500 text-white rounded-lg mt-2"
        onClick={handleOnResizeEnd}
      >
        {t('close', lang)}
      </button>
    </>
  );
};

export default ResizeChange;

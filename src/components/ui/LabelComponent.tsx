import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useTraductionsStore } from '@/store/TraductionStore';
type Props = {
  id: string;
};

const LabelComponent = ({ id }: Props) => {
  const { t } = useTraductionsStore();
  const lang = useCustomerViewStore((state) => state.layout.lang);
  const {
    layout,
    layoutActions: { selectComponent },
  } = useCustomerViewStore();

  const LabelComponent = layout.components[id];
  if (LabelComponent.type !== 'LABEL') {
    return null;
  }

  const { properties, fontSize, textColor, text } = LabelComponent;
  const { position, size } = properties;

  return (
    <div
      className={`flex items-center justify-center top-${position.y} left-${position.x} w-${size.width} h-${size.height}`}
      onClick={() => selectComponent(id)}
    >
      <h1
        className={`font-bold text-shadow-lg p-2 ${fontSize || 'text-5xl'}`}
        style={{ color: textColor || '#000000' }}
      >
        {t(text, lang)}
      </h1>
    </div>
  );
};

export default LabelComponent;

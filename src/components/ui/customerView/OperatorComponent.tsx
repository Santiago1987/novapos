import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useSalesDataStore } from '@/store/SalesDataStore';
import { useTraductionsStore } from '@/store/TraductionStore';

type Props = {
  id: string;
};

const OperatorComponent = ({ id }: Props) => {
  const { t } = useTraductionsStore();
  const lang = useCustomerViewStore((state) => state.layout.lang);
  const {
    layout,
    layoutActions: { selectComponent },
  } = useCustomerViewStore();

  const operator = useSalesDataStore((state) => state.ticket.header.Operator);

  const operatorComponent = layout.components[id];
  if (operatorComponent.type !== 'OPERATOR') {
    return null;
  }

  const { properties, fontSize, textColor } = operatorComponent;
  const { position, size } = properties;

  return (
    <div
      className={`flex items-center justify-end top-${position.y} left-${position.x} w-${size.width} h-${size.height}`}
      onClick={() => selectComponent(id)}
    >
      <label
        className={`font-bold p-2 border rounded-2xl ${fontSize || 'text-5xl'}
        mr-1 bg-white shadow-lg shadow-gray-400 ${operator ? 'visible' : 'invisible'}`}
        style={{ color: textColor || '#000000' }}
      >{`${t('operator', lang)}: ${operator}`}</label>
    </div>
  );
};
export default OperatorComponent;

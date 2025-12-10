import { useCustomerViewStore } from '@/store/CustomerViewStore';

type Props = {
  id: string;
};
const CarousellPreview = ({ id }: Props) => {
  const layout = useCustomerViewStore((state) => state.layout);
  const component = layout.components[id];
  if (!component) return null;

  const { properties } = component;
  const { position, size } = properties;

  console.log(size);
  return (
    <>
      <div
        className={`absolute rounded-2xl border-dashed border-2 shadow-lg shadow-gray-400/50`}
        style={{
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
        }}
      ></div>
    </>
  );
};

export default CarousellPreview;

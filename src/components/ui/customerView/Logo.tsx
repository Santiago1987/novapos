import { useCustomerViewStore } from '@/store/CustomerViewStore';

type Props = {
  id: string;
};

const Logo = ({ id }: Props) => {
  const { layout } = useCustomerViewStore();

  const logoComponent = layout.components[id];

  if (logoComponent.type !== 'LOGO') {
    return null;
  }

  return (
    <div
      className={`h-${logoComponent.properties.size.height} w-${logoComponent.properties.size.width} p-1`}
    >
      <img
        src={logoComponent.imageUrl}
        alt="Logo"
        className="h-full w-full rounded-lg shadow-lg shadow-gray-400"
      />
    </div>
  );
};

export default Logo;

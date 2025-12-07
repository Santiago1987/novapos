import { ComponentTypes } from '@/types/constTypes';
import SalesTable from '@/components/ui/SalesTable';
import PaymentsTable from '@/components/ui/PaymentsTable';
import TotalsTable from '@/components/ui//TotalsTable';

type Props = {
  type: keyof typeof ComponentTypes;
  id: string;
};

const ComponentFactory = ({ id, type }: Props) => {
  const componentDiccionary = {
    SALES_TABLE: <SalesTable id={id} />,
    PAYMENTS_TABLE: <PaymentsTable id={id} />,
    TOTALS_TABLE: <TotalsTable id={id} />,
    PROMOTIONS_TABLE: <></>, // Placeholder for PromotionsTable component
    BUTTON: <></>, // Placeholder for Button component
    LABEL: <></>, // Placeholder for Label component
    INPUT: <></>, // Placeholder for Input component
    CAROUSEL: <></>, // Placeholder for Carousel component
    LOGO: <></>, // Placeholder for Logo component
    default: <></>,
  };

  return componentDiccionary[type] || componentDiccionary['default'];
};

export default ComponentFactory;

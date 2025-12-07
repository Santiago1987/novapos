import { ComponentTypes } from '@/types/constTypes';
import SalesTable from '@/components/ui/SalesTable';
import PaymentsTable from '@/components/ui/PaymentsTable';
import TotalsComponent from '@/components/ui/TotalsComponent';
import Logo from '@/components/ui/customerView/Logo';
import LabelComponent from '@/components/ui/LabelComponent';
import OperatorComponent from '../customerView/OperatorComponent';
import CarouselImages from '../customerView/CarouselImages';
import CarouselVideos from '../customerView/CarouselVideos';

type Props = {
  type: keyof typeof ComponentTypes;
  id: string;
};

const ComponentFactory = ({ id, type }: Props) => {
  const componentDiccionary = {
    SALES_TABLE: <SalesTable id={id} />,
    PAYMENTS_TABLE: <PaymentsTable id={id} />,
    TOTALS_COMPONENT: <TotalsComponent id={id} />,
    PROMOTIONS_TABLE: <></>, // Placeholder for PromotionsTable component
    BUTTON: <></>, // Placeholder for Button component
    LABEL: <LabelComponent id={id} />, // Placeholder for Label component
    INPUT: <></>, // Placeholder for Input component
    CAROUSEL_IMAGES: <CarouselImages id={id} />,
    CAROUSEL_VIDEOS: <CarouselVideos id={id} />,
    LOGO: <Logo id={id} />,
    OPEATOR: <OperatorComponent id={id} />,
    default: <></>,
  };

  return componentDiccionary[type] || componentDiccionary['default'];
};

export default ComponentFactory;

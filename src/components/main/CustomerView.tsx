import { useCustomerViewStore } from '@/store/CustomerViewStore';
import Editor from './Editor';
import CustomerScreen from '../ui/customerView/CustomerScreen';

const CustomerView = () => {
  const isEditing = useCustomerViewStore((state) => ({
    isEditing: state.isEditing,
  }));

  return <>{isEditing ? <Editor type="CustomerView" /> : <CustomerScreen />}</>;
};

export default CustomerView;

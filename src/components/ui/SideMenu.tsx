/*import { getButtonColors } from '../../helpers/getButtonColors';
import type { ButtonItem, Themes } from 'types/types';

const items: ButtonItem[] = [
  { id: 1, title: 'Add Product', onClick: () => {}, isClicked: false },
  { id: 2, title: 'Scan Barcode', onClick: () => {}, isClicked: false },
  { id: 3, title: 'Remove Item', onClick: () => {}, isClicked: false },
  { id: 4, title: 'Apply Discount', onClick: () => {}, isClicked: false },
  { id: 5, title: 'Calculate Total', onClick: () => {}, isClicked: false },
  { id: 6, title: 'Cash Payment', onClick: () => {}, isClicked: false },
  { id: 7, title: 'Card Payment', onClick: () => {}, isClicked: false },
  { id: 8, title: 'QR Code Payment', onClick: () => {}, isClicked: false },
  { id: 9, title: 'Print Receipt', onClick: () => {}, isClicked: false },
  { id: 10, title: 'Open Cash Drawer', onClick: () => {}, isClicked: false },
  { id: 11, title: 'Void Sale', onClick: () => {}, isClicked: false },
  { id: 12, title: 'Check Stock', onClick: () => {}, isClicked: false },
  { id: 13, title: 'Add Customer', onClick: () => {}, isClicked: false },
  { id: 14, title: 'Apply Promotion', onClick: () => {}, isClicked: false },
  { id: 15, title: 'Return Item', onClick: () => {}, isClicked: false },
  { id: 16, title: 'Close Shift', onClick: () => {}, isClicked: false },
  { id: 17, title: 'Generate Report', onClick: () => {}, isClicked: false },
  { id: 18, title: 'Weigh Item', onClick: () => {}, isClicked: false },
  { id: 19, title: 'Manual Entry', onClick: () => {}, isClicked: false },
  { id: 20, title: 'Gift Card Payment', onClick: () => {}, isClicked: false },
  { id: 21, title: 'Split Payment', onClick: () => {}, isClicked: false },
  { id: 22, title: 'Add Loyalty Points', onClick: () => {}, isClicked: false },
  { id: 23, title: 'Redeem Points', onClick: () => {}, isClicked: false },
  { id: 24, title: 'Cancel Transaction', onClick: () => {}, isClicked: false },
  { id: 25, title: 'Search Customer', onClick: () => {}, isClicked: false },
  { id: 26, title: 'Issue Refund', onClick: () => {}, isClicked: false },
  { id: 27, title: 'Update Price', onClick: () => {}, isClicked: false },
  { id: 28, title: 'Apply Coupon', onClick: () => {}, isClicked: false },
  { id: 29, title: 'Check Balance', onClick: () => {}, isClicked: false },
  { id: 30, title: 'Void Discount', onClick: () => {}, isClicked: false },
  { id: 31, title: 'Start New Sale', onClick: () => {}, isClicked: false },
  { id: 32, title: 'Hold Transaction', onClick: () => {}, isClicked: false },
  { id: 33, title: 'Recall Transaction', onClick: () => {}, isClicked: false },
  { id: 34, title: 'Add Note', onClick: () => {}, isClicked: false },
  {
    id: 35,
    title: 'Change Payment Method',
    onClick: () => {},
    isClicked: false,
  },
  { id: 36, title: 'Verify Age', onClick: () => {}, isClicked: false },
  { id: 37, title: 'Scan Coupon', onClick: () => {}, isClicked: false },
  { id: 38, title: 'Email Receipt', onClick: () => {}, isClicked: false },
  { id: 39, title: 'Adjust Quantity', onClick: () => {}, isClicked: false },
  { id: 40, title: 'Check Promotions', onClick: () => {}, isClicked: false },
  { id: 41, title: 'Add Tax', onClick: () => {}, isClicked: false },
  { id: 42, title: 'Remove Tax', onClick: () => {}, isClicked: false },
  {
    id: 43,
    title: 'View Transaction History',
    onClick: () => {},
    isClicked: false,
  },
  { id: 44, title: 'Process Exchange', onClick: () => {}, isClicked: false },
  { id: 45, title: 'Add Service Fee', onClick: () => {}, isClicked: false },
  {
    id: 46,
    title: 'Check Gift Card Balance',
    onClick: () => {},
    isClicked: false,
  },
  { id: 47, title: 'Reprint Receipt', onClick: () => {}, isClicked: false },
  { id: 48, title: 'Apply Bulk Discount', onClick: () => {}, isClicked: false },
  { id: 49, title: 'Complete Sale', onClick: () => {}, isClicked: false },
  { id: 50, title: 'Customer Feedback', onClick: () => {}, isClicked: false },
];

type Props = {
  theme: Themes;
};

const SideMenu = ({ theme }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-0.5 h-full pb-1 pr-1">
      {items.map((button) => {
        const colors = getButtonColors({ button, theme });
        return (
          <button
            type="button"
            key={button.id}
            id={`button-${button.id}`}
            className={`${colors.textColor} ${colors.background}
             hover:bg-gradient-to-br 
            focus:scale-3d focus:outline-none dark:focus:ring-blue-800 
            font-medium rounded-md text-lg text-center transition-all duration-75
            ${button.isClicked ? 'scale-110' : 'scale-100'}`}
          >
            {button.title}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;*/

import { useState } from 'react';
import { type ButtonItem, type SubMenu } from 'types/types';
import { type Themes } from 'types/types';
import SubMenuModal from '../common/SubMenuModal';
import ButtonsGrid from '../common/ButtonsGrid';

type Props = {
  buttons: ButtonItem[];
  theme?: Themes;
};

const BottomMenu = ({ buttons, theme }: Props) => {
  //const [buttonsList, setButtons] = useState<ButtonItem[]>(buttons);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubMenu, setSelectedSubMenu] = useState<SubMenu | null>(null);

  const handleOnClick = (button: ButtonItem): void => {
    if (button.subMenu) {
      setSelectedSubMenu(button.subMenu);
      setModalOpen(true);
    }

    if (button.onClick) {
      button.onClick();
    }
  };

  const handleOnCloseSubmenuModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full pl-1">
      <ButtonsGrid
        buttons={buttons}
        theme={theme}
        gridClassName={undefined}
        itemsPerPage={12}
        minRowHeight="52px"
        minColWidth="70"
        gap="gap-0.5"
        containerClassName="h-96"
        buttonClassName="rounded-md"
        onButtonClick={handleOnClick}
      />
      <SubMenuModal
        isOpen={modalOpen}
        buttons={selectedSubMenu?.buttons || []}
        title={selectedSubMenu?.title || ''}
        onClose={handleOnCloseSubmenuModal}
      />
    </div>
  );
};

export default BottomMenu;

/*import type { ButtonItem } from 'types/types'; // Adjust the path as needed
import { motion } from 'framer-motion';
import { type Themes } from 'types/types';
import ButtonsGrid from './ButtonsGrid';

type Props = {
  isOpen: boolean;
  buttons: ButtonItem[];
  title: string;
  onClose: () => void;
  theme?: Themes;
};

// Constantes para el cálculo de altura
const ROW_HEIGHT = 52; // Altura mínima por fila (px)
const GAP = 1; // Espacio entre filas (gap-0.5 ≈ 2px)
const EXTRA_PADDING = 48; // Padding para título, márgenes y espacio adicional
const MIN_HEIGHT = ROW_HEIGHT + EXTRA_PADDING; // Altura mínima (1 fila + padding)
const MAX_HEIGHT = ROW_HEIGHT * 4 + GAP * 3 + EXTRA_PADDING; // Altura máxima (4 filas + padding)

const SubMenuModal = ({ isOpen, buttons, title, theme, onClose }: Props) => {
  //const [buttonList, setButtons] = useState<ButtonItem[]>([]);

  const handleOnClick = (button: ButtonItem): void => {
    if (button.onClick) {
      button.onClick();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-1/12 left-1/12 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-2 shadow-lg flex flex-col gap-1"
        onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-black">
            X
          </button>
        </div>
        <ButtonsGrid
          buttons={buttons}
          theme={theme}
          minRowHeight="52px"
          minColWidth="70px"
          gap="gap-0.5"
          minheight={MIN_HEIGHT}
          maxHeight={MAX_HEIGHT}
          containerClassName="h-full"
          gridClassName={theme}
          buttonClassName="rounded-lg"
          onButtonClick={handleOnClick}
          minWidth={'450px'}
        />
      </motion.div>
    </div>
  );
};

export default SubMenuModal;*/

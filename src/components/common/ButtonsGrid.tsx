import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { type ButtonItem, type Themes } from 'types/types';
import { getButtonColors } from '../../helpers/getButtonColors';
import { useSwipeable } from 'react-swipeable';
import DotNavigation from './DotNavigation';

type Props = {
  buttons: ButtonItem[];
  theme?: Themes;
  containerClassName?: string;
  itemsPerPage?: number;
  minRowHeight?: string;
  minColWidth?: string;
  gap?: string;
  gridClassName?: string;
  buttonClassName?: string;
  onButtonClick: (button: ButtonItem) => void;
  minheight?: number;
  maxHeight?: number;
  minWidth?: string;
};

// Constantes para el cálculo de altura
const ROW_HEIGHT_PX = 52; // Altura mínima por fila (px)
const GAP_PX = 1; // Espacio entre filas (gap-0.5 ≈ 2px)
const EXTRA_PADDING_PX = 48; // Padding para título, márgenes y espacio adicional

const ButtonsGrid = ({
  buttons,
  theme,
  containerClassName = '',
  itemsPerPage = 12,
  minRowHeight = '52px',
  minColWidth = '70px',
  gap = 'gap-0.5',
  gridClassName = '',
  buttonClassName = '',
  onButtonClick,
  minheight,
  maxHeight,
  minWidth,
}: Props) => {
  const [buttonList, setButtonList] = useState<ButtonItem[]>(buttons);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalPages = Math.ceil(buttonList.length / itemsPerPage);

  const currentItems = buttonList.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // calculamos el numero de filas para la pagina
  const numRows = Math.ceil(currentItems.length / 3);

  // calculo de dimanciones
  const calculateHight =
    numRows * ROW_HEIGHT_PX + (numRows - 1) * GAP_PX + EXTRA_PADDING_PX;
  const contentHeight =
    minheight && maxHeight
      ? Math.max(minheight, Math.min(calculateHight, maxHeight))
      : calculateHight;

  //SWIP
  const handleOnSwip = useSwipeable({
    onSwipedLeft: () => {
      if (currentPage < totalPages - 1) {
        setDirection(1);
        setCurrentPage(currentPage + 1);
      }
    },

    onSwipedRight: () => {
      if (currentPage > 0) {
        setDirection(-1);
        setCurrentPage(currentPage - 1);
      }
    },
    trackMouse: true, //for testing
  });

  //ANIMATION
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const handleOnClick = (button: ButtonItem): void => {
    if (onButtonClick) {
      onButtonClick(button);
    }

    if (button.onClick) {
      button.onClick();
    }

    setButtonList((prev) =>
      prev.map((item) =>
        item.id === button.id ? { ...item, isClicked: !item.isClicked } : item
      )
    );

    setTimeout(() => {
      setButtonList((prev) =>
        prev.map((item) =>
          item.id === button.id ? { ...item, isClicked: !item.isClicked } : item
        )
      );
    }, 50);
  };

  return (
    <div
      {...(totalPages > 1 ? handleOnSwip : {})}
      className={`flex flex-col ${containerClassName}`}
      style={{
        height: minheight && maxHeight ? `${contentHeight}px` : undefined,
        minWidth: minWidth ? minWidth : undefined,
      }}
    >
      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`absolute inset-0 grid grid-cols-3 ${gap} w-full h-auto
                           auto-rows-min ${gridClassName}`}
          >
            {currentItems.map((elem) => {
              const colors = getButtonColors({ button: elem, theme });
              return (
                <div
                  key={elem.id}
                  className={`min-h-[${minRowHeight}] min-w-[${minColWidth}] flex items-center justify-center`}
                >
                  <motion.button
                    type="button"
                    id={`button-${elem.id}`}
                    onClick={() => handleOnClick(elem)}
                    animate={{ scale: elem.isClicked ? 1.1 : 1 }}
                    transition={{ duration: 0.075, ease: 'easeInOut' }}
                    className={`${colors.textColor} ${colors.background}
                                hover:bg-gradient-to-br  w-full h-full p-1
                                focus:outline-non overflow-hidden text-ellipsis break-words
                                font-medium rounded-md text-base text-center whitespace-nowrap
                                ${buttonClassName}`}
                  >
                    {elem.title}
                  </motion.button>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      {totalPages > 1 && (
        <DotNavigation totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
};

export default ButtonsGrid;

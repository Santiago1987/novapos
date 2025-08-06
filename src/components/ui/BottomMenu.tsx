import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  { id: 1, button: 'One', isClicked: false },
  { id: 2, button: 'Two', isClicked: false },
  { id: 3, button: 'Three', isClicked: false },
  { id: 4, button: 'Four', isClicked: false },
  { id: 5, button: 'Five', isClicked: false },
  { id: 6, button: 'Six', isClicked: false },
  { id: 7, button: 'Seven', isClicked: false },
  { id: 8, button: 'Eight', isClicked: false },
  { id: 9, button: 'Nine', isClicked: false },
  { id: 10, button: 'Ten', isClicked: false },
  { id: 11, button: 'Eleven', isClicked: false },
  { id: 12, button: 'Twelve', isClicked: false },
  { id: 13, button: 'Twelve', isClicked: false },
  { id: 14, button: 'Thirteen', isClicked: false },
  { id: 15, button: 'Fourteen', isClicked: false },
  { id: 16, button: 'Fifteen', isClicked: false },
  { id: 17, button: 'Sixteen', isClicked: false },
  { id: 18, button: 'Seventeen', isClicked: false },
  { id: 19, button: 'Eighteen', isClicked: false },
  { id: 20, button: 'Nineteen', isClicked: false },
  { id: 21, button: 'Twenty', isClicked: false },
  { id: 22, button: 'Twenty', isClicked: false },
  { id: 23, button: 'Twenty', isClicked: false },
  { id: 24, button: 'Twenty', isClicked: false },
];

const BottomMenu = () => {
  const [buttonsList, setButtons] = useState(items);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = buttonsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /*const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };*/

  // SWIP
  const handleOnSwip = useSwipeable({
    onSwipedLeft: () => {
      if (currentPage < totalPages) {
        setDirection(1);
        setCurrentPage(currentPage + 1);
      }
    },

    onSwipedRight: () => {
      if (currentPage > 1) {
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

  const handleOnClick = (elem: {
    id: number;
    button: string;
    isClicked: boolean;
  }): void => {
    setButtons((prev) =>
      prev.map((item) =>
        item.id === elem.id ? { ...item, isClicked: !item.isClicked } : item
      )
    );

    setTimeout(() => {
      setButtons((prev) =>
        prev.map((item) =>
          item.id === elem.id ? { ...item, isClicked: !item.isClicked } : item
        )
      );
    }, 50);
  };

  return (
    <div {...handleOnSwip} className="flex flex-col w-full h-full">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <div className="relative h-96 w-full overflow-hidden">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 grid grid-cols-3 grid-rows-4 pl-1 pb-1 rounded-md gap-0.5 align-middle h-full w-full"
            layout
          >
            {currentItems.map((elem, index) => (
              <div
                key={index}
                className="min-h-[52px] min-w-[70px] flex items-center justify-center"
              >
                <motion.button
                  layout
                  type="button"
                  id={`button-${index}`}
                  onClick={() => handleOnClick(elem)}
                  animate={{ scale: elem.isClicked ? 1.1 : 1 }}
                  transition={{ duration: 0.075, ease: 'easeInOut' }}
                  className={`text-white bg-gradient-to-r from-green-950  w-full h-full
          via-green-900 to-green-950 hover:bg-gradient-to-br 
          focus:outline-non overflow-hidden text-ellipsis
          font-medium rounded-md text-lg text-center`}
                >
                  {elem.button}
                </motion.button>
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatePresence>
      <div className="flex justify-center mt-1 mb-1 items-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentPage - 1 ? 'bg-blue-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomMenu;

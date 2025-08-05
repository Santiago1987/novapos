import { useState } from 'react';

const items = [
  { button: 'One', isClicked: false },
  { button: 'Two', isClicked: false },
  { button: 'Three', isClicked: false },
  { button: 'Four', isClicked: false },
  { button: 'Five', isClicked: false },
  { button: 'Six', isClicked: false },
  { button: 'Seven', isClicked: false },
  { button: 'Eight', isClicked: false },
  { button: 'Nine', isClicked: false },
  { button: 'Ten', isClicked: false },
  { button: 'Eleven', isClicked: false },
  { button: 'Twelve', isClicked: false },
  { button: 'Twelve', isClicked: false },
  { button: 'Thirteen', isClicked: false },
  { button: 'Fourteen', isClicked: false },
  { button: 'Fifteen', isClicked: false },
  { button: 'Sixteen', isClicked: false },
  { button: 'Seventeen', isClicked: false },
  { button: 'Eighteen', isClicked: false },
  { button: 'Nineteen', isClicked: false },
  { button: 'Twenty', isClicked: false },
];

const BottomMenu = () => {
  const [buttonsList, setButtons] = useState(items);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = buttonsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    console.log('Next page clicked ' + currentPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    console.log('prevPage page clicked ' + currentPage);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    const buttID = e.currentTarget.id;
    const index = parseInt(buttID.split('-')[1], 10);
    setButtons((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, isClicked: !item.isClicked } : item
      )
    );

    setTimeout(() => {
      setButtons((prev) =>
        prev.map((item, idx) =>
          idx === index ? { ...item, isClicked: !item.isClicked } : item
        )
      );
    }, 50);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="grid grid-cols-3 grid-rows-4 pl-1 pb-1 rounded-md gap-0.5 align-middle h-96 w-full">
        {currentItems.map((elem, index) => (
          <button
            type="button"
            key={index}
            id={`button-${index}`}
            onClick={handleOnClick}
            className={`text-white bg-gradient-to-r from-green-950 
          via-green-900 to-green-950 hover:bg-gradient-to-br 
          focus:scale-3d focus:outline-none dark:focus:ring-blue-800 
          font-medium rounded-md text-lg text-center transition-all duration-75
          ${elem.isClicked ? 'scale-110' : 'scale-100'}`}
          >
            {elem.button}
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-1 mb-1 items-center gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className=" disabled:opacity-50 text-xs w-3 h-3 text-center"
        >
          {'<'}
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentPage - 1 ? 'bg-blue-500' : 'bg-gray-400'
            }`}
          />
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 text-xs w-3 h-3 text-center"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default BottomMenu;

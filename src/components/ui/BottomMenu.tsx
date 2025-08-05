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
];

const BottomMenu = () => {
  const [buttonsList, setButtons] = useState(items);

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
    <div className="grid grid-cols-3 grid-rows-4 pl-1 pb-1 rounded-md gap-0.5 align-middle h-full">
      {buttonsList.map((elem, index) => (
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
  );
};

export default BottomMenu;

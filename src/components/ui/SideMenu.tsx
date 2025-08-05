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
  { button: 'Printer', isClicked: false },
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
  { button: 'Printer', isClicked: false },
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
  { button: 'Printer', isClicked: false },
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
  { button: 'Ten', isClicked: false },
];

const SideMenu = () => {
  return (
    <div className="grid grid-cols-5 gap-0.5 h-full pb-1 pr-1">
      {items.map((elem, index) => (
        <button
          type="button"
          key={index}
          id={`button-${index}`}
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

export default SideMenu;

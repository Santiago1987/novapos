const NumbersButtons = () => {
  /*const [buttonsList, setButtons] = useState(items);

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
    };*/
  const commonStyles =
    'bg-white text-green-950 rounded-xs font-bold w-full h-full aspect-square border-2 border-green-950';
  return (
    <div className="grid grid-cols-4 grid-rows-5 gap-0.5 h-full pb-1">
      <button type="button" className={`col-1 row-1 ${commonStyles}`}>
        Clear
      </button>
      <button type="button" className={`col-2 row-1 ${commonStyles}`}>
        X
      </button>
      <button type="button" className={`col-3 row-1 ${commonStyles}`}>
        {'<--'}
      </button>
      <button type="button" className={`col-3 row-2 ${commonStyles}`}>
        9
      </button>
      <button type="button" className={`col-2 row-2 ${commonStyles}`}>
        8
      </button>
      <button type="button" className={`col-1 row-2 ${commonStyles}`}>
        7
      </button>
      <button type="button" className={`col-3 row-3 ${commonStyles}`}>
        6
      </button>
      <button type="button" className={`col-2 row-3 ${commonStyles}`}>
        5
      </button>
      <button type="button" className={`col-1 row-3 ${commonStyles}`}>
        4
      </button>
      <button type="button" className={`col-3 row-4 ${commonStyles}`}>
        3
      </button>
      <button type="button" className={`col-2 row-4 ${commonStyles}`}>
        2
      </button>
      <button type="button" className={`col-1 row-4 ${commonStyles}`}>
        1
      </button>
      <button type="button" className={` col-1 row-5 ${commonStyles}`}>
        0
      </button>
      <button type="button" className={`col-2 row-5 ${commonStyles}`}>
        00
      </button>
      <button type="button" className={`col-3 row-5 ${commonStyles}`}>
        ,
      </button>
      <button type="button" className={`col-4 row-span-2 ${commonStyles}`}>
        PLU
      </button>
      <button type="button" className={`col-4 row-span-3 ${commonStyles}`}>
        Enter
      </button>
    </div>
  );
};

export default NumbersButtons;

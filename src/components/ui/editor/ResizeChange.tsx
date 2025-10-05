type Props = {
  width: string;
  height: string;
  handleOnResizeManualChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'width' | 'height'
  ) => void;
  handleOnResizeEnd: () => void;
};
const ResizeChange = ({
  width,
  height,
  handleOnResizeManualChange,
  handleOnResizeEnd,
}: Props) => {
  return (
    <>
      <div className="p1 text-xl">Dimension settings</div>
      <label>Width:</label>
      <input
        type="text"
        className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
        value={width}
        onChange={(e) => handleOnResizeManualChange(e, 'width')}
      />
      <label>Height:</label>
      <input
        type="text"
        className="w-11/12 h-10 border-solid border-2 border-gray-300 rounded-lg p-1"
        value={height}
        onChange={(e) => handleOnResizeManualChange(e, 'height')}
      />
      <button
        className="w-11/12 h-10 bg-blue-500 text-white rounded-lg mt-2"
        onClick={handleOnResizeEnd}
      >
        Close
      </button>
    </>
  );
};

export default ResizeChange;

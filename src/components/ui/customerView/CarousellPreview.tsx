type Props = {
  id: string;
};
const CarousellPreview = ({ id }: Props) => {
  return (
    <>
      <div
        className="absolute top-5 left-5 w-50 h-50 rounded-2xl border-solid border-2 
        shadow-lg shadow-gray-400/50"
      ></div>
    </>
  );
};

export default CarousellPreview;

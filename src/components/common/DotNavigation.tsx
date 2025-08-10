type Props = {
  totalPages: number;
  currentPage: number;
};

const DotNavigation = ({ totalPages, currentPage }: Props) => {
  return (
    <div className="flex justify-center mt-1 mb-1 items-center gap-2">
      {Array.from({ length: totalPages }).map((_, index) => (
        <span
          key={index}
          className={`w-2 h-2 rounded-full ${
            index === currentPage ? 'bg-blue-500' : 'bg-gray-400'
          }`}
        />
      ))}
    </div>
  );
};

export default DotNavigation;

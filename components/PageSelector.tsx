export default function PageSelector({
  pageCount,
  currentPage,
  setPage,
}: {
  pageCount: number;
  currentPage: number;
  setPage: (page: number) => void;
}) {
  return (
    <div className='flex justify-center items-center gap-2 text-lg p-8'>
      <div
        onClick={currentPage > 1 ? () => setPage(currentPage - 1) : undefined}
        className='cursor-pointer w-7 h-7 mx-2 flex justify-center items-center rounded-full bg-gray-700'
      >
        {'<'}
      </div>
      {Array.from({ length: pageCount }).map((val, index) => {
        return (
          <div
            key={index}
            onClick={
              index + 1 !== currentPage ? () => setPage(index + 1) : undefined
            }
            className={'cursor-pointer border-2 rounded-lg border-gray-700 w-8 h-8 shrink-0 flex justify-center '.concat(
              index + 1 == currentPage
                ? 'font-bold text-white  bg-gray-700'
                : 'text-gray-500  bg-gray-950'
            )}
          >
            {index + 1}
          </div>
        );
      })}
      <div
        onClick={
          currentPage < pageCount ? () => setPage(currentPage + 1) : undefined
        }
        className='cursor-pointer w-7 h-7 mx-2 flex justify-center items-center rounded-full bg-gray-700'
      >
        {'>'}
      </div>
    </div>
  );
}

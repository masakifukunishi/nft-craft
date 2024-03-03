import Spinner from "@/components/atoms/Spinner";

type Props = {
  hasMore: boolean;
  fetchMore: () => void;
  isFetchingMore: boolean;
};

const ReadMore = ({ hasMore, fetchMore, isFetchingMore }: Props) => {
  return (
    <>
      {hasMore && (
        <div className="flex justify-center mt-10">
          {isFetchingMore ? (
            <div className="mt-2">
              <Spinner size={25} borderWidth={3} />
            </div>
          ) : (
            <button className="border border-1 py-1.5 px-3 rounded-md" onClick={fetchMore}>
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ReadMore;

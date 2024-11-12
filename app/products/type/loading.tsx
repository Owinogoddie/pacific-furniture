import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="all-products">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="products">
          <Skeleton className="mobile-skeleton" height={"12em"} />
          <Skeleton className="mobile-skeleton" width={292} />
          <Skeleton className="mobile-skeleton" width={60} />
        </div>
      ))}
    </div>
  );
}
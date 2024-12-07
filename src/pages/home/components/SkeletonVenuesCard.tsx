export const SkeletonVenuesCard = () => {
  return (
    <div className="rounded-lg border border-neutral-default bg-neutral-white shadow p-4">
      <div className="w-full h-48 bg-neutral-default rounded mb-4 animate-pulse"></div>

      <div className="h-6 bg-neutral-default mb-2 w-3/4 animate-pulse"></div>

      <div className="flex items-center gap-1 mb-4">
        <div className="h-4 w-4 bg-neutral-default rounded-full animate-pulse"></div>
        <div className="h-4 bg-neutral-default rounded w-1/2 animate-pulse"></div>
      </div>

      <div className="border-t border-neutral-default mb-3"></div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-1">
          <div className="h-4 w-16 bg-neutral-default rounded animate-pulse"></div>
          <div className="h-4 w-10 bg-neutral-default rounded animate-pulse"></div>
        </div>

        <div className="flex flex-col items-end space-y-1">
          <div className="h-6 w-12 bg-neutral-default rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-neutral-default rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

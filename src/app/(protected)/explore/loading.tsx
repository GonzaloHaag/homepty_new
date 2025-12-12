export default function Loading() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 w-full h-[500px] bg-gray-300 rounded animate-pulse"></div>
        <div className="col-span-1 w-full h-[500px] bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

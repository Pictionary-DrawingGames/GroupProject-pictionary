export default function Timer() {
  return (
    <>
      <div className="flex flex-col gap-y-1 w-fit justify-center items-center bg-white p-2 border-2 border-[#431407] rounded-lg">
        <p className="font-bold text-orange-500 text-xs">TIME</p>
        <p>60 seconds left</p>
      </div>
    </>
  );
}

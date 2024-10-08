export default function DrawingBoard() {
  return (
    <>
      <div className="flex flex-col items-center relative pt-4">
        <p className="absolute top-10">Lampu</p>
        <h1 className="font-bold absolute top-0 bg-[#FFBF1F] border-2 rounded-full px-4 py-1 border-[#431407] text-xs">
          YOU ARE THE DRAWER
        </h1>
        <canvas
          id="gameCanvas"
          width={400}
          height={400}
          //   ref={canvasRef}
          className="bg-white rounded-lg border-2 border-[#431407]"
        ></canvas>
      </div>
    </>
  );
}

import { useState } from "react";
import "./App.css";
import { areas } from "./data";
import Slider from "./components/Slider";
function App() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [data] = useState(areas);
  const handleAreaClick = (area) => {
    setSelectedArea(area);
  };
  const boxStyle =
    "border border-gray-600 bg-gray-800 text-white rounded-lg flex flex-col items-center justify-center w-64 h-48 p-6";
  const renderStatsBox = () => {
    if (!selectedArea) return null;
    const stats = selectedArea.stats;
    const remarks = stats?.Remarks;
    console.log("rem", remarks);
    return (
      <div className="flex flex-col gap-4">
        {stats &&
          Object.entries(stats).map(([key, value], index) => (
            <div className={boxStyle} key={index}>
              <p className="text-lg capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </p>
              <p
                className={`${
                  remarks === undefined
                    ? "text-3xl font-bold mt-2"
                    : "text-md font-bold mt-2"
                }`}
              >
                {value}
              </p>
            </div>
          ))}
      </div>
    );
  };
  return (
    <div className="bg-black text-white min-h-screen w-screen flex flex-col">
      {/* Header */}
      <div className="px-6 py-4">
        <img
          src="/galaxeye white.png"
          alt="Logo"
          className="h-12 w-auto object-contain"
        />
      </div>
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row items-center flex-1 gap-6 px-6">
        {/* Left Panel - Area Buttons */}
        <div className="w-full lg:w-1/4 flex flex-col items-center">
          <nav className="flex flex-col items-center gap-3">
            {data.map((area, index) => (
              <button
                key={index}
                onClick={() => handleAreaClick(area)}
                className="
                  w-[260px] h-[50px]
                  text-gray-800 bg-white
                  border border-gray-300
                  hover:bg-blue-50 hover:border-blue-400
                  focus:outline-none focus:ring-2 focus:ring-blue-300
                  font-medium rounded-md text-base
                  px-4 py-2 transition-all duration-200
                  shadow-sm
                  dark:bg-gray-800 dark:text-white dark:border-gray-600
                  dark:hover:bg-gray-700 dark:focus:ring-blue-700
                "
              >
                {area.name}
              </button>
            ))}
          </nav>
        </div>
        {/* Center Panel - Image */}
        <div className="w-full lg:w-2/4 flex items-center justify-center">
          {selectedArea ? (
            selectedArea?.img?.length === 2 ? (
              <Slider img={selectedArea?.img} key={selectedArea.name} />
            ) : (
              <img
                src={selectedArea?.img[0]}
                alt={selectedArea?.name}
                className="w-full h-full object-contain
                transition-transform duration-300 hover:scale-105
                rounded-lg shadow-md
              "
              />
            )
          ) : null}
        </div>
        {/* Right Panel - Stats */}
        <div className="w-full lg:w-1/4 flex items-center justify-center">
          {renderStatsBox()}
        </div>
      </div>
    </div>
  );
}
export default App;
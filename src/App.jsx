import { useState } from "react";
import "./App.css";
import { areas } from "./data";
import Slider from "./components/Slider";

function App() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [data, setData] = useState(areas);

  const handleAreaClick = (area) => {
    setSelectedArea(area);
  };

  // Conditionally render two stacked boxes, either stats or changes
  const renderStatsBox = () => {
    if (!selectedArea) return null;

    if (selectedArea.stats) {
      return (
        <div className="flex flex-col gap-4">
          {/* Box #1 */}
          <div
            className="
            border border-gray-600 bg-gray-800 text-white rounded 
            flex flex-col items-center justify-center 
            w-64 h-48 p-6
          "
          >
            <p className="text-lg">Total Trees</p>
            <p className="text-3xl font-bold mt-2">
              {selectedArea.stats.totalTrees}
            </p>
          </div>

          {/* Box #2 */}
          <div
            className="
            border border-gray-600 bg-gray-800 text-white rounded 
            flex flex-col items-center justify-center 
            w-64 h-48 p-6
          "
          >
            <p className="text-lg">Total Area (in acre)</p>
            <p className="text-3xl font-bold mt-2">
              {selectedArea.stats.totalArea}
            </p>
          </div>
        </div>
      );
    }

    if (selectedArea.changes) {
      return (
        <div className="flex flex-col gap-4">
          {/* Box #1 */}
          <div
            className="
            border border-gray-600 bg-gray-800 text-white rounded 
            flex flex-col items-center justify-center 
            w-64 h-48 p-6
          "
          >
            <p className="text-lg">Pond Split</p>
            <p className="text-3xl font-bold mt-2">
              {selectedArea.changes.pondSplit}
            </p>
          </div>

          {/* Box #2 */}
          <div
            className="
            border border-gray-600 bg-gray-800 text-white rounded 
            flex flex-col items-center justify-center 
            w-64 h-48 p-6
          "
          >
            <p className="text-lg">Pond Merge</p>
            <p className="text-3xl font-bold mt-2">
              {selectedArea.changes.pondMerge}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-black text-white min-h-screen w-screen flex flex-col">
      {/* Top bar: Logo */}
      <div className="px-10 py-3 h-12 w-auto">
        <img src="/galaxeye white.png" alt="Logo" className="h-12 w-auto" />
      </div>
      <div className="flex flex-col md:flex-row flex-1 px-5">
        <div className="w-full md:w-[680px] flex flex-col items-center justify-center">
          <nav className="flex flex-col items-start gap-2 mt-2 md:mt-2">
            {data.map((area, index) => (
              <button
                key={index}
                onClick={() => handleAreaClick(area)}
                className="
                  w-[280px] h-[55px]
                  text-gray-800
                  bg-white
                  border border-gray-300
                  hover:bg-blue-50
                  hover:border-blue-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-300
                  font-medium
                  rounded-lg
                  text-base
                  px-4 py-2
                  transition-all duration-200
                  shadow-sm
                  dark:bg-gray-800
                  dark:text-white
                  dark:border-gray-600
                  dark:hover:bg-gray-700
                  dark:focus:ring-blue-700
                "
              >
                {area.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="w-full md:w-4/4 flex items-center justify-center">
          {selectedArea?.img && (
            <img
              src={selectedArea?.img[0]}
              className="w-[560px] h-[560px] object-contain transition-transform duration-300 hover:scale-105"
              alt={selectedArea?.name}
            />
          )}
        </div>
        <div className="w-full md:w-1/5 flex items-center justify-center py-4 pr-7 md:py-20">
          {renderStatsBox()}
        </div>
      </div>
    </div>
  );
}

export default App;
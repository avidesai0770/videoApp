import { useState } from "react"
import "./App.css"
import Player from "./components/player/player"

import { data } from "../src/constants/constants.js"
import PlayList from "./components/playList/PlayList.jsx"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
function App() {
  const [selectedData, setSelectedData] = useState()
  const handleClickPlayList = (data) => {
    setSelectedData(data)
  }

  return (
    <div className="max-w-[1200px] flex m-auto  flex-wrap items-start gap-[15px]">
      <div className="bg-gray-0 shadow-md p-4 flex-grow flex-shrink ">
        <Player playlist={data} vidieoData={selectedData} />
      </div>
      <div className="flex-1  shadow-md flex-shrink-1 flex-basis-300 py-3">
        <DndProvider backend={HTML5Backend}>
          <PlayList onSlelect={handleClickPlayList} />
        </DndProvider>
      </div>
    </div>
  )
}

export default App

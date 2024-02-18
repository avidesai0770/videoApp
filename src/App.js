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
    console.log("click", data)
    setSelectedData(data)
  }

  return (
    <div className="max-w-[1200px] flex m-auto flex-wrap items-start gap-[20px] App">
      <div className="bg-white p-4 flex-grow flex-shrink flex-basis-700">
        <Player playlist={data} vidieoData={selectedData} />
      </div>
      <div className="flex-1 flex-shrink-1 flex-basis-300  py-3 ">
        <DndProvider backend={HTML5Backend}>
          <PlayList onSlelect={handleClickPlayList} />
        </DndProvider>
      </div>
    </div>

    //   <div class="container">
    // 	<div class="main-video-container">
    // 		<video src="images/vid-9.mp4" loop controls class="main-video"></video>
    // 		<h3 class="main-vid-title">3D helicopter animation</h3>
    // 	</div>
    // 	<div class="video-list-container" id="videosList"></div>
    // </div>
  )
}

export default App

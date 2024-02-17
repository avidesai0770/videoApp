import { useState } from "react"
import "./App.css"
import Player from "./components/player/player"

import { data } from "../src/constants/constants.js"
import PlayList from "./components/playList/PlayList.jsx"

function App() {
  const [selectedData, setSelectedData] = useState()
  const handleClickPlayList = (data) => {
    console.log("click", data)
    setSelectedData(data)
  }

  return (
    <div className="flex items-center justify-center flex-col md:flex-row h-screen">
      <div>
        <Player playlist={data} vidieoData={selectedData} />
      </div>
      <div>
        <PlayList onSlelect={handleClickPlayList} />
      </div>
    </div>
  )
}

export default App

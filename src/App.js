import { useState } from "react"
import "./App.css"
import Player from "./components/player/player"
import PlayList from "./components/playList/PlayList"
import { data } from "../src/constants/constants.js"

function App() {
  // const [playlist, setPlaylist] = useState([
  //   {
  //     id: "1",
  //     description:
  //       "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
  //     sources: [
  //       "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  //     ],
  //     subtitle: "By Google",
  //     thumb: "images/ForBiggerBlazes.jpg",
  //     title: "For Bigger Blazes",
  //   },
  //   {
  //     id: "2",
  //     description:
  //       "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
  //     sources: [
  //       "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  //     ],
  //     subtitle: "By Google",
  //     thumb: "images/ForBiggerEscapes.jpg",
  //     title: "For Bigger Escape",
  //   },
  //   {
  //     id: "3",
  //     description:
  //       "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.",
  //     sources: [
  //       "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  //     ],
  //     subtitle: "By Google",
  //     thumb: "images/ForBiggerFun.jpg",
  //     title: "For Bigger Fun",
  //   },
  //   {
  //     id: "4",
  //     description:
  //       "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.",
  //     sources: [
  //       "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  //     ],
  //     subtitle: "By Google",
  //     thumb: "images/ForBiggerJoyrides.jpg",
  //     title: "For Bigger Joyrides",
  //   },
  // ])
  const [selectedData, setSelectedData] = useState()

  const handleClickPlayList = (data) => {
    console.log("click", data)
    setSelectedData(data)
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <Player playlist={data} vidieoData={selectedData} />
      <div className="flex my-4 w-full justify-center">
        <PlayList onSlelect={handleClickPlayList} />
      </div>
    </div>
  )
}

export default App

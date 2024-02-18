import { VolumeDown, VolumeUp } from "@mui/icons-material"
import React, { useEffect } from "react"
import { useRef, useState } from "react"
import { PlayArrowSharp, Pause } from "@mui/icons-material"
import { Fullscreen } from "@mui/icons-material"
import { Minimize } from "@mui/icons-material"
import "./player.css"

export default function Player({ playlist, vidieoData }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullView, setFullView] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [volume, setVolume] = useState(0)
  const [currentTime, setCurrentTime] = useState(10)
  const [videoIndex, setVideoIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }
  const handleVolume = (vol) => {
    setVolume(vol)
    videoRef.current.volume = vol
  }

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed)
    videoRef.current.playbackRate = speed
  }

  const handleFullView = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch((err) => {
        console.log(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        )
      })
    } else {
      setFullView(false)
      document.exitFullscreen()
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime)
  }

  const handleSeek = (time) => {
    console.log("t", time)
    videoRef.current.currentTime = time
    setCurrentTime(time)
  }

  // function convertSecondsToMinutesAndSeconds(currentTime) {
  //   var minutes = Math.floor(seconds / 60)
  //   var remainingSeconds = seconds % 60
  //   return  minutes  + remainingSeconds
  // }

  function convertionOfDurationToMinutesAndSeconds(durationInSeconds) {
    var minutes = Math.floor(durationInSeconds / 60)
    var seconds = Math.floor(durationInSeconds % 60)
    return { minutes: minutes, seconds: seconds }
  }

  var durationInSeconds = videoRef.current ? videoRef.current.duration : 0
  var timeObj = convertionOfDurationToMinutesAndSeconds(durationInSeconds)

  const handleVideoEnd = () => {
    if (videoIndex < playlist.length - 1) {
      setVideoIndex(videoIndex + 1)
    } else {
      setVideoIndex(0)
    }
  }

  return (
    <div className="flex flex-col">
      <div
        className="relative block"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => {
          setIsHovered(false)
        }}>
        <video
          onTimeUpdate={handleTimeUpdate}
          ref={videoRef}
          src={vidieoData?.sources || playlist?.[0]?.sources}
          onClick={handlePlayPause}
          // onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          playbackRate={playbackSpeed}
          height={800}
          width={900}></video>
        {/* {isHovered ? ( */}
        <div className="absolute bottom-0 flex bg-slate-600 bg-opacity-30  text-black">
          <button onClick={handlePlayPause}>
            {isPlaying ? <Pause color="#ffff" /> : <PlayArrowSharp />}
          </button>

          <VolumeDown color="white" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => handleVolume(e.target.value)}
          />
          <VolumeUp />
          <input
            type="range"
            min={0}
            max={videoRef.current ? videoRef.current.duration : 0}
            value={currentTime}
            onChange={(e) => handleSeek(e.target.value)}
            className="mx-2"
          />
          <span className="text-black">
            {Math.floor(currentTime / 60) + ":" + Math.floor(currentTime % 60)}{" "}
            / {Math.floor(videoRef.current ? videoRef.current.duration : 0)}
          </span>

          <h4 className="mr-1">Speed</h4>
          <select
            value={playbackSpeed}
            onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}>
            <option value={0.5}>0.5x</option>
            <option value={1}>Normal</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
          <button onClick={handleFullView}>
            {isFullView ? <Minimize /> : <Fullscreen />}
          </button>
        </div>
        {/* ) : null} */}
      </div>
      <h1>{vidieoData?.title}</h1>
    </div>
  )
}

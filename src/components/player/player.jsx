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
  const [currentTime, setCurrentTime] = useState(0)
  const [saveTime, SetSaveTime] = useState(0)
  const [videoIndex, setVideoIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const savedTime = localStorage.getItem(`video-${playlist?.sources}-time`)
    if (savedTime) {
      SetSaveTime(parseFloat(savedTime))
    }
  }, [playlist?.sources])

  useEffect(() => {
    const intervalId = setInterval(() => {
      localStorage.setItem(
        `video-${playlist?.sources}-time`,
        currentTime.toString()
      )
    }, 1000)
    return () => clearInterval(intervalId)
  }, [playlist?.sourcesrc, currentTime])

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
      videoRef.current.requestFullscreen()
    } else {
      setFullView(false)
      document.exitFullscreen()
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime)
  }

  const handleSeek = (time) => {
    videoRef.current.currentTime = time
    SetSaveTime(parseFloat(time))
  }

  const handleVideoEnd = () => {
    if (videoIndex < playlist.length - 1) {
      setVideoIndex(videoIndex + 1)
    } else {
      setVideoIndex(0)
    }
  }
  const handleCanPlay = () => {
    videoRef.current.currentTime = saveTime
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
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onClick={handlePlayPause}
          onPlay={handleCanPlay}
          className="rounded-md"
          src={vidieoData?.sources || playlist?.[0]?.sources}
          // onTimeUpdate={handleTimeUpdate}
          playbackRate={playbackSpeed}
          height={800}
          width={900}></video>
        {isHovered ? (
          <div className="absolute w-full bottom-0 flex lg:flex-row sm:flex-col justify-between bg-slate-300 bg-opacity-30 p-2  text-black">
            <div className="flex items-center">
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
                {Math.floor(currentTime / 60) +
                  ":" +
                  Math.floor(currentTime % 60)}{" "}
                / {Math.floor(videoRef.current ? videoRef.current.duration : 0)}
              </span>
            </div>
            <div className="flex items-center">
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
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

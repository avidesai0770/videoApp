import React from "react"
import { data } from "../../constants/constants.js"
import "./playList.css"

function PlayList(props) {
  const hanldleSlect = (data) => {
    props.onSlelect(data)
  }
  return (
    <div className="bg-gray-900 flex-container overflow-y-auto mx-3 rounded-xl">
      {data?.map((details) => {
        return (
          <div
            className="flex flex-col items-center border-solid border-black border-2px my-4 mx-3"
            key={details?.id}
            onClick={() => {
              hanldleSlect(details)
            }}>
            <video
              className=""
              width={250}
              height={400}
              src={details?.sources}></video>
            {/* {details?.title} */}
          </div>
        )
      })}
    </div>
  )
}

export default PlayList

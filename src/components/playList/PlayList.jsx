import React from "react"
import { data } from "../../constants/constants.js"

function PlayList(props) {
  const hanldleSlect = (data) => {
    props.onSlelect(data)
  }
  return (
    <div className="flex ">
      {data?.map((details) => {
        return (
          <div
            className="p-2 cursor-pointer"
            key={details?.id}
            onClick={() => {
              hanldleSlect(details)
            }}>
            <video src={details?.sources}></video>
            {details?.title}
          </div>
        )
      })}
    </div>
  )
}

export default PlayList

import React, { useCallback, useState } from "react"
import { data } from "../../constants/constants.js"
import "./playList.css"
import Card from "../card/card.jsx"
import update from "immutability-helper"

function PlayList(props) {
  const [movieData, setMovieData] = useState(data)
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setMovieData((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    )
  }, [])

  const renderCard = useCallback((details, index) => {
    return (
      <Card
        key={details.id}
        index={index}
        id={details.id}
        details={details}
        moveCard={moveCard}
        onSlelect={props.onSlelect}
      />
    )
  }, [])
  return (
    <div className="flex-container overflow-auto mx-3 h-80  rounded-xl">
      {movieData?.map((details, index) => renderCard(details, index))}
    </div>
  )
}

export default PlayList

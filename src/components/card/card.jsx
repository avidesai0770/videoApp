import React from "react"
import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"

export default function Card({ details, index, id, moveCard, onSlelect }) {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: "ItemTypes.CARD",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: "ItemTypes.CARD",
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  const hanldleSlect = (data) => {
    onSlelect(data)
  }
  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className="flex gap-2 items-center border-solid border-black border-2px my-4 mx-3"
      key={details?.id}
      onClick={() => {
        hanldleSlect(details)
      }}>
      <video
        className="cursor-pointer rounded-md"
        width={100}
        src={details?.sources}></video>
      <div className="text-xs text-black">{details?.title}</div>
    </div>
  )
}

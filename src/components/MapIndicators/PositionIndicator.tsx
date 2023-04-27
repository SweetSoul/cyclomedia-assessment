import type { LeafletMouseEvent, Map } from "leaflet"
import { useEffect, useState } from "react"

interface Props {
  map: Map | null
}

export default function PositionIndicator({ map }: Props) {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null)
  const handleMouseMove = (e: LeafletMouseEvent) => {
    setCoordinates([e.latlng.lat, e.latlng.lng])
  }

  useEffect(() => {
    if (map) {
      map.on("mousemove", handleMouseMove)
    }
    return () => {
      if (map) {
        map.off("mousemove", handleMouseMove)
      }
    }
  }, [map])

  return (
    <div className="absolute left-1/2 top-5 z-10 -translate-x-1/2 transform bg-white p-4">
      <p>Latitude: {coordinates?.[0]}</p>
      <p>Longitude: {coordinates?.[1]}</p>
    </div>
  )
}

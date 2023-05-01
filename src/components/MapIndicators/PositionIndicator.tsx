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
    <>
      {coordinates?.[0] && (
        <div className="absolute left-1/2 top-5 z-10 -translate-x-1/2 transform rounded-xl border border-gray-400 bg-gray-100 p-4">
          <p>Latitude: {coordinates?.[0]}</p>
          <p>Longitude: {coordinates?.[1]}</p>
        </div>
      )}
    </>
  )
}

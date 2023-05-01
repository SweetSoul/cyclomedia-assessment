import type { Feature, FeatureCollection, Geometry } from "geojson"
import type { Layer, StyleFunction } from "leaflet"
import { Util } from "leaflet"
import { useEffect, useRef, useState } from "react"
import { GeoJSON } from "react-leaflet"

interface Props {
  id: string
  url: string
  maxFeatures?: number
  outputFormat?: string
  srsName?: string
  version: string
  typeName: string
  customParams?: Record<string, string>
  style?: StyleFunction
  onEachFeature?: (feature: Feature<Geometry, any>, layer: Layer) => void
}

export default function WFSLayer({
  id,
  url: rootUrl,
  maxFeatures,
  outputFormat,
  srsName,
  version,
  typeName,
  customParams,
  style,
  onEachFeature,
}: Props) {
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection | null>(null)
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    const defaultParameters = {
      service: "WFS",
      version,
      request: "GetFeature",
      typeName,
      maxFeatures: maxFeatures ?? 1000,
      outputFormat: outputFormat ?? "application/json",
      srsName: srsName ?? "EPSG:28992",
      opacity: 100,
      ...customParams,
    }

    const parameters = Util.extend(defaultParameters)
    const url = rootUrl + Util.getParamString(parameters)

    const fetchGeoJsonData = () => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setGeoJsonData(data)
        })
    }

    fetchGeoJsonData()
  }, [
    rootUrl,
    maxFeatures,
    outputFormat,
    srsName,
    version,
    typeName,
    customParams,
  ])

  return (
    <>
      {geoJsonData ? (
        <GeoJSON
          key={id}
          data={geoJsonData}
          style={style}
          onEachFeature={onEachFeature}
        />
      ) : null}
    </>
  )
}

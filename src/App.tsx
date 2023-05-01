import "@/styles/App.css"
import type { Map } from "leaflet"
import "leaflet/dist/leaflet.css"
import "proj4leaflet"
import type { ChangeEvent } from "react"
import { useState } from "react"
import {
  FeatureGroup,
  LayersControl,
  MapContainer,
  ScaleControl,
  TileLayer,
} from "react-leaflet"
import OpacityController from "./components/Controllers/OpacityController"
import WFSLayer from "./components/CustomLayers/WFSLayer"
import PositionIndicator from "./components/MapIndicators/PositionIndicator"
import { rdProjection } from "./constants/rdProjection"
import { calculatePplPerSqKilometer } from "./utils/densityCalc"

function App() {
  const [map, setMap] = useState<Map | null>(null)
  const [opacity, setOpacity] = useState(1)

  const handleOpacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpacity(Number(e.target.value))
  }

  return (
    <>
      <PositionIndicator map={map} />
      <MapContainer
        ref={setMap}
        center={[52.03, 4.833]}
        zoom={6}
        crs={rdProjection}
      >
        <TileLayer
          url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:28992/{z}/{x}/{y}.png"
          minZoom={0}
          maxZoom={12}
          tileSize={256}
        />
        <LayersControl position="topright">
          <LayersControl.Overlay name="Population Distribution per 1km2 grid">
            <FeatureGroup>
              <WFSLayer
                id="pd:grid-1km"
                url="https://service.pdok.nl/cbs/pd/wfs/v1_0"
                typeName="pd:pd-nl-grid-2012"
                version="2.0.0"
                srsName="EPSG:4326"
                outputFormat="application/json"
                maxFeatures={1000}
                style={(feature) => {
                  const pplPerSqKm = calculatePplPerSqKilometer(
                    feature?.properties["PD_NL_LAU_T_OBS_VALUE"] ?? 0,
                    feature?.properties["areaValue"] ?? 0
                  )
                  let finalColor = "#790000"
                  let finalOpacity = opacity
                  if (pplPerSqKm < 1) {
                    finalColor = "#fff"
                    finalOpacity = 0
                  } else if (pplPerSqKm >= 1 && pplPerSqKm <= 4)
                    finalColor = "#f2fd0f"
                  else if (pplPerSqKm >= 5 && pplPerSqKm <= 19)
                    finalColor = "#ffa575"
                  else if (pplPerSqKm >= 20 && pplPerSqKm < 199)
                    finalColor = "#fa5107"
                  else if (pplPerSqKm >= 200 && pplPerSqKm < 499)
                    finalColor = "#fa4e05"
                  else if (pplPerSqKm >= 500 && pplPerSqKm < 4999)
                    finalColor = "#ff0016"
                  return {
                    fillColor: finalColor,
                    weight: 1,
                    fillOpacity: finalOpacity,
                    color: "#000",
                  }
                }}
              />
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Population Distribution by NUTS2 region">
            <FeatureGroup>
              <WFSLayer
                id="pd:nuts2"
                url="https://service.pdok.nl/cbs/pd/wfs/v1_0"
                typeName="pd:pd-nl-nuts2-2018"
                version="2.0.0"
                srsName="EPSG:4326"
                outputFormat="application/json"
                maxFeatures={1000}
                style={(feature) => {
                  const pplPerSqKm = calculatePplPerSqKilometer(
                    feature?.properties["PD_NL_LAU_T_OBS_VALUE"] ?? 0,
                    feature?.properties["areaValue"] ?? 0
                  )
                  let finalColor = "#67000d"
                  const finalOpacity = opacity
                  if (pplPerSqKm < 300) finalColor = "#fae8de"
                  else if (pplPerSqKm >= 300 && pplPerSqKm < 500)
                    finalColor = "#d19f8c"
                  else if (pplPerSqKm >= 500 && pplPerSqKm < 900)
                    finalColor = "#ee8f7b"
                  else if (pplPerSqKm >= 900 && pplPerSqKm < 1200)
                    finalColor = "#d42020"
                  return {
                    fillColor: finalColor,
                    fillOpacity: finalOpacity,
                    weight: 1.5,
                    color: "#f2f2f2",
                  }
                }}
              />
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Population Distribution per LAU region">
            <FeatureGroup>
              <WFSLayer
                id="pd:lau"
                url="https://service.pdok.nl/cbs/pd/wfs/v1_0"
                typeName="pd:pd-nl-lau-2018"
                version="2.0.0"
                srsName="EPSG:4326"
                outputFormat="application/json"
                maxFeatures={1000}
                onEachFeature={(feature, layer) => {
                  layer.bindPopup(
                    `<b>Population</b>: ${
                      feature?.properties?.["PD_NL_LAU_T_OBS_VALUE"]
                    }<br/><b>Density</b>: ${calculatePplPerSqKilometer(
                      feature?.properties["PD_NL_LAU_T_OBS_VALUE"] ?? 0,
                      feature?.properties["areaValue"] ?? 0
                    )} ppl/km²<br/><b>Area</b>: ${
                      feature?.properties["areaValue"] / 1000000
                    } km²`
                  )
                }}
                style={(feature) => {
                  const pplPerSqKm = calculatePplPerSqKilometer(
                    feature?.properties["PD_NL_LAU_T_OBS_VALUE"] ?? 0,
                    feature?.properties["areaValue"] ?? 0
                  )
                  let finalColor = "#67000d"
                  const finalOpacity = opacity
                  if (pplPerSqKm < 300) finalColor = "#fae8de"
                  else if (pplPerSqKm >= 300 && pplPerSqKm < 500)
                    finalColor = "#d19f8c"
                  else if (pplPerSqKm >= 500 && pplPerSqKm < 900)
                    finalColor = "#ee8f7b"
                  else if (pplPerSqKm >= 900 && pplPerSqKm < 1200)
                    finalColor = "#d42020"
                  return {
                    fillColor: finalColor,
                    weight: 1,
                    fillOpacity: finalOpacity,
                    color: "#777",
                  }
                }}
              />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <ScaleControl position="bottomleft" imperial={false} />
      </MapContainer>
      <OpacityController onOpacityChange={handleOpacityChange} />
    </>
  )
}

export default App

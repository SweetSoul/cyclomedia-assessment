import "@/styles/App.css"
import type { Map } from "leaflet"
import "leaflet/dist/leaflet.css"
import proj4 from "proj4"
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
import { rdProjDef, rdProjection } from "./constants/rdProjection"
import { calculatePplPerSqKilometer } from "./utils/densityCalc"

proj4.defs("EPSG:28992", rdProjDef)

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
        center={[52.09, 5.1]}
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
                onEachFeature={(feature, layer) => {
                  layer.bindPopup(
                    `<b>${
                      feature?.properties?.["text"]
                    }</b><br/><b>Density</b>: ${
                      feature?.properties?.["PD_NL_LAU_D_OBS_VALUE"]
                    } ppl/km²<br/><b>Area</b>: ${
                      feature?.properties["areaValue"] / 1000000
                    } km²`
                  )
                }}
                style={(feature) => {
                  const pplPerSqKm =
                    feature?.properties["PD_NL_LAU_D_OBS_VALUE"] ?? 0
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
                    `<b>${
                      feature?.properties?.["text"]
                    }</b><br/><b>Population</b>: ${
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

//https://service.pdok.nl/cbs/pd/wms/v1_0?SERVICE=WMS
//VERSION=1.3.0
//REQUEST=GetFeatureInfo
//FORMAT=image%2Fpng
//TRANSPARENT=true
//QUERY_LAYERS=pd_nl_grid_2012
//layers=pd_nl_grid_2012
//DPI=135
//MAP_RESOLUTION=135
//INFO_FORMAT=application%2Fjson
//FEATURE_COUNT=8
//I=50
//J=50
//CRS=EPSG%3A28992
//STYLES=
//WIDTH=101
//HEIGHT=101
//BBOX=118072.52139929695%2C421832.5966711458%2C122464.20353051128%2C426224.2788023601

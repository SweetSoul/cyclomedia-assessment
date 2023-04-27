import "@/styles/App.css"
import type { Map } from "leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "proj4leaflet"
import type { ChangeEvent } from "react"
import { useState } from "react"
import { MapContainer, ScaleControl, WMSTileLayer } from "react-leaflet"
import LayerController from "./components/LayerController/LayerController"
import PositionIndicator from "./components/MapIndicators/PositionIndicator"

function App() {
  const [visibility, setVisibility] = useState(false)
  const [map, setMap] = useState<Map | null>(null)

  const handleVisibilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.checked)
  }

  const rdProjection = new L.Proj.CRS(
    "EPSG:28992",
    "+proj=sterea +lat_0=52.090 +lon_0=5.117 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.4171,50.3319,465.5524,1.9342,-1.6677,9.1019,4.0725 +units=m +no_defs +type=crs",
    {
      transformation: new L.Transformation(1, 285401.92, -1, 903401.92),
      resolutions: [
        3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44,
        6.72, 3.36, 1.68, 0.84, 0.42, 0.21, 0.105,
      ],
    }
  )

  return (
    <>
      <PositionIndicator map={map} />
      <MapContainer
        ref={setMap}
        center={[52.025, 4.8314]}
        zoom={6}
        crs={rdProjection}
      >
        {visibility && (
          <WMSTileLayer
            url="https://service.pdok.nl/cbs/pd/wms/v1_0?dpi=135&map_resolution=135&FORMAT_OPTIONS=dpi%3A135"
            crs={rdProjection}
            crossOrigin
            params={{
              request: "GetMap",
              version: "1.3.0",
              styles: "",
              layers: "pd_nl_lau_2018",
              format: "image/png",
              width: map?.getPixelBounds().getSize().x ?? 256,
              height: map?.getPixelBounds().getSize().y ?? 256,
              transparent: true,
            }}
          />
        )}
        <WMSTileLayer
          url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?layer=standaard&tilematrixset=EPSG%3A28992&TileCol={x}&TileRow={y}&TileMatrix={z}"
          crs={rdProjection}
          crossOrigin
          params={{
            service: "WMTS",
            request: "GetTile",
            version: "1.0.0",
            styles: "default",
            layers: "",
            format: "image/png",
            width: 256,
            height: 256,
          }}
        />
        <ScaleControl position="bottomleft" imperial={false} />
      </MapContainer>

      <LayerController
        layerName="population density"
        layerId="population-density"
        onVisibilityToggle={handleVisibilityChange}
      />
    </>
  )
}

export default App

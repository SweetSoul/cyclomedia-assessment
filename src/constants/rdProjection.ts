import L from "leaflet"

const rdProjDef =
  "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs"
export const rdProjection = new L.Proj.CRS("EPSG:28992", rdProjDef, {
  resolutions: [
    3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44, 6.72,
    3.36, 1.68, 0.84, 0.42, 0.21, 0.105,
  ],
  transformation: new L.Transformation(1, 285401.92, -1, 903401.92),
})

# Pedro Mendes Assessment for Cyclomedia

## Description

This is a small project that uses the [BRT Achtergrondkaart](https://pdok.nl/dataset) and the [Population Distribution Layer](https://www.pdok.nl/introductie/-/article/cbs-bevolkingsspreiding-population-distribution-) to display the population density of the Netherlands.

[Live demo](https://cyclomedia-assessment.vercel.app/) (deployed on Vercel)

## Features

- Display base map using the BRT Achtergrondkaart and with EPSG:28992 projection (RD New)
- Toggle different WFS Layers from the Population Distribution Dataset
- Control overall opacity of overlay layers
- While hovering you'll see coordinates in EPSG:4326 (WGS84)
- Clicking with an overlay activated will show some important information in a popup

## Stack

- Yarn
- React 18
- Typescript
- TailwindCSS
- Leaflet & react-leaflet
- Proj4 & Proj4leaflet

## Resources used

- [BRT Achtergrondkaart](https://www.pdok.nl/introductie/-/article/basisregistratie-topografie-achtergrondkaarten-brt-a-)
- [Population Distribution Layer](https://www.pdok.nl/introductie/-/article/cbs-bevolkingsspreiding-population-distribution-)

## How to run

- Clone the repository
- `yarn install`
- `yarn dev`
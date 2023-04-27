import type { TileLayer } from "leaflet"
import { ChangeEvent, useState } from "react"

interface Props {
  onVisibilityToggle: (e: ChangeEvent<HTMLInputElement>) => void
  layerName: string
  layer: TileLayer.WMS | null
}

export default function LayerController({
  onVisibilityToggle,
  layerName,
  layer,
}: Props) {
  const [visible, setVisible] = useState(false)

  const handleVisibilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVisible(event.target.checked)
    onVisibilityToggle(event)
  }

  const handleOpacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const opacity = e.target.value
    if (layer) {
      layer.setOpacity(Number(opacity))
    }
  }

  return (
    <>
      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 transform rounded-xl border border-gray-400 bg-gray-100 p-4">
        <h3 className="mb-3 text-lg">Control {layerName} layer</h3>
        <div className="flex items-center gap-2">
          <label htmlFor="visibility">Visibility:</label>
          <input
            name="visibility"
            type="checkbox"
            onChange={handleVisibilityChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="opacity" className="mb-1">
            Opacity:
          </label>
          <input
            name="opacity"
            type="range"
            min="0"
            max="1"
            step="0.1"
            disabled={!visible}
            onChange={handleOpacityChange}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      {visible && (
        <div className="absolute bottom-5 right-5 z-10 rounded-xl border border-gray-400 bg-white p-4">
          <img
            src="https://service.pdok.nl/cbs/pd/wms/v1_0/legend/pd_nl_lau_2018/pd_nl_lau.png"
            alt=""
          />
        </div>
      )}
    </>
  )
}

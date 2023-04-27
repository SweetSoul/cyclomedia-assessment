import type { ChangeEvent } from "react"

interface Props {
  onVisibilityToggle: (e: ChangeEvent<HTMLInputElement>) => void
  layerName: string
  layerId: string
}

export default function LayerController({
  onVisibilityToggle,
  layerName,
  layerId,
}: Props) {
  const handleOpacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const opacity = e.target.value
    const layer = document.getElementById(layerId)
    if (layer) {
      layer.style.opacity = opacity
    }
  }

  return (
    <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 transform rounded-xl border border-gray-400 bg-white p-4">
      <h3 className="mb-3 text-lg">Control {layerName} layer</h3>
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
          onChange={handleOpacityChange}
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="visibility">Visibility:</label>
        <input
          name="visibility"
          type="checkbox"
          onChange={onVisibilityToggle}
        />
      </div>
    </div>
  )
}

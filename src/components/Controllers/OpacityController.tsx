import { ChangeEvent } from "react"

interface Props {
  onOpacityChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function OpacityController({ onOpacityChange }: Props) {
  return (
    <>
      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 transform rounded-xl border border-gray-400 bg-gray-100 p-4">
        <h3 className="mb-3 text-lg">Control overlay opacity</h3>
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
            onChange={onOpacityChange}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </>
  )
}

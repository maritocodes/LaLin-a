"use client"

import { useEditor } from "../editor/EditorProvider"
import { uploadFile } from "./useUpload"

export default function UploadButton({
  type,
  onUploaded,
}: {
  type: string
  onUploaded: (url: string) => void
}) {
  const { isAdmin } = useEditor()

  if (!isAdmin) return null

  return (
    <label className="z-50 bg-primary justify-center font-bold rounded-full button text-white px-4 py-2 cursor-pointer inline-flex items-center">
      Subir archivo
      <input
        type="file"
        className="hidden"
        accept="image/*,video/*"
        onChange={async (e) => {
          const file = e.target.files?.[0]
          if (!file) return

          const res = await uploadFile(file, type)
          onUploaded(res.url)
        }}
      />
    </label>
  )
}
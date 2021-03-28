import { Box } from "@chakra-ui/layout"
import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
}

const thumb = {
  display: "inline-flex",
  width: 100,
  height: 100,
  boxSizing: "border-box",
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
}

const img = {
  display: "block",
  width: "auto",
  height: "100%",
}

function Dropzone(props) {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    noDrag: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map(
        (file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        // file.path.toString()
      )
      const filesString = files[0].path.toString()
      setFiles(files)
      if (props.onChange) {
        props.onChange(filesString)
      }
      console.log(acceptedFiles, "this is the file: ", filesString)
    },
  })

  const removeFile = (file) => () => {
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFiles(newFiles)
  }

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
      <button onClick={removeFile(file)}>Remove File</button>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <Box>
      <div {...getRootProps({ className: "btn-dropzone" })}>
        <input {...getInputProps()} />
        <span>Click here to upload image</span>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </Box>
  )
}

export default Dropzone

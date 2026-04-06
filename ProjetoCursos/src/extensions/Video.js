import { Node, mergeAttributes } from "@tiptap/core"

export const CustomVideo = Node.create({
  name: "video",

  group: "block",

  draggable: true,

  selectable: true,

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
      width: {
        default: "300px",
      },
      textAlign:{
        default:"left",
      }
    }
  },

  parseHTML() {
    return [{ tag: "video[src]" }]
  },

  renderHTML({ HTMLAttributes }) {
    const width = HTMLAttributes.width || "300px"
    const textAlign = HTMLAttributes.textAlign || "left"
    let containerStyle = `width: ${width}; max-width: 100%; position: relative;`

    switch (textAlign) {
      case "center":
        containerStyle += " display: block; margin: 0 auto;"
        break
      case "left":
        containerStyle += " float: left; margin-right: 1rem;"
        break
      case "right":
        containerStyle += " float: right; margin-left: 1rem;"
        break
      case "justify":
        containerStyle = "width: 100%; display: block; position: relative;"
        break
      default:
        containerStyle += " display: block; margin: 0 auto;"
    }

    const videoStyle = "width: 100%; display: block;"

    return [
      "div",
      { style: containerStyle },
      ["video", mergeAttributes({ controls: true, style: videoStyle }, HTMLAttributes)]
    ]
  },

  addNodeView() {
    return ({ node, editor }) => {
      const width = node.attrs.width || "300px"
      const textAlign = node.attrs.textAlign || "left"
      const container = document.createElement("div")
      container.style.display = "inline-block"
      container.style.position = "relative"
      container.style.width = width
      container.style.maxWidth = "100%"

      switch (textAlign) {
        case "center":
          container.style.display = "block"
          container.style.margin = "0 auto"
          break
        case "left":
          container.style.float = "left"
          container.style.marginRight = "1rem"
          break
        case "right":
          container.style.float = "right"
          container.style.marginLeft = "1rem"
          break
        case "justify":
          container.style.width = "100%"
          container.style.display = "block"
          break
        default:
          container.style.display = "block"
          container.style.margin = "0 auto"
      }

      const video = document.createElement("video")
      video.src = node.attrs.src
      video.controls = true
      video.style.width = "100%"
      video.style.display = "block"

      const resizer = document.createElement("div")
      resizer.style.width = "10px"
      resizer.style.height = "100%"
      resizer.style.position = "absolute"
      resizer.style.right = "0"
      resizer.style.top = "0"
      resizer.style.cursor = "ew-resize"
      resizer.style.background = "rgba(0, 0, 0, 0.2)"

      let startX = 0
      let startWidth = 0

      const onMouseDown = (event) => {
        event.preventDefault()
        startX = event.clientX
        startWidth = container.offsetWidth

        const onMouseMove = (event) => {
          const newWidth = Math.max(120, startWidth + (event.clientX - startX))
          container.style.width = `${newWidth}px`
          editor.commands.updateAttributes("video", {
            width: `${newWidth}px`,
          })
        }

        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove)
          document.removeEventListener("mouseup", onMouseUp)
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
      }

      resizer.addEventListener("mousedown", onMouseDown)
      container.appendChild(video)
      container.appendChild(resizer)

      return {
        dom: container,
      }
    }
  },
})

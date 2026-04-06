import { Node, mergeAttributes } from "@tiptap/core"

export const CustomImage = Node.create({
  name: "image",

  group: "block",

  draggable: true,

  selectable: true,

  atom: true,

  addAttributes() {
    return {
      src: {},
      width: {
        default: "300px",
      },
      textAlign: {
        default: "left",
      },
    }
  },

  parseHTML() {
    return [{ tag: "img" }]
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

    const imgStyle = "width: 100%; display: block;"

    return [
      "div",
      { style: containerStyle },
      ["img", mergeAttributes({ style: imgStyle }, HTMLAttributes)]
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

      const img = document.createElement("img")
      img.src = node.attrs.src
      img.style.width = "100%"
      img.style.display = "block"

      const resizer = document.createElement("div")
      resizer.style.width = "10px"
      resizer.style.height = "100%"
      resizer.style.position = "absolute"
      resizer.style.right = "0"
      resizer.style.top = "0"
      resizer.style.cursor = "ew-resize"
      resizer.style.background = "rgba(0,0,0,0.2)"

      let startX = 0
      let startWidth = 0

      const onMouseDown = (e) => {
        e.preventDefault()
        startX = e.clientX
        startWidth = img.offsetWidth

        const onMouseMove = (e) => {
          const newWidth = startWidth + (e.clientX - startX)

          img.style.width = newWidth + "px"

          editor.commands.updateAttributes("image", {
            width: newWidth + "px",
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

      container.appendChild(img)
      container.appendChild(resizer)

      return {
        dom: container,
      }
    }
  },
})
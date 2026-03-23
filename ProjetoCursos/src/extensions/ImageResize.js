import { Node, mergeAttributes } from "@tiptap/core"

export const CustomImage = Node.create({
  name: "image",

  group: "block",

  draggable: true,

  addAttributes() {
    return {
      src: {},
      width: {
        default: "300px",
      },
    }
  },

  parseHTML() {
    return [{ tag: "img" }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ({ node, editor }) => {
      const container = document.createElement("div")
      container.style.display = "inline-block"
      container.style.position = "relative"

      const img = document.createElement("img")
      img.src = node.attrs.src
      img.style.width = node.attrs.width
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
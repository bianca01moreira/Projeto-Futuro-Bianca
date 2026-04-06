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
        default: "100%",
      },
    }
  },

  parseHTML() {
    return [{ tag: "video[src]" }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "video",
      mergeAttributes({ controls: true, width: "100%" }, HTMLAttributes),
    ]
  },
})

import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import FocusClasses from "@tiptap/extension-focus";
import Link from "@tiptap/extension-link";

const extensions = [
  StarterKit,
  Highlight.configure({
    multicolor: true,
  }),
  Typography,
  Placeholder.configure({
    emptyEditorClass: "is-editor-empty",
    placeholder: "Write something here...",
  }),
  Link.configure({
    protocols: ["ftp", "http", "https", "mailto"],
  }),
  FocusClasses,
  CharacterCount,
];

export default extensions;

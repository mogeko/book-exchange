import { BubbleMenu, FloatingMenu } from "@/components/editor/menus";
import { PresetButtons } from "@/components/editor/buttons";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import FocusClasses from "@tiptap/extension-focus";
import Link from "@tiptap/extension-link";

const Editor: React.FC = () => {
  const editor = useEditor({
    extensions: [
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
    ],
    editorProps: {
      attributes: {
        class:
          "textarea textarea-bordered textarea-accent h-full w-full overflow-auto prose",
      },
    },
  });
  const handleClick = () => {
    return;
  };

  return (
    <div className="relative max-w-xl">
      <EditorContent editor={editor} className="flex h-40 w-full" />
      <FloatingMenu editor={editor} buttons={PresetButtons.floating} />
      <BubbleMenu editor={editor} buttons={PresetButtons.bubble} />
      <div className="label items-start">
        <span className="label-text-alt">
          {editor?.storage.characterCount.characters()} characters
        </span>
        <button
          onClick={handleClick}
          className="btn btn-sm btn-primary"
          {...(editor?.isEmpty ? { disabled: true } : {})}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Editor;

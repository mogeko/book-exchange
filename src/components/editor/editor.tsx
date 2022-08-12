import { BubbleMenu, FloatingMenu } from "@/components/editor/menus";
import { PresetButtons } from "@/components/editor/buttons";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import FocusClasses from "@tiptap/extension-focus";

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
      FocusClasses,
    ],
    editorProps: {
      attributes: {
        class:
          "textarea textarea-bordered textarea-primary prose h-full w-full overflow-auto",
      },
    },
  });

  return (
    <>
      <EditorContent editor={editor} className="flex h-40 w-full" />
      <FloatingMenu editor={editor} buttons={PresetButtons.floating} />
      <BubbleMenu editor={editor} buttons={PresetButtons.bubble} />
    </>
  );
};

export default Editor;

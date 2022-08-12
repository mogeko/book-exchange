import { BubbleMenu, FloatingMenu } from "@/components/editor/menus";
import { PresetButtons } from "@/components/editor/buttons";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";

const Editor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        multicolor: true,
      }),
      Typography,
      Placeholder.configure({
        showOnlyCurrent: false,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:float-left before:h-0",
        placeholder: "Write something here...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "textarea textarea-bordered textarea-primary prose h-full",
      },
    },
  });

  return (
    <>
      <EditorContent editor={editor} className="h-40" />
      <FloatingMenu editor={editor} buttons={PresetButtons.floating} />
      <BubbleMenu editor={editor} buttons={PresetButtons.bubble} />
    </>
  );
};

export default Editor;

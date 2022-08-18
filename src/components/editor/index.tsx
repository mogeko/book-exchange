import { BubbleMenu, FloatingMenu } from "@/components/editor/menus";
import { PresetButtons } from "@/components/editor/buttons";
import extensions from "@/components/editor/extensions";
import { useEditor, EditorContent } from "@tiptap/react";
import type { JSONContent } from "@tiptap/react";

const Editor: React.FC<EditorProps> = ({ onSubmit }) => {
  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      attributes: {
        class:
          "textarea textarea-bordered textarea-accent h-full w-full overflow-auto prose",
        role: "textbox",
      },
    },
  });
  const handleClick = () => {
    onSubmit({ content: editor?.getJSON() });
    editor?.commands.clearContent();
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

interface EditorProps {
  onSubmit: (data: EditorFormInput) => void;
}

export interface EditorFormInput {
  content?: JSONContent;
}

export default Editor;

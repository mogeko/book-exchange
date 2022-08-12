import { BubbleMenu as Bubble, FloatingMenu as Floating } from "@tiptap/react";
import type { ButtonProps } from "@/components/editor/buttons";
import type { Editor } from "@tiptap/react";

export const BubbleMenu: React.FC<MenuProps> = ({ editor, buttons }) => {
  return (
    editor && (
      <Bubble
        className="btn-group"
        tippyOptions={{ duration: 100 }}
        editor={editor}
      >
        {buttons.map((Button, i) => (
          <Button key={i} editor={editor} />
        ))}
      </Bubble>
    )
  );
};

export const FloatingMenu: React.FC<MenuProps> = ({ editor, buttons }) => {
  return (
    editor && (
      <Floating
        className="btn-group"
        tippyOptions={{ duration: 100 }}
        editor={editor}
      >
        {buttons.map((Button, i) => (
          <Button key={i} editor={editor} />
        ))}
      </Floating>
    )
  );
};

interface MenuProps {
  editor: Editor | null;
  buttons: React.FC<ButtonProps>[];
}

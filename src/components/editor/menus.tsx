import classNames from "@/lib/utils/classNames";
import { BubbleMenu as Bubble, FloatingMenu as Floating } from "@tiptap/react";
import { FaLink } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { useCallback, useMemo } from "react";
import type { ButtonProps } from "@/components/editor/buttons";
import type { Editor } from "@tiptap/react";

export const BubbleMenu: React.FC<MenuProps> = ({ editor, buttons }) => {
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [hasLinkInput, setHasLinkInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback(() => {
    if (inputRef.current?.value) {
      editor?.chain().focus().setLink({ href: inputRef.current?.value }).run();
    } else {
      editor?.chain().focus().unsetLink().run();
    }
    setIsLinkActive(!isLinkActive);
  }, [editor, isLinkActive, setIsLinkActive]);
  const LinkDialog = useMemo(() => {
    return (
      <div className="input-group">
        <input
          onChange={(e) => setHasLinkInput(e.target.value !== "")}
          defaultValue={editor?.getAttributes("link").href}
          className="input input-bordered input-xs"
          ref={inputRef}
          autoFocus
        />
        <button
          onClick={handleSubmit}
          className={classNames(
            hasLinkInput ? "btn-primary" : "",
            "btn btn-xs"
          )}
        >
          OK
        </button>
      </div>
    );
  }, [editor, hasLinkInput, handleSubmit]);
  const LinkButton = useMemo(() => {
    return (
      <button
        onClick={() => setIsLinkActive(!isLinkActive)}
        className={classNames(
          editor?.isActive("link") ? "btn-active" : "",
          "btn btn-xs"
        )}
      >
        <FaLink className="w-3 h-3" />
      </button>
    );
  }, [editor, isLinkActive, setIsLinkActive]);

  useEffect(() => {
    editor?.isFocused && setIsLinkActive(false);
  }, [editor?.isFocused, setIsLinkActive]);

  return (
    editor && (
      <Bubble
        className="btn-group"
        tippyOptions={{ duration: 100 }}
        editor={editor}
      >
        {!isLinkActive &&
          buttons.map((Button, i) => <Button key={i} editor={editor} />)}
        {!isLinkActive && LinkButton}
        {isLinkActive && LinkDialog}
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

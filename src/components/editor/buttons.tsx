import classNames from "@/lib/utils/classNames";
import { FaBold, FaItalic, FaStrikethrough, FaCircle } from "react-icons/fa";
import { FaListOl, FaListUl, FaCode, FaQuoteLeft } from "react-icons/fa";
import type { Editor } from "@tiptap/react";

export const Bold: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={classNames(
        editor.isActive("bold") ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      <FaBold className="w-3 h-3" />
    </button>
  );
};

export const Italic: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={classNames(
        editor.isActive("italic") ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      <FaItalic className="w-3 h-3" />
    </button>
  );
};

export const Strike: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleStrike().run()}
      className={classNames(
        editor.isActive("strike") ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      <FaStrikethrough className="w-3 h-3" />
    </button>
  );
};

export const H1: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      className={classNames(
        editor.isActive("heading", { level: 1 }) ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      H1
    </button>
  );
};

export const H2: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      className={classNames(
        editor.isActive("heading", { level: 2 }) ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      H2
    </button>
  );
};

export const H3: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      className={classNames(
        editor.isActive("heading", { level: 3 }) ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      H3
    </button>
  );
};

export const BulletList: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      className={classNames(
        editor.isActive("bulletList") ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      <FaListUl className="w-3 h-3" />
    </button>
  );
};

export const OrderedList: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      className={classNames(
        editor.isActive("orderedList") ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      <FaListOl className="w-3 h-3" />
    </button>
  );
};

export const CodeBlock: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className={classNames(
        editor.isActive("codeBlock") ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      <FaCode className="w-3 h-3" />
    </button>
  );
};

export const Blockquote: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      className={classNames(
        editor.isActive("blockquote") ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      <FaQuoteLeft className="w-3 h-3" />
    </button>
  );
};

export const RedMark: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() =>
        editor.chain().focus().toggleHighlight({ color: "#FFA8A8" }).run()
      }
      className={classNames(
        editor.isActive("highlight", { color: "#FFA8A8" }) ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      <FaCircle className="w-3 h-3 text-[#FFA8A8]" />
    </button>
  );
};

export const YellowMark: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() =>
        editor.chain().focus().toggleHighlight({ color: "#FFC078" }).run()
      }
      className={classNames(
        editor.isActive("highlight", { color: "#FFC078" }) ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      <FaCircle className="w-3 h-3 text-[#FFC078]" />
    </button>
  );
};

export const GreenMark: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() =>
        editor.chain().focus().toggleHighlight({ color: "#8CE99A" }).run()
      }
      className={classNames(
        editor.isActive("highlight", { color: "#8CE99A" }) ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      <FaCircle className="w-3 h-3 text-[#8CE99A]" />
    </button>
  );
};

export const BlueMark: React.FC<ButtonProps> = ({ editor }) => {
  return (
    <button
      onClick={() =>
        editor.chain().focus().toggleHighlight({ color: "#74C0FC" }).run()
      }
      className={classNames(
        editor.isActive("highlight", { color: "#74C0FC" }) ? "btn-active" : "",
        "btn btn-xs"
      )}
    >
      <FaCircle className="w-3 h-3 text-[#74C0FC]" />
    </button>
  );
};

export const PresetButtons = {
  bubble: [Bold, Italic, Strike, RedMark, YellowMark, GreenMark, BlueMark],
  floating: [H1, H2, H3, BulletList, OrderedList, CodeBlock, Blockquote],
};

export interface ButtonProps {
  editor: Editor;
}

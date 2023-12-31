import { AnyBlock, EditorData } from "../types/BlockTypes";
import { generateBlockId } from "./generateBlockId";

function setEndOfContenteditable(elem: HTMLElement) {
  let sel = window.getSelection();
  sel?.selectAllChildren(elem);
  sel?.collapseToEnd();
}

export const onKeyPressHandler = (
  e: React.KeyboardEvent<HTMLParagraphElement>,
  blockData: AnyBlock,
  setData: React.Dispatch<React.SetStateAction<EditorData>>,
  data: EditorData,
  editorRef: React.RefObject<HTMLDivElement>
) => {
  onEnter(e, blockData, setData, data, editorRef);
  onBackspace(e, blockData, setData, data, editorRef);
  onDownArrow(e, blockData, setData, data, editorRef);
  onUpArrow(e, blockData, setData, data, editorRef);
}

export const onUpArrow = (
  e: React.KeyboardEvent<HTMLParagraphElement>,
  blockData: AnyBlock,
  setData: React.Dispatch<React.SetStateAction<EditorData>>,
  data: EditorData,
  editorRef: React.RefObject<HTMLDivElement>
) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    const blockIndex = data.blocks.indexOf(blockData);
    if (blockIndex > 0) {
      const block = editorRef.current?.querySelector(`#${data.blocks[blockIndex - 1].id}`) as HTMLParagraphElement;
      if (block) {
        block.focus();
      }
    }
  }
}

export const onDownArrow = (
  e: React.KeyboardEvent<HTMLParagraphElement>,
  blockData: AnyBlock,
  setData: React.Dispatch<React.SetStateAction<EditorData>>,
  data: EditorData,
  editorRef: React.RefObject<HTMLDivElement>
) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    const blockIndex = data.blocks.indexOf(blockData);
    if (blockIndex < data.blocks.length - 1) {
      const block = editorRef.current?.querySelector(`#${data.blocks[blockIndex + 1].id}`) as HTMLParagraphElement;
      if (block) {
        block.focus();
      }
    }
  }
}

export const onBackspace = (
  e: React.KeyboardEvent<HTMLParagraphElement>,
  blockData: AnyBlock,
  setData: React.Dispatch<React.SetStateAction<EditorData>>,
  data: EditorData,
  editorRef: React.RefObject<HTMLDivElement>
) => {
  if (e.key === "Backspace" && blockData.text === "") {
    e.preventDefault();
    const blockIndex = data.blocks.indexOf(blockData);
    if (blockIndex > 0) {
      const block = editorRef.current?.querySelector(`#${data.blocks[blockIndex - 1].id}`) as HTMLParagraphElement;
      if (block) {
        block.focus();
        setEndOfContenteditable(block);
      }
    }
    setData({
      ...data,
      blocks: data.blocks.filter((block) => block.id !== blockData.id),
    });
    if (data.blocks.length === 1) {
      const blockId = generateBlockId();
      setData({
        ...data,
        blocks: [
          {
            id: blockId,
            type: "paragraph",
            text: "",
          },
        ],
      });
      if (editorRef.current) {
        const block = editorRef.current.querySelector(`#${blockId}`) as HTMLParagraphElement;
        if (block) {
          block.focus();
        }
      }
    }
  }
}

export const onEnter = (
  e: React.KeyboardEvent<HTMLParagraphElement>,
  blockData: AnyBlock,
  setData: React.Dispatch<React.SetStateAction<EditorData>>,
  data: EditorData,
  editorRef: React.RefObject<HTMLDivElement>
) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (data.blocks.length > 1) {
      const lastBlock = data.blocks[data.blocks.length - 1];
      const secondLastBlock = data.blocks[data.blocks.length - 2];
      if (lastBlock && secondLastBlock && lastBlock.text === "" && secondLastBlock.text === "") {
        return;
      }
    }

    const newId = generateBlockId();

    setData({
      ...data,
      blocks: [
        ...data.blocks.slice(0, data.blocks.indexOf(blockData) + 1),
        {
          id: newId,
          type: "paragraph",
          text: "",
        },
        ...data.blocks.slice(data.blocks.indexOf(blockData) + 1),
      ],
    });
    console.log("enter");
    
    setTimeout(() => {
        const block = editorRef.current?.querySelector(`#${newId}`) as HTMLParagraphElement;
        if (block) {
            block.focus();
        }
    }, 0);
  }
};
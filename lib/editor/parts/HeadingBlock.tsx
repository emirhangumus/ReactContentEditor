import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { InlineBox } from "../components/InlineBox";
import { LeftPanel } from "../components/LeftPanel";
import { onKeyPressHandler } from "../functions/onKeyPressHandler";
import { editorAtom, editorLeftPanelIsOpenAtom, editorRefAtom } from "../stores";
import { HeadingBlock } from "../types/BlockTypes";

export function HeadingBlock({ blockData }: { blockData: HeadingBlock }) {
  const [data, setData] = useAtom(editorAtom);
  const [editorRef, setEditorRef] = useAtom(editorRefAtom);
  const ref = useRef<HTMLHeadingElement>(null);
  const [text, setText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [leftPanelIsOpen, setLeftPanelIsOpen] = useAtom(editorLeftPanelIsOpenAtom);

  useEffect(() => {
    setData({
      ...data,
      blocks: data.blocks.map((block) => {
        if (block.id === blockData.id) {
          return {
            ...block,
            text,
          };
        }
        return block;
      }),
    });
  }, [text]);

  const [level, setLevel] = useState<number>(blockData.level);

  const correntClass = () => {
    switch (level) {
      case 1:
        return "text-4xl";
      case 2:
        return "text-3xl";
      case 3:
        return "text-2xl";
      case 4:
        return "text-xl";
      case 5:
        return "text-lg";
      case 6:
        return "text-base";
      default:
        return "text-base";
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {(isFocused ||
          (leftPanelIsOpen.state &&
            leftPanelIsOpen.targetId === blockData.id)) && (
          <div className="absolute top-1/2 left-0 -translate-y-1/2">
            <LeftPanel blockData={blockData} />
          </div>
        )}
        <div className="relative w-full mx-16">
          {React.createElement(
            `h${blockData.level}`,
            {
              contentEditable: true,
              onInput: (e: React.FormEvent<HTMLHeadingElement>) => {
                setText(e.currentTarget.textContent ?? "");
              },
              onFocus: () => {
                setIsFocused(true);
              },
              onBlur: () => {
                setTimeout(() => {
                  setIsFocused(false);
                }, 100);
              },
              onKeyDown: (e: React.KeyboardEvent<HTMLParagraphElement>) =>
                onKeyPressHandler(e, blockData, setData, data, editorRef),
              className: `outline-none focus-visible:outline-none focus:outline-none ${correntClass()}`,
              ref,
            },
            null
          )}
          {!isFocused && text === "" && (
            <p
              className="text-gray-400 absolute top-1/2 left-0 cursor-text -translate-y-1/2"
              onClick={() => {
                ref.current?.focus();
              }}
            >
              Click here to start writing
            </p>
          )}
        </div>
      </div>
      {isSelected && <InlineBox blockData={blockData} />}
    </div>
  );
}

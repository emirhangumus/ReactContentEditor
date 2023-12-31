"use client";

import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { InlineBox } from "../components/InlineBox";
import { LeftPanel } from "../components/LeftPanel";
import { onKeyPressHandler } from "../functions/onKeyPressHandler";
import { editorAtom, editorLeftPanelIsOpenAtom, editorRefAtom } from "../stores";
import { ParagraphBlock } from "../types/BlockTypes";

export function ParagraphBlock({ blockData }: { blockData: ParagraphBlock }) {
  const [data, setData] = useAtom(editorAtom);
  const [editorRef, setEditorRef] = useAtom(editorRefAtom);
  const [leftPanelIsOpen, setLeftPanelIsOpen] = useAtom(editorLeftPanelIsOpenAtom);
  const ref = useRef<HTMLParagraphElement>(null);
  const [text, setText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

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

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {(isFocused || (leftPanelIsOpen.state && leftPanelIsOpen.targetId === blockData.id)) && ( 
          <div className="absolute top-1/2 left-0 -translate-y-1/2">
            <LeftPanel blockData={blockData} />
          </div>
        )}
        <div className="relative w-full mx-16">
          {React.createElement(
            "p",
            {
              id: blockData.id,
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
              className:
                "outline-none focus-visible:outline-none focus:outline-none",
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

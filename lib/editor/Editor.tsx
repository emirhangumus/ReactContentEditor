"use client";

import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { generateBlockId } from "./functions/generateBlockId";
import { HeadingBlock } from "./parts/HeadingBlock";
import { ParagraphBlock } from "./parts/ParagraphBlock";
import { editorAtom, editorRefAtom } from "./stores";
import { AnyBlock } from "./types/BlockTypes";

const LOADING_TIME = 0;

const generateBlock = (block: AnyBlock) => {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock blockData={block} />;
    case "heading":
      return <HeadingBlock blockData={block} />;
  }
};

export default function BlockEditor() {
  const [data, setData] = useAtom(editorAtom);
  const editorRef_ = useRef<HTMLDivElement>(null);
  const [editorRef, setEditorRef] = useAtom(editorRefAtom);
  useEffect(() => {
    setEditorRef(editorRef_);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setData({
        ...data,
        blocks: [
          {
            id: generateBlockId(),
            type: "paragraph",
            text: "",
          },
        ],
      });
    }, LOADING_TIME);
  }, []);

  useEffect(() => {
    setData({
      ...data,
      timestamp: Date.now(),
    });
  }, [data.blocks]);

  return (
    <div className="flex flex-col" ref={editorRef_}>
      <div className="flex flex-col">
        {data.blocks.map((block, index) => {
          return (
            <div className="mb-2" key={block.id}>
              {generateBlock(block)}
            </div>
          );
        })}
      </div>
      <pre>
        {JSON.stringify(
          {
            blocks: data.blocks,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}

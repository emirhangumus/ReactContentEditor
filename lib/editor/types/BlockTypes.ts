export type EditorData = {
  blocks: AnyBlock[];
  timestamp: number;
};

export type BaseBlock = {
    id: string;
    type: string;
};

export type ParagraphBlock = BaseBlock & {
    type: "paragraph";
    text: string;
};

export type HeadingBlock = BaseBlock & {
    type: "heading";
    text: string;
    level: number;
};

export type AnyBlock = ParagraphBlock | HeadingBlock;
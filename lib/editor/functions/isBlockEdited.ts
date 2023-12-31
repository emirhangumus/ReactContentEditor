import { AnyBlock, HeadingBlock, ParagraphBlock } from "../types/BlockTypes";

export function isBlockEdited(blockData: AnyBlock) {
    if (blockData.type === "paragraph") {
        return isParagraphBlockEdited(blockData);
    }
    if (blockData.type === "heading") {
        return isHeadingBlockEdited(blockData);
    }
}

function isParagraphBlockEdited(blockData: ParagraphBlock) {
    return blockData.text !== "";
}

function isHeadingBlockEdited(blockData: HeadingBlock) {
    return blockData.text !== "";
}
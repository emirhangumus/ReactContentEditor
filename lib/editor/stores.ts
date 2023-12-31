import { atom } from "jotai";
import { EditorData } from "./types/BlockTypes";

export const editorAtom = atom<EditorData>({
    blocks: [],
    timestamp: Date.now(),
});

export const editorRefAtom = atom<React.RefObject<HTMLDivElement>>({
    current: null,
});

export const editorLeftPanelIsOpenAtom = atom<{
    state: boolean,
    targetId: string | null,
    type: "block" | "actions" | null
}>({
    state: false,
    targetId: null,
    type: null,
});
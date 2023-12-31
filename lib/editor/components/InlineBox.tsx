import { useAtom } from "jotai";
import { editorAtom } from "../stores";
import { AnyBlock } from "../types/BlockTypes";

export const InlineBox = ({ blockData }: { blockData: AnyBlock }) => {
    const [data, setData] = useAtom(editorAtom);

    return (
        <div className="absolute top-0 left-0 bg-white p-1 shadow">
            <button
                onClick={() => {
                    setData({
                        ...data,
                        blocks: data.blocks.filter((block) => block.id !== blockData.id),
                    });
                }}
            >
                Delete
            </button>
        </div>
    );
}
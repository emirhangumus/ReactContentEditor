import { useAtom } from "jotai";
import { generateBlockId } from "../functions/generateBlockId";
import { isBlockEdited } from "../functions/isBlockEdited";
import SixDotsIcon from "../icons/SixDots";
import { Button } from "../shared/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../shared/Popover";
import { editorAtom, editorLeftPanelIsOpenAtom } from "../stores";
import { AnyBlock } from "../types/BlockTypes";

type ALLOWED_BLOCK_TYPES = "paragraph" | "heading";

export function LeftPanel({ blockData }: { blockData: AnyBlock }) {
  return (
    <div className="flex items-center gap-1">
      <BlockPanel blockData={blockData} />
      <ActionsPanel blockData={blockData} />
    </div>
  );
}

const BlockPanel = ({ blockData }: { blockData: AnyBlock }) => {
  const [data, setData] = useAtom(editorAtom);
  const [leftPanelIsOpen, setLeftPanelIsOpen] = useAtom(
    editorLeftPanelIsOpenAtom
  );

  const addBlock = (type: ALLOWED_BLOCK_TYPES) => {
    // if last element two blocks are empty, don't add new block
    if (data.blocks.length > 1) {
      const lastBlock = data.blocks[data.blocks.length - 1];
      const secondLastBlock = data.blocks[data.blocks.length - 2];
      if (lastBlock.text === "" && secondLastBlock.text === "") {
        return;
      }
    }

    if (!isBlockEdited(blockData)) {
      // if block is not edited, don't add new block, replace it with selected
      const blockIndex = data.blocks.findIndex(
        (block) => block.id === blockData.id
      );

      const newBlocks = [...data.blocks];
      if (type === "heading") {
        newBlocks[blockIndex] = {
          id: generateBlockId(),
          type,
          text: "",
          level: 1,
        };
      }
      if (type === "paragraph") {
        newBlocks[blockIndex] = {
          id: generateBlockId(),
          type,
          text: "",
        };
      }
      setData({
        ...data,
        blocks: newBlocks,
      });
    } else {
      if (type === "heading") {
        setData({
          ...data,
          blocks: [
            ...data.blocks,
            {
              id: generateBlockId(),
              type,
              text: "",
              level: 1,
            },
          ],
        });
      }
      if (type === "paragraph") {
        setData({
          ...data,
          blocks: [
            ...data.blocks,
            {
              id: generateBlockId(),
              type,
              text: "",
            },
          ],
        });
      }
    }
    // close left panel
    setLeftPanelIsOpen({
      state: false,
      targetId: null,
      type: null,
    });
  };

  return (
    <Popover
      onOpenChange={(e) => {
        setLeftPanelIsOpen({
          state: e,
          targetId: blockData.id,
          type: "block",
        });
      }}
      open={
        leftPanelIsOpen.state &&
        leftPanelIsOpen.targetId === blockData.id &&
        leftPanelIsOpen.type === "block"
      }
    >
      <PopoverTrigger className="cursor-pointer">
        <Button
          variant={"ghost"}
          className="text-gray-500 hover:text-gray-700 p-0 aspect-square h-6 shadow"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white">
        <ul className="flex flex-col gap-2 p-2">
          <li>
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={() => addBlock("paragraph")}
            >
              Paragraph
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={() => addBlock("heading")}
            >
              Heading
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

const ActionsPanel = ({ blockData }: { blockData: AnyBlock }) => {
  const [data, setData] = useAtom(editorAtom);
  const [leftPanelIsOpen, setLeftPanelIsOpen] = useAtom(
    editorLeftPanelIsOpenAtom
  );

  const moveBlock = (direction: "up" | "down") => {
    const blockIndex = data.blocks.findIndex(
      (block) => block.id === blockData.id
    );
    const block = data.blocks[blockIndex];
    if (direction === "up") {
      if (blockIndex === 0) {
        return;
      }
      const newBlocks = [...data.blocks];
      newBlocks[blockIndex] = newBlocks[blockIndex - 1];
      newBlocks[blockIndex - 1] = block;
      setData({
        ...data,
        blocks: newBlocks,
      });
    }
    if (direction === "down") {
      if (blockIndex === data.blocks.length - 1) {
        return;
      }
      const newBlocks = [...data.blocks];
      newBlocks[blockIndex] = newBlocks[blockIndex + 1];
      newBlocks[blockIndex + 1] = block;
      setData({
        ...data,
        blocks: newBlocks,
      });
    }
    // close left panel
    setLeftPanelIsOpen({
      state: false,
      targetId: null,
      type: null,
    });
  };

  const deleteBlock = (id: string) => {
    setData({
      ...data,
      blocks: data.blocks.filter((block) => block.id !== id),
    });
    if (data.blocks.length === 1) {
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
    }
    // close left panel
    setLeftPanelIsOpen({
      state: false,
      targetId: null,
      type: null,
    });
  };

  return (
    <Popover
      onOpenChange={(e) => {
        setLeftPanelIsOpen({
          state: e,
          targetId: blockData.id,
          type: "actions",
        });
      }}
      open={
        leftPanelIsOpen.state &&
        leftPanelIsOpen.targetId === blockData.id &&
        leftPanelIsOpen.type === "actions"
      }
    >
      <PopoverTrigger className="cursor-pointer">
        <Button
          variant={"ghost"}
          className="text-gray-500 hover:text-gray-700 p-0 aspect-square h-6 shadow"
        >
          <SixDotsIcon className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white">
        <ul className="flex flex-col gap-2 p-2">
          <li>
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={() => moveBlock("up")}
            >
              Move up
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={() => deleteBlock(blockData.id)}
            >
              Delete
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={() => moveBlock("down")}
            >
              Move down
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

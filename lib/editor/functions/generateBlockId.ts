import { nanoid } from "nanoid";

export const generateBlockId = (size: number = 8) => {
    return 'block_' + nanoid(size);
} 
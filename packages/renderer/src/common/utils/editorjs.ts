import { OutputData } from "@editorjs/editorjs";

export function extract_text_from_blocks(blocks: OutputData["blocks"]) {
  let result = "";
  for (const block of blocks) {
    if (block.type === "paragraph" || block.type === "header") {
      result += block.data.text + "\n";
    }

    // TODO: 解析 list 和 unordered 等类型的 block 的内容。
  }
  return result;
}

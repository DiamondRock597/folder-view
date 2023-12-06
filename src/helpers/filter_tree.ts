import { FolderNode } from "../models/folder_node";

export const filterTree = (item: FolderNode, selectedNode: string): boolean => {
  if (item.name.includes(selectedNode)) {
    return true;
  }

  if (item.children) {
    for (const child of item.children) {
      return filterTree(child, selectedNode);
    }
  }

  return false;
};

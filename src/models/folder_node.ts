export interface FolderNode {
  name: string;
  type: string;
  children?: Array<FolderNode>;
}

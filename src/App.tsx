import React, { useState } from "react";

import { TreeNode } from "./components/TreeNode";
import { Search } from "./components/Search";
import DATA from "./data/folders.json";
import { filterTree } from "./helpers/filter_tree";
import { FolderNode } from "./models/folder_node";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<FolderNode>(DATA);

  const onDeleteNode = (id: string) => setData((prev) => ({ ...prev, children: prev.children?.filter((item) => !filterTree(item, id)) }));

  if (!data) {
    return <div>Root Node is not declared</div>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>File Explorer</h2>
      <Search value={value} variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)} />
      <TreeNode
        onDeleteNode={onDeleteNode}
        node={{ ...data, children: data.children?.filter((item) => filterTree(item, value)) }}
        selectedNode={value}
      />
    </div>
  );
};
export default App;

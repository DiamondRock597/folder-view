import React, { useEffect, useState } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Button } from "@mui/material";
import { ExpandLess, ExpandMore, FolderCopy, FileCopy, Delete } from "@mui/icons-material";

import { FolderNode } from "../../models/folder_node";

interface Props {
  node: FolderNode;
  selectedNode: string;

  onDeleteNode: (id: string) => void;
}

export const TreeNode: React.FC<Props> = ({ node, selectedNode, onDeleteNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedNode) {
      return;
    }

    const containsSelectedNode =
      node.name.toLowerCase().includes(selectedNode.toLowerCase()) ||
      node.children?.some((child) => child.name.toLowerCase().includes(selectedNode.toLowerCase()));

    if (containsSelectedNode) {
      setIsOpen(true);
    }
  }, [selectedNode, node]);

  const toggleNode = () => setIsOpen((prev) => !prev);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav">
      <ListItemButton
        sx={{ backgroundColor: "#b3b1b1", opacity: isOpen && node.name.toLowerCase().includes(selectedNode.toLowerCase()) ? 1 : 0.7 }}
        onClick={toggleNode}
      >
        <ListItemIcon>{node.type === "file" ? <FileCopy /> : <FolderCopy />}</ListItemIcon>
        <ListItemText primary={node.name} />
        {node.name !== "Root" ? (
          <Button variant="text" onClick={() => onDeleteNode(node.name)}>
            <Delete color="error" />
          </Button>
        ) : null}
        {node.children?.length ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
      {node.children?.length ? (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <div style={{ marginLeft: "20px" }}>
            {node.children.map((child) => (
              <TreeNode onDeleteNode={onDeleteNode} selectedNode={selectedNode} key={`TreeNode-${child.name}`} node={child} />
            ))}
          </div>
        </Collapse>
      ) : null}
    </List>
  );
};

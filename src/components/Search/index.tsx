import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export const Search: React.FC<TextFieldProps<"outlined">> = (props) => (
  <TextField {...props} id="filled-search" label="Search folder or file" type="search" variant="outlined" sx={{ width: "100%" }} />
);

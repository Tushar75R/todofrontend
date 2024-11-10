// src/components/SearchBar.jsx
import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <TextField
      margin="dense"
      name="searchQuery"
      label="Search"
      type="text"
      fullWidth
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
    />
  );
};

export default SearchBar;

import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function ApplyPagination({ limit, page, totalPages, changeLimit, changePage, CHANGE_LIMIT_ALLOWED}) {
  return (
    <Stack direction="column" spacing={4} alignItems="center">
      {/* ROWS PER PAGE */}
      {(CHANGE_LIMIT_ALLOWED && <FormControl sx={{ width: "120px" }}>
        <InputLabel id="limit">rows per page</InputLabel>
        
        <Select
          labelId="limit"
          id="limit"
          value={limit}
          label="limit"
          onChange={(e) => {
            changeLimit(e.target.value);
          }}
        >
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>)}

      {/* PAGINATION */}
      <Pagination
        shape="rounded"
        color="secondary"
        siblingCount={2}
        boundaryCount={3}
        count={totalPages}
        page={page}
        onChange={(e, page) => changePage(page)}
      />
    </Stack>
  );
}

export default ApplyPagination;

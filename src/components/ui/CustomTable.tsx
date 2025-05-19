
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

export interface Column {
  key: string;
  label: string;
  filterable?: boolean;
  param?: string;
  renderCell?: (row: any) => React.ReactNode;
}

export interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: any) => void;
  color?: "primary" | "secondary" | "error";
}

interface PaginationProps {
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

interface CustomTableProps {
  data: any[];
  columns: Column[];
  actions?: Action[];
  customDialog?: React.ReactNode;
  pagination?: PaginationProps;
  fetchData?: (page: number, perPage: number) => void; // Function to fetch new data
}

const CustomTable: React.FC<CustomTableProps> = ({ data, columns, actions, customDialog, pagination, fetchData }) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [menuAnchor, setMenuAnchor] = useState<{ [key: number]: HTMLElement | null }>({});
  
  // Client-side pagination states (only used if pagination is not provided)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (pagination && fetchData) {
      fetchData(pagination.currentPage, pagination.perPage);
    }
  }, [pagination?.currentPage, pagination?.perPage]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value.toLowerCase() }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (pagination && fetchData) {
      fetchData(newPage + 1, pagination.perPage); // Convert to 1-based index for API
    } else {
      setPage(newPage); // Client-side pagination
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (pagination && fetchData) {
      fetchData(1, newRowsPerPage); // Reset to first page for server-side pagination
    } else {
      setRowsPerPage(newRowsPerPage); // Client-side pagination
      setPage(0); // Reset to first page
    }
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, rowId: number) => {
    setMenuAnchor((prev) => ({ ...prev, [rowId]: event.currentTarget }));
  };

  const handleCloseMenu = (rowId: number) => {
    setMenuAnchor((prev) => ({ ...prev, [rowId]: null }));
  };

  // Apply filters to data (for client-side filtering)
  const filteredData = data.filter((row) =>
    columns.every((col) =>
      col.filterable
        ? row[col.key]?.toString().toLowerCase().includes(filters[col.key] || "")
        : true
    )
  );

  // Apply client-side pagination if server-side pagination is not used
  const paginatedData = pagination ? filteredData : filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <TableContainer component={Paper} className="shadow-md rounded-lg">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-100">
            {columns.map((col) => (
              <TableCell key={col.key}>{col.label}</TableCell>
            ))}
            {actions?.length ? <TableCell>Actions</TableCell> : null}
          </TableRow>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key}>
                {col.filterable && (
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder={`Search ${col.label}`}
                    value={filters[col.key] || ""}
                    onChange={(e) => handleFilterChange(col.key, e.target.value)}
                    style={{ width: "100%" }}
                  />
                )}
              </TableCell>
            ))}
            {actions?.length ? <TableCell></TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <TableRow key={index}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.renderCell ? col.renderCell(row) : col.param ? row[col.key][col.param] : row[col.key] || "-"}
                  </TableCell>
                ))}
                {actions?.length ? (
                  <TableCell>
                    <IconButton onClick={(e) => handleOpenMenu(e, index)}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchor[index]}
                      open={Boolean(menuAnchor[index])}
                      onClose={() => handleCloseMenu(index)}
                    >
                      {actions.map((action, i) => (
                        <MenuItem key={i} onClick={() => action.onClick(row)}>
                          {action.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + (actions?.length ? 1 : 0)} style={{ textAlign: "center" }}>
                No matching records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Server-side or Client-side Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={pagination ? pagination.totalItems : filteredData.length}
        rowsPerPage={pagination ? pagination.perPage : rowsPerPage}
        page={pagination ? pagination.currentPage - 1 : page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {customDialog}
    </TableContainer>
  );
};

export default CustomTable;

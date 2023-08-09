import React from "react";
import jsonData from "../MOCK_DATA.json";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { TextField } from "@mui/material";

function createData(
  flight_number,
  departure_airport,
  arrival_airport,
  departure_date,
  arrival_date,
  departure_time,
  arrival_time,
  flight_duration,
  passenger_count,
  airline_name
) {
  return {
    flight_number,
    departure_airport,
    arrival_airport,
    departure_date,
    arrival_date,
    departure_time,
    arrival_time,
    flight_duration,
    passenger_count,
    airline_name,
  };
}

const rows = jsonData.map((data) =>
  createData(
    data.flight_number,
    data.departure_airport,
    data.arrival_airport,
    data.departure_date,
    data.arrival_date,
    data.departure_time,
    data.arrival_time,
    data.flight_duration,
    data.passenger_count,
    data.airline_name
  )
);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "flight_number",
    numeric: true,
    disablePadding: true,
    label: "Flight Number",
  },
  {
    id: "departure_airport",
    numeric: false,
    disablePadding: false,
    label: "Dept. Airport",
  },
  {
    id: "arrival_airport",
    numeric: false,
    disablePadding: false,
    label: "Arr. Airport",
  },
  {
    id: "departure_date",
    numeric: false,
    disablePadding: false,
    label: "Dept. Date",
  },
  {
    id: "arrival_date",
    numeric: false,
    disablePadding: false,
    label: "Arr. Date",
  },
  {
    id: "departure_time",
    numeric: true,
    disablePadding: false,
    label: "Dept. Time",
  },
  {
    id: "arrival_time",
    numeric: true,
    disablePadding: false,
    label: "Arr. Time",
  },
  {
    id: "flight_duration",
    numeric: true,
    disablePadding: false,
    label: "Flight Duration",
  },
  {
    id: "passenger_count",
    numeric: true,
    disablePadding: false,
    label: "Passenger Count",
  },
  {
    id: "airline_name",
    numeric: false,
    disablePadding: false,
    label: "Airline Name",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    searchValues,
    onSearchInputChange,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                value={searchValues[headCell.id]}
                onChange={(event) => onSearchInputChange(event, headCell.id)}
                id="outlined-basic"
                label={`${headCell.label}`}
                variant="outlined"
                style={{ width: "100%" }}
                size="small"
              />
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{
            flex: "1 1 100%",
          }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          <span
            style={{
              backgroundColor: "#3f51b5",
              color: "#FFF",
              borderRadius: "20px",
              padding: "6px 16px", // More padding for a bold look
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Subtle shadow
              display: "inline-block", // Ensures proper spacing
              marginRight: "12px", // A bit more space for a clean separation
              fontSize: "14px", // Adjust font size
              fontWeight: "600", // Bold font weight
            }}
          >
            {numSelected}
          </span>
          {numSelected === 1 ? "item" : "items"} selected
        </Typography>
      ) : (
        <Typography
          sx={{
            flex: "1 1 100%",
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Air Data
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchValues, setSearchValues] = React.useState({
    flight_number: "",
    departure_airport: "",
    arrival_airport: "",
    departure_date: "",
    arrival_date: "",
    departure_time: "",
    arrival_time: "",
    flight_duration: "",
    passenger_count: "",
    airline_name: "",
  });

  const handleSearchInputChange = (event, columnId) => {
    try {
      const updatedSearchValues = {
        ...searchValues,
        [columnId]: event.target.value,
      };
      setSearchValues(updatedSearchValues);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.flight_number);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name = "") => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy))
        .filter((row) => {
          return Object.keys(searchValues).every((columnId) => {
            if (!searchValues[columnId]) {
              return true;
            }
            const cellValue = row[columnId]?.toString().toLowerCase();
            return cellValue?.includes(searchValues[columnId].toLowerCase());
          });
        })
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, searchValues]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
              borderCollapse: "collapse",
              border: "1px solid rgba(224, 224, 224, 1)",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              transition: "box-shadow 0.3s, border 0.3s",

              "&:hover": {
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(200, 200, 200, 1)",
              },

              "& thead": {
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              },

              "& th, & td": {
                padding: "12px",
                textAlign: "left",
              },

              "& th": {
                borderBottom: "1px solid rgba(200, 200, 200, 1)",
              },

              "& tbody tr": {
                transition: "background 0.3s",
              },

              "& tbody tr:hover": {
                background: "#f2f2f2",
              },
            }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              searchValues={searchValues}
              onSearchInputChange={handleSearchInputChange}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.flight_number);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.flight_number)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.flight_number}
                    sx={{
                      cursor: "pointer",
                      transition:
                        "background 0.3s, box-shadow 0.3s, color 0.3s",

                      "&:hover": {
                        background: "#f2f2f2",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",

                        "& .MuiTableCell-root": {
                          color: "#000",
                          transition: "color 0.3s",
                        },
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="right"
                    >
                      {row.flight_number}
                    </TableCell>
                    <TableCell align="right">{row.departure_airport}</TableCell>
                    <TableCell align="right">{row.arrival_airport}</TableCell>
                    <TableCell align="right">{row.departure_date}</TableCell>
                    <TableCell align="right">{row.arrival_date}</TableCell>
                    <TableCell align="right">{row.departure_time}</TableCell>
                    <TableCell align="right">{row.arrival_time}</TableCell>
                    <TableCell align="right">{row.flight_duration}</TableCell>
                    <TableCell align="right">{row.passenger_count}</TableCell>
                    <TableCell align="right">{row.airline_name}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

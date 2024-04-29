import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
  },
  tableContainer: {
    marginTop: 20,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  imageCell: {
    maxWidth: 200,
    width: 200, // Fixed width for consistency
  },
  imageContainer: {
    width: '100%',
    height: 200, // Fixed height for consistency
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 'auto',
    height: '100%',
  },
  filterContainer: {
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    minWidth: 120,
    marginRight: 20,
  },
});

const SimpleTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:8000/api/getData")
      .then((response) => response.json())
      .then((data) => {
        // Extract unique categories from the products array
        const categories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(categories);
        console.log(categories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const fetchData = () => {
    fetch("http://localhost:8000/api/getData")
      .then((response) => response.json())
      .then((data) => setData(data.products))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredData(data); // Display all data if 'All' category is selected
    } else {
      const filtered = data.filter((item) => item.category === category);
      setFilteredData(filtered); // Filter data based on selected category
    }
  };

  const downloadCSV = () => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    data.forEach((row) => {
      const values = headers.map((header) => {
        return `"${row[header]}"`;
      });
      csvRows.push(values.join(","));
    });

    const csvData = csvRows.join("\n");
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvData}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ marginTop: "40px"}}>
      <div className={classes.filterContainer}>
      <Typography gutterBottom style={{ color: "black", marginRight: "10px" }}>
          Filter by Category
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
          >
            <MenuItem value="All">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Id</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Category
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Price</TableCell>
              <TableCell className={classes.tableHeaderCell}>Size</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                In Stock
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Out Stock
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Barcode</TableCell>
              <TableCell className={classes.tableHeaderCell}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>{row.in_stock}</TableCell>
                <TableCell>{row.out_stock}</TableCell>
                <TableCell>{row.barcode}</TableCell>
                <TableCell className={classes.imageCell}>
  {row.image && (
    <div className={classes.imageContainer}>
      <img
        src={`http://localhost:8000/storage/images/${row.image}`}
        alt="Product"
        className={classes.image}
      />
    </div>
  )}
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "30px" }}
          onClick={fetchData}
        >
          Refresh Table
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: "30px" }}
          onClick={downloadCSV}
        >
          Download CSV
        </Button>
      </div>
    </div>
  );
};

export default SimpleTable;

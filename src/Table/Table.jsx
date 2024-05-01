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
  Drawer,
  TextField,
  InputLabel,
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
    width: "100%",
    height: 200, // Fixed height for consistency
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "auto",
    height: "100%",
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleEditClick = (rowData) => {
    // Function to handle opening the Drawer
    console.log(rowData);
    setSelectedRow(rowData);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    // Function to handle closing the Drawer
    setIsDrawerOpen(false);
  };

  const handleImageChange = (file) => {
    setSelectedImage(file);
    setSelectedRow((prevRow) => ({
      ...prevRow,
      image: file,
    }));
  };
  
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedRow((prevRow) => ({
      ...prevRow,
      image: null,
    }));
  };
  

  const handleSave = () => {
    if (!selectedRow) return;
  
    let requestData = {
      category: selectedRow.category,
      barcode: selectedRow.barcode,
      size: selectedRow.size,
      name: selectedRow.name,
      price: selectedRow.price,
      in_stock: selectedRow.in_stock,
      out_stock: selectedRow.out_stock,
    };
  
    // If image exists and it's different from the old one, delete the old image
    // if (selectedRow.image && selectedImage && selectedRow.image !== selectedImage.name) {
    //   fetch(`http://localhost:8000/api/deleteImage/${selectedRow.image}`, {
    //     method: "DELETE",
    //   })
    //     .then((response) => {
    //       if (response.ok) {
    //         console.log("Old image deleted successfully.");
    //       } else {
    //         console.error("Failed to delete old image.");
    //       }
    //     })
    //     .catch((error) => console.error("Error deleting old image:", error));
    // }
  
    // If image exists, convert it to base64
    // if (selectedImage) {
    //   const extension = selectedImage.name.split(".").pop();
    //   // Set the image name to the name field value with the file extension
    //   const imageName = `${selectedRow.name}.${extension}`;
    //   // consol
    //   // Convert image to base64
    //   const reader = new FileReader();
    //   reader.readAsDataURL(selectedImage);
    //   reader.onloadend = function () {
    //   const imageData = reader.result;
    //   // Append the image data and name to the requestData
    //   requestData = {
    //     ...requestData,
    //     image: imageData,
    //     image_name: imageName, // Store base64-encoded image string
    //   };
    //   sendUpdateRequest(requestData);
    //   };
    // } else {
      // If no image, send update request directly
      sendUpdateRequest(requestData);
    // }
  };
  

const sendUpdateRequest = (requestData) => {
  console.log(requestData);
    fetch(`http://localhost:8000/api/update/${selectedRow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Record updated successfully:", data);
        // Optionally, you can update the state or perform any other actions after successful update
      })
      .catch((error) => console.error("Error updating record:", error));
};

const handleInputChange = (event, field) => {
  const value = event.target.value;
  setSelectedRow((prevRow) => ({
    ...prevRow,
    [field]: value,
  }));
};


  return (
    <div style={{ marginTop: "40px" }}>
      <div className={classes.filterContainer}>
        <Typography
          gutterBottom
          style={{ color: "black", marginRight: "10px" }}
        >
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
              <TableCell className={classes.tableHeaderCell}>Action</TableCell>
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
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(row)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Drawer
            anchor="bottom"
            open={isDrawerOpen}
            onClose={handleCloseDrawer} // Call handleCloseDrawer function on close
          >
            {/* Content of your Drawer */}
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <FormControl>
                  <TextField
                    label="Category"
                    variant="outlined"
                    required
                    type="text"
                    name="category" // Add name attribute for category
                    value={selectedRow ? selectedRow.category : ""}
                    onChange={(e) => handleInputChange(e, "category")}

                  />
                  <TextField
                    label="Barcode"
                    variant="outlined"
                    style={{ marginTop: "10px" }}
                    required
                    type="text"
                    name="barcode" // Add name attribute for category
                    value={selectedRow ? selectedRow.barcode : ""}
                    onChange={(e) => handleInputChange(e, "barcode")}

                  />
                </FormControl>
                <FormControl>
                  <InputLabel id="size-label">Size</InputLabel>
                  <Select
                    labelId="size-label"
                    id="size"
                    label="Size"
                    name="size" // Add name attribute for size
                    value={selectedRow ? parseInt(selectedRow.size) : ""}
                    onChange={(e) => handleInputChange(e, "size")}

                  >
                    <MenuItem value={16}>16 (1.5 to 2 years)</MenuItem>
                    <MenuItem value={18}>18 (2 to 3 years)</MenuItem>
                    <MenuItem value={20}>20 (3 to 4 years)</MenuItem>
                    <MenuItem value={22}>22 (4 to 5 years)</MenuItem>
                    <MenuItem value={24}>24 (5 to 6 years)</MenuItem>
                    <MenuItem value={26}>26 (7 to 8 years)</MenuItem>
                    <MenuItem value={28}>28 (8 to 9 years)</MenuItem>
                    <MenuItem value={30}>30 (9 to 10 years)</MenuItem>
                    <MenuItem value={32}>32 (10 to 11 years)</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Name"
                  variant="outlined"
                  type="text"
                  required
                  name="name" // Add name attribute for name
                  value={selectedRow ? selectedRow.name : ""}
                  onChange={(e) => handleInputChange(e, "name")}

                />
                <TextField
                  label="Price"
                  variant="outlined"
                  type="number"
                  required
                  name="price" // Add name attribute for price
                  value={selectedRow ? selectedRow.price : ""}
                  onChange={(e) => handleInputChange(e, "price")}

                />
                <TextField
                  label="In Stock"
                  variant="outlined"
                  type="number"
                  required
                  name="inStock" // Add name attribute for inStock
                  value={selectedRow ? selectedRow.in_stock : ""}
                  onChange={(e) => handleInputChange(e, "in_stock")}

                />
                <TextField
                  label="Out Stock"
                  variant="outlined"
                  type="number"
                  required
                  name="outStock" // Add name attribute for outStock
                  value={selectedRow ? selectedRow.out_stock : ""}
                  onChange={(e) => handleInputChange(e, "out_stock")}

                />

<FormControl>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleImageChange(e.target.files[0])}
  />
  {selectedImage && (
    <img
      src={URL.createObjectURL(selectedImage)}
      style={{ maxWidth: "100px", marginTop: "10px" }}
    />
  )}
  {/* Only render the existing image if there is no selectedImage */}
  {!selectedImage && selectedRow && selectedRow.image && (
    <div className={classes.imageContainer}>
      <img
        src={`http://localhost:8000/storage/images/${selectedRow.image}`}
        className={classes.image}
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  )}
</FormControl>

              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRemoveImage}
                style={{
                  marginTop: "30px",
                  marginBottom: "5px",
                  marginRight: "5px",
                  width: "150px",
                }}
              >
                Remove Image
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: "30px",
                  marginBottom: "5px",
                  marginRight: "5px",
                  width: "120px",
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </Drawer>
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

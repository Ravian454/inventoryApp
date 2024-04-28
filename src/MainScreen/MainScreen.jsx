import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Navbar from "../Navbar/Navbar.jsx";
import Loader from "../Loader/Loader.jsx";
import SimpleTable from "../Table/Table.jsx";

const MainScreen = () => {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(true);
  // const [tableData, setTableData] = useState([]);
  // const [formSubmitted, setFormSubmitted] = useState(false);
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      barcodeRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!loading && barcodeRef.current) {
      barcodeRef.current.focus();
    }
  }, [loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      category: event.target.category.value,
      name: event.target.name.value,
      price: event.target.price.value,
      size: event.target.size.value,
      in_stock: event.target.inStock.value,
      out_stock: event.target.outStock.value,
      barcode: event.target.barcode.value,
    };
  
    try {      
      const postDataResponse = await fetch("http://localhost:8000/api/insertData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!postDataResponse.ok) {
        throw new Error("Failed to insert data");
      }
  
      // Optionally, handle successful response
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };
  

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        style={{
          marginTop: "50px",
          justifyContent: "end",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <style>{`
          body {
            display: block; /* Reset body's display property */
            background-color: white;
          }
        `}</style>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Barcode"
                variant="outlined"
                type="text"
                value={barcode}
                onChange={handleBarcodeChange}
                inputProps={{ "data-testid": "barcode-input" }}
                inputRef={barcodeRef}
                name="barcode" // Add name attribute for barcode
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                required
                type="text"
                name="category" // Add name attribute for category
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="size-label">Age</InputLabel>
                <Select
                  labelId="size-label"
                  id="size"
                  label="Size"
                  defaultValue={16}
                  name="size" // Add name attribute for size
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                type="text"
                required
                name="name" // Add name attribute for name
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                type="number"
                required
                name="price" // Add name attribute for price
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="In Stock"
                variant="outlined"
                type="number"
                required
                name="inStock" // Add name attribute for inStock
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Out Stock"
                variant="outlined"
                type="number"
                required
                name="outStock" // Add name attribute for outStock
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Done
              </Button>
            </Grid>
          </Grid>
        </form>

        <SimpleTable />
      </Container>
    </>
  );
};

export default MainScreen;

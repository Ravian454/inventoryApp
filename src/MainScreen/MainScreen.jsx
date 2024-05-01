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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar.jsx";
import Loader from "../Loader/Loader.jsx";
import SimpleTable from "../Table/Table.jsx";

const MainScreen = () => {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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
  
    // Your remaining form submission logic
    const formData = new FormData();
    formData.append("category", event.target.category.value);
    formData.append("name", event.target.name.value);
    formData.append("price", event.target.price.value);
    formData.append("size", event.target.size.value);
    formData.append("in_stock", event.target.inStock.value);
    formData.append("out_stock", event.target.outStock.value);
    formData.append("barcode", event.target.barcode.value);
  
    if (selectedImage) {
      // Get the file extension
      const extension = selectedImage.name.split(".").pop();
      // Set the image name to the name field value with the file extension
      const imageName = `${event.target.name.value}.${extension}`;
  
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = function () {
        const imageData = reader.result;
        // Append the image data and name to the formData
        formData.append("image", imageData);
        formData.append("image_name", imageName);
        // Send formData to the backend
        sendFormData(formData);
      };
    } else {
      // If no image is selected, directly send formData to the backend
      sendFormData(formData);
    }
  };
  
  const sendFormData = async (formData) => {
    try {
      const postDataResponse = await fetch("http://localhost:8000/api/insertData", {
        method: "POST",
        body: formData,
      });
      if (!postDataResponse.ok) {
        throw new Error("Failed to insert data");
      }
  
      // Reset form and state after successful submission
      setBarcode("");
      setSelectedImage(null);
      toast.success("Data inserted successfully");
      // event.target.reset();
      // location.reload();
    } catch (error) {
      setError(error.message);
      if (error.message === "Failed to insert data") {
        toast.error(`Product Already Exists`);
      }
    }
  };
  

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Container
        // maxWidth="sm"
        maxWidth="lg"
        style={{
          marginTop: "50px",
        }}
      >
        <style>{`
          body {
            display: block; 
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
                type="number"
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
                <InputLabel id="size-label">Size</InputLabel>
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
            <Grid item xs={6}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />
              )}
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
      <ToastContainer />
    </>
  );
};

export default MainScreen;

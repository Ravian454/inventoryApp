import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Container, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Navbar from '../Navbar/Navbar.jsx';

const MainScreen = () => {
  const [barcode, setBarcode] = useState('');
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      barcodeRef.current.focus();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ marginTop: '50px',  justifyContent: 'end', minHeight: 'calc(100vh - 64px)' }}>
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
                inputProps={{ 'data-testid': 'barcode-input' }}
                inputRef={barcodeRef}
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
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="size-label">Age</InputLabel>
                <Select
                  labelId="size-label"
                  id="size"
                  label="Age"
                  defaultValue={10}
                >
                  <MenuItem value={10}>16 (1.5 to 2 years)</MenuItem>
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
                label="Names"
                variant="outlined"
                type="text"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                type="number"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="In Stock"
                variant="outlined"
                type="number"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Out Stock"
                variant="outlined"
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default MainScreen;

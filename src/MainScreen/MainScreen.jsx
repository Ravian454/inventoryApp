import React from 'react';
import { TextField, Button, Container, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const MainScreen = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <style>{'body { background-color: white; }'}</style>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              type="email"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="size-label">Age</InputLabel>
              <Select
                labelId="size-label"
                id="size"
                label="Age"
              >
                <MenuItem value={10}>16 (1.5 to 2 years)</MenuItem>
                <MenuItem value={20}>18 (2 to 3 years)</MenuItem>
                <MenuItem value={30}>20 (3 to 4 years)</MenuItem>
                <MenuItem value={30}>22 (4 to 5 years)</MenuItem>
                <MenuItem value={30}>24 (5 to 6 years)</MenuItem>
                <MenuItem value={30}>26 (7 to 8 years)</MenuItem>
                <MenuItem value={30}>28 (8 to 9 years)</MenuItem>
                <MenuItem value={30}>30 (9 to 10 years)</MenuItem>
                <MenuItem value={30}>32 (10 to 11 years)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              type="email"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="In Stock"
              variant="outlined"
              type="email"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Out Stock"
              variant="outlined"
              type="email"
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
  );
};

export default MainScreen;

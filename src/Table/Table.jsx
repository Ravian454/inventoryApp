import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 750,
  },
  tableContainer: {
    marginTop: 20,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Adding shadow effect
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0', // Background color for header cells
  },
});

const SimpleTable = ({ data }) => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: '40px' }}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Category</TableCell>
              <TableCell className={classes.tableHeaderCell}>Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Price</TableCell>
              <TableCell className={classes.tableHeaderCell}>Size</TableCell>
              <TableCell className={classes.tableHeaderCell}>In Stock</TableCell>
              <TableCell className={classes.tableHeaderCell}>Out Stock</TableCell>
              <TableCell className={classes.tableHeaderCell}>Barcode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>{row.inStock}</TableCell>
                <TableCell>{row.outStock}</TableCell>
                <TableCell>{row.barcode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SimpleTable;

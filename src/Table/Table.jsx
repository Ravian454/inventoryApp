import React, { useEffect, useState } from 'react';
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
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 750,
  },
  tableContainer: {
    marginTop: 20,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
  imageCell: {
    maxWidth: 200,
  },
  image: {
    width: '350px', 
    height: 'auto',
  },
});

const SimpleTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8000/api/getData')
      .then(response => response.json())
      .then(data => setData(data.products))
      .catch(error => console.error('Error fetching data:', error));
  };

  const downloadCSV = () => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    data.forEach(row => {
      const values = headers.map(header => {
        return `"${row[header]}"`;
      });
      csvRows.push(values.join(','));
    });

    const csvData = csvRows.join('\n');
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvData}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'table_data.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Id</TableCell>
              <TableCell className={classes.tableHeaderCell}>Category</TableCell>
              <TableCell className={classes.tableHeaderCell}>Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Price</TableCell>
              <TableCell className={classes.tableHeaderCell}>Size</TableCell>
              <TableCell className={classes.tableHeaderCell}>In Stock</TableCell>
              <TableCell className={classes.tableHeaderCell}>Out Stock</TableCell>
              <TableCell className={classes.tableHeaderCell}>Barcode</TableCell>
              <TableCell className={classes.tableHeaderCell}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
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
                  {row.image && <img src={`http://localhost:8000/storage/images/${row.image}`} alt="Product" className={classes.image} />} {/* Display image if available */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttonContainer}>
        <Button variant="contained" color="primary" style={{ marginTop: '30px' }} onClick={fetchData}>
          Refresh Table
        </Button>
        <Button variant="contained" color="secondary" style={{ marginTop: '30px' }} onClick={downloadCSV}>
          Download CSV
        </Button>
      </div>
    </div>
  );
};

export default SimpleTable;

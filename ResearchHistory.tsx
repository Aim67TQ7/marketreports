import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import { Link } from 'react-router-dom';

const ResearchHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setResearch([
        {
          id: '1',
          title: 'Electric Vehicle Market Analysis',
          date: '2025-04-20',
          status: 'completed',
          industry: 'Automotive',
        },
        {
          id: '2',
          title: 'Renewable Energy Sector Overview',
          date: '2025-04-15',
          status: 'completed',
          industry: 'Energy',
        },
        {
          id: '3',
          title: 'AI in Healthcare Market Trends',
          date: '2025-04-10',
          status: 'completed',
          industry: 'Healthcare',
        },
        {
          id: '4',
          title: 'Cloud Computing Services Market',
          date: '2025-04-05',
          status: 'completed',
          industry: 'Technology',
        },
        {
          id: '5',
          title: 'Sustainable Fashion Industry Analysis',
          date: '2025-04-01',
          status: 'completed',
          industry: 'Retail',
        },
        {
          id: '6',
          title: 'Digital Banking Transformation',
          date: '2025-03-25',
          status: 'completed',
          industry: 'Finance',
        },
        {
          id: '7',
          title: 'Smart Home Devices Market',
          date: '2025-03-20',
          status: 'completed',
          industry: 'Consumer Electronics',
        },
        {
          id: '8',
          title: 'Plant-Based Food Market Growth',
          date: '2025-03-15',
          status: 'completed',
          industry: 'Food & Beverage',
        },
        {
          id: '9',
          title: 'Telemedicine Services Expansion',
          date: '2025-03-10',
          status: 'completed',
          industry: 'Healthcare',
        },
        {
          id: '10',
          title: '5G Infrastructure Development',
          date: '2025-03-05',
          status: 'completed',
          industry: 'Telecommunications',
        },
        {
          id: '11',
          title: 'Quantum Computing Market Potential',
          date: '2025-03-01',
          status: 'completed',
          industry: 'Technology',
        },
        {
          id: '12',
          title: 'Autonomous Vehicles Industry Forecast',
          date: '2025-02-25',
          status: 'completed',
          industry: 'Automotive',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'in-progress':
        return '#ff9800';
      case 'failed':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Research History
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/research/new"
        >
          New Research
        </Button>
      </Box>

      <Paper sx={{ width: '100%', borderRadius: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="research history table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1">Loading research history...</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                research
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell component="th" scope="row">
                        <Link to={`/research/results/${row.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                          {row.title}
                        </Link>
                      </TableCell>
                      <TableCell>{row.industry}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'inline-block',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: `${getStatusColor(row.status)}20`,
                            color: getStatusColor(row.status),
                            fontWeight: 'medium',
                          }}
                        >
                          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          component={Link}
                          to={`/research/results/${row.id}`}
                          sx={{ mr: 1 }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="secondary"
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={research.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default ResearchHistory;

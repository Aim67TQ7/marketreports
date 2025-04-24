import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import RecentResearchCard from '../components/RecentResearchCard';
import StatisticsCard from '../components/StatisticsCard';

const Dashboard = () => {
  // Mock data - in a real app, this would come from an API
  const recentResearch = [
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
  ];

  const statistics = {
    totalResearch: 12,
    completedResearch: 10,
    inProgressResearch: 2,
    averageCompletionTime: '45 minutes',
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Market Research Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/research/new"
          size="large"
        >
          New Research
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <StatisticsCard 
            title="Total Research" 
            value={statistics.totalResearch} 
            icon="assignment"
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatisticsCard 
            title="Completed" 
            value={statistics.completedResearch} 
            icon="check_circle"
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatisticsCard 
            title="In Progress" 
            value={statistics.inProgressResearch} 
            icon="hourglass_empty"
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatisticsCard 
            title="Avg. Completion" 
            value={statistics.averageCompletionTime} 
            icon="speed"
            color="#9c27b0"
          />
        </Grid>

        {/* Recent Research */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Recent Research
              </Typography>
              <Button component={Link} to="/research/history">
                View All
              </Button>
            </Box>
            <Grid container spacing={3}>
              {recentResearch.map((research) => (
                <Grid item xs={12} md={4} key={research.id}>
                  <RecentResearchCard research={research} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

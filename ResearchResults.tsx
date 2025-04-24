import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MarketSizeChart from '../components/charts/MarketSizeChart';
import CompetitorAnalysisChart from '../components/charts/CompetitorAnalysisChart';
import TrendAnalysisChart from '../components/charts/TrendAnalysisChart';

const ResearchResults = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [research, setResearch] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setResearch({
        id: id,
        title: 'Electric Vehicle Market Analysis',
        status: 'completed',
        date: '2025-04-23',
        industry: 'Automotive',
        summary: 'The global electric vehicle market is experiencing rapid growth, driven by technological advancements, government incentives, and increasing environmental awareness. This report provides a comprehensive analysis of market trends, key players, and future outlook.',
        pdfUrl: '/reports/ev-market-analysis.pdf',
        sections: [
          {
            title: 'Executive Summary',
            content: 'The global electric vehicle (EV) market is projected to grow at a CAGR of 21.7% from 2025 to 2030, reaching a value of $1.2 trillion by 2030. Major factors driving this growth include declining battery costs, government incentives, and increasing consumer awareness about environmental issues. Tesla continues to lead the market with approximately 18% market share, followed by BYD, Volkswagen Group, and General Motors. The Asia-Pacific region, particularly China, remains the largest market for EVs, while Europe is experiencing the fastest growth rate.'
          },
          {
            title: 'Market Overview',
            content: 'The electric vehicle market encompasses battery electric vehicles (BEVs), plug-in hybrid electric vehicles (PHEVs), and fuel cell electric vehicles (FCEVs). BEVs currently dominate the market with a 67% share of all electric vehicles sold globally. The passenger car segment accounts for 78% of the total EV market, while commercial vehicles make up the remaining 22%. The average cost of lithium-ion battery packs has decreased by 89% from 2010 to 2025, reaching $100/kWh, which is considered the price parity threshold with internal combustion engine vehicles.'
          },
          {
            title: 'Competitive Landscape',
            content: 'The EV market features a mix of traditional automakers and new entrants. Tesla maintains its leadership position with strong brand recognition and advanced technology. Chinese manufacturers like BYD and NIO are rapidly expanding globally. Traditional automakers including Volkswagen Group, General Motors, and Hyundai-Kia have committed to electrifying their fleets, with significant investments in EV-specific platforms. New entrants such as Rivian and Lucid are focusing on premium segments with innovative designs and technologies. Strategic partnerships between automakers, battery manufacturers, and technology companies are increasingly common.'
          },
          {
            title: 'Regional Analysis',
            content: 'China remains the largest EV market, accounting for 45% of global sales, supported by strong government policies and domestic manufacturing capabilities. Europe represents 30% of the global market, with Norway having the highest EV penetration rate at 86% of new car sales. North America accounts for 18% of global EV sales, with growth accelerating due to new federal incentives and expanding charging infrastructure. The Asia-Pacific region excluding China is experiencing rapid growth, particularly in South Korea and Japan, where domestic manufacturers are increasing their EV offerings.'
          },
          {
            title: 'Future Outlook',
            content: 'The EV market is expected to continue its rapid growth trajectory, with several key trends shaping its future. Solid-state batteries are projected to reach commercial viability by 2027, potentially doubling energy density and reducing charging times. Autonomous driving features will become increasingly integrated with EV platforms. Charging infrastructure is expected to expand significantly, with global public charging points projected to increase from 1.8 million in 2025 to 5.8 million by 2030. Vehicle-to-grid (V2G) technology will enable EVs to serve as distributed energy resources, providing grid services and additional revenue streams for owners.'
          }
        ],
        visualizations: {
          marketSize: {
            years: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
            values: [250, 350, 480, 630, 780, 950, 1120, 1300, 1500, 1750],
            cagr: 21.7
          },
          competitors: [
            { name: 'Tesla', share: 18 },
            { name: 'BYD', share: 12 },
            { name: 'Volkswagen Group', share: 10 },
            { name: 'General Motors', share: 8 },
            { name: 'Hyundai-Kia', share: 7 },
            { name: 'Stellantis', share: 6 },
            { name: 'Ford', share: 5 },
            { name: 'NIO', share: 4 },
            { name: 'BMW Group', share: 4 },
            { name: 'Others', share: 26 }
          ],
          trends: [
            { name: 'Battery Cost ($/kWh)', data: [132, 118, 110, 105, 100, 92, 85, 78, 72, 65] },
            { name: 'Charging Stations (100K)', data: [12, 14, 16, 18, 20, 28, 36, 44, 52, 58] },
            { name: 'EV Sales (Millions)', data: [6.8, 9.5, 12.8, 16.2, 20.5, 25.0, 30.2, 36.0, 42.5, 50.0] }
          ]
        }
      });
      setLoading(false);
    }, 1500);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading research results...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {research.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Industry: {research.industry} | Date: {research.date}
            </Typography>
          </Box>
          <Box>
            <Button 
              variant="contained" 
              startIcon={<DownloadIcon />}
              sx={{ mr: 1 }}
            >
              Download PDF
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<ShareIcon />}
              sx={{ mr: 1 }}
            >
              Share
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<BookmarkIcon />}
            >
              Save
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Executive Summary
        </Typography>
        <Typography variant="body1" paragraph>
          {research.summary}
        </Typography>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Report Content" />
          <Tab label="Market Visualizations" />
          <Tab label="Competitive Analysis" />
          <Tab label="Trend Analysis" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && (
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            {research.sections.map((section, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {section.content}
                </Typography>
                {index < research.sections.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))}
          </Paper>
        )}

        {tabValue === 1 && (
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Market Size and Growth
            </Typography>
            <Typography variant="body1" paragraph>
              The global electric vehicle market is projected to grow from $780 billion in 2025 to $1.75 trillion by 2030, representing a CAGR of 21.7%.
            </Typography>
            <Box sx={{ height: 400, mt: 3, mb: 5 }}>
              <MarketSizeChart data={research.visualizations.marketSize} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Source: Industry reports, market analysis, and company filings
            </Typography>
          </Paper>
        )}

        {tabValue === 2 && (
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Competitive Landscape
            </Typography>
            <Typography variant="body1" paragraph>
              The global EV market remains highly competitive with Tesla maintaining leadership position at 18% market share, followed by BYD at 12% and Volkswagen Group at 10%.
            </Typography>
            <Box sx={{ height: 400, mt: 3, mb: 5 }}>
              <CompetitorAnalysisChart data={research.visualizations.competitors} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Source: Company reports, industry analysis, Q1 2025 sales data
            </Typography>
          </Paper>
        )}

        {tabValue === 3 && (
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Key Market Trends
            </Typography>
            <Typography variant="body1" paragraph>
              Three critical trends are shaping the EV market: declining battery costs, expansion of charging infrastructure, and increasing sales volumes.
            </Typography>
            <Box sx={{ height: 400, mt: 3, mb: 5 }}>
              <TrendAnalysisChart data={research.visualizations.trends} years={research.visualizations.marketSize.years} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Source: BloombergNEF, International Energy Agency, industry reports
            </Typography>
          </Paper>
        )}
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          component={Link} 
          to="/research/new"
          sx={{ mr: 2 }}
        >
          New Research
        </Button>
        <Button 
          variant="outlined" 
          component={Link} 
          to="/"
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default ResearchResults;

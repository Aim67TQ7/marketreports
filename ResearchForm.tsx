import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Chip,
  Autocomplete
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResearchForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    topic: '',
    industry: '',
    focusAreas: [],
    timeframe: 'current',
    depth: 'comprehensive',
    visualizations: true,
    competitors: [],
    additionalNotes: '',
  });
  const [errors, setErrors] = useState({
    topic: '',
    industry: '',
  });

  // Mock data for industries and focus areas
  const industries = [
    'Automotive', 'Energy', 'Healthcare', 'Technology', 'Finance', 
    'Retail', 'Manufacturing', 'Telecommunications', 'Agriculture', 'Education'
  ];
  
  const focusAreas = [
    'Market Size', 'Growth Rate', 'Key Players', 'Competitive Landscape',
    'Consumer Trends', 'Regulatory Environment', 'Technology Trends',
    'Investment Activity', 'Regional Analysis', 'Future Outlook'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleFocusAreasChange = (event, newValue) => {
    setFormData({
      ...formData,
      focusAreas: newValue,
    });
  };

  const handleCompetitorsChange = (event, newValue) => {
    setFormData({
      ...formData,
      competitors: newValue,
    });
  };

  const validateStep = () => {
    const newErrors = {};
    let isValid = true;

    if (activeStep === 0) {
      if (!formData.topic.trim()) {
        newErrors.topic = 'Research topic is required';
        isValid = false;
      }
      
      if (!formData.industry) {
        newErrors.industry = 'Industry is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // In a real app, this would send the data to an API
    console.log('Submitting research request:', formData);
    
    // Mock successful submission - redirect to a results page with a fake ID
    navigate('/research/results/new-research-123');
  };

  const steps = ['Basic Information', 'Research Parameters', 'Additional Details'];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          New Market Research
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mt: 4 }}>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Research Topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  error={!!errors.topic}
                  helperText={errors.topic || "Enter the main topic for your market research"}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.industry}>
                  <InputLabel id="industry-label">Industry</InputLabel>
                  <Select
                    labelId="industry-label"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    label="Industry"
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.industry || "Select the industry for your research"}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="focus-areas"
                  options={focusAreas}
                  value={formData.focusAreas}
                  onChange={handleFocusAreasChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Focus Areas"
                      placeholder="Select focus areas"
                    />
                  )}
                />
                <FormHelperText>Select specific areas to focus on in your research</FormHelperText>
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="timeframe-label">Timeframe</InputLabel>
                  <Select
                    labelId="timeframe-label"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleChange}
                    label="Timeframe"
                  >
                    <MenuItem value="current">Current Market (Present)</MenuItem>
                    <MenuItem value="short-term">Short-term Forecast (1-2 years)</MenuItem>
                    <MenuItem value="medium-term">Medium-term Forecast (3-5 years)</MenuItem>
                    <MenuItem value="long-term">Long-term Forecast (5+ years)</MenuItem>
                  </Select>
                  <FormHelperText>Select the time period for your market analysis</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="depth-label">Research Depth</InputLabel>
                  <Select
                    labelId="depth-label"
                    name="depth"
                    value={formData.depth}
                    onChange={handleChange}
                    label="Research Depth"
                  >
                    <MenuItem value="overview">Overview (Brief summary)</MenuItem>
                    <MenuItem value="standard">Standard (Balanced detail)</MenuItem>
                    <MenuItem value="comprehensive">Comprehensive (In-depth analysis)</MenuItem>
                    <MenuItem value="expert">Expert (Exhaustive research)</MenuItem>
                  </Select>
                  <FormHelperText>Select how detailed you want the research to be</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="visualizations-label">Include Visualizations</InputLabel>
                  <Select
                    labelId="visualizations-label"
                    name="visualizations"
                    value={formData.visualizations}
                    onChange={handleChange}
                    label="Include Visualizations"
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                  <FormHelperText>Include charts, graphs, and other visual elements</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  id="competitors"
                  options={[]}
                  value={formData.competitors}
                  onChange={handleCompetitorsChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Key Competitors"
                      placeholder="Type and press enter"
                    />
                  )}
                />
                <FormHelperText>Add specific companies to include in competitive analysis (optional)</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Notes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Any specific requirements or questions you want addressed in the research"
                />
              </Grid>
            </Grid>
          )}
        </Box>

        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResearchForm;

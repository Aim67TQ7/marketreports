const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Main function to create PDF from research data
exports.createPdf = async (research) => {
  try {
    console.log(`Generating PDF for research: ${research.topic}`);
    
    // Create a unique filename
    const filename = `${uuidv4()}.pdf`;
    const pdfPath = path.join(__dirname, '../../uploads/pdfs', filename);
    
    // Ensure directory exists
    const dir = path.dirname(pdfPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Create PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title: research.topic,
        Author: 'Market Research App',
        Subject: `${research.industry} Industry Analysis`,
      }
    });
    
    // Pipe PDF to file
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);
    
    // Add content to PDF
    addCoverPage(doc, research);
    addTableOfContents(doc, research);
    addExecutiveSummary(doc, research);
    addSections(doc, research);
    addVisualizations(doc, research);
    addFooter(doc, research);
    
    // Finalize PDF
    doc.end();
    
    // Return promise that resolves when PDF is written
    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        // In a real app, this would be a URL to access the PDF
        const pdfUrl = `/api/downloads/${filename}`;
        resolve(pdfUrl);
      });
      
      stream.on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error('Error creating PDF:', error);
    throw error;
  }
};

// Add cover page to PDF
function addCoverPage(doc, research) {
  // Add logo
  // doc.image('path/to/logo.png', 50, 45, { width: 150 });
  
  // Add title
  doc.fontSize(28)
     .font('Helvetica-Bold')
     .text(research.topic, 50, 200, {
       align: 'center'
     });
  
  // Add subtitle
  doc.fontSize(18)
     .font('Helvetica')
     .text(`${research.industry} Industry Analysis`, 50, 250, {
       align: 'center'
     });
  
  // Add date
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  doc.fontSize(14)
     .text(`Generated on ${date}`, 50, 300, {
       align: 'center'
     });
  
  // Add page break
  doc.addPage();
}

// Add table of contents
function addTableOfContents(doc, research) {
  doc.fontSize(20)
     .font('Helvetica-Bold')
     .text('Table of Contents', 50, 50);
  
  doc.fontSize(12)
     .font('Helvetica')
     .text('Executive Summary', 50, 100)
     .text('1', 500, 100);
  
  let yPosition = 120;
  
  if (research.results && research.results.sections) {
    research.results.sections.forEach((section, index) => {
      doc.text(section.title, 50, yPosition)
         .text((index + 2).toString(), 500, yPosition);
      
      yPosition += 20;
    });
  }
  
  // Add visualizations to TOC
  doc.text('Market Size and Growth', 50, yPosition)
     .text((research.results.sections.length + 2).toString(), 500, yPosition);
  
  yPosition += 20;
  
  doc.text('Competitive Landscape', 50, yPosition)
     .text((research.results.sections.length + 3).toString(), 500, yPosition);
  
  yPosition += 20;
  
  doc.text('Key Market Trends', 50, yPosition)
     .text((research.results.sections.length + 4).toString(), 500, yPosition);
  
  // Add page break
  doc.addPage();
}

// Add executive summary
function addExecutiveSummary(doc, research) {
  doc.fontSize(20)
     .font('Helvetica-Bold')
     .text('Executive Summary', 50, 50);
  
  doc.fontSize(12)
     .font('Helvetica')
     .text(research.results.summary, 50, 90, {
       align: 'justify',
       width: 500
     });
  
  // Add page break
  doc.addPage();
}

// Add content sections
function addSections(doc, research) {
  if (!research.results || !research.results.sections) {
    return;
  }
  
  research.results.sections.forEach((section) => {
    doc.fontSize(20)
       .font('Helvetica-Bold')
       .text(section.title, 50, 50);
    
    doc.fontSize(12)
       .font('Helvetica')
       .text(section.content, 50, 90, {
         align: 'justify',
         width: 500
       });
    
    // Add page break
    doc.addPage();
  });
}

// Add visualizations
function addVisualizations(doc, research) {
  if (!research.results || !research.results.visualizations) {
    return;
  }
  
  // Market Size Visualization
  doc.fontSize(20)
     .font('Helvetica-Bold')
     .text('Market Size and Growth', 50, 50);
  
  doc.fontSize(12)
     .font('Helvetica')
     .text(`The global ${research.industry} market is projected to grow from $780 billion in 2025 to $1.75 trillion by 2030, representing a CAGR of 21.7%.`, 50, 90, {
       align: 'justify',
       width: 500
     });
  
  // In a real app, we would generate and embed actual charts here
  doc.rect(50, 150, 500, 300).stroke();
  doc.fontSize(14)
     .text('Market Size Chart (2021-2030)', 150, 300);
  
  // Add page break
  doc.addPage();
  
  // Competitive Landscape Visualization
  doc.fontSize(20)
     .font('Helvetica-Bold')
     .text('Competitive Landscape', 50, 50);
  
  doc.fontSize(12)
     .font('Helvetica')
     .text(`The global ${research.industry} market remains highly competitive with leading companies maintaining significant market share.`, 50, 90, {
       align: 'justify',
       width: 500
     });
  
  // In a real app, we would generate and embed actual charts here
  doc.rect(50, 150, 500, 300).stroke();
  doc.fontSize(14)
     .text('Market Share by Company (%)', 150, 300);
  
  // Add page break
  doc.addPage();
  
  // Trends Visualization
  doc.fontSize(20)
     .font('Helvetica-Bold')
     .text('Key Market Trends', 50, 50);
  
  doc.fontSize(12)
     .font('Helvetica')
     .text(`Three critical trends are shaping the ${research.industry} market: technological innovation, changing consumer preferences, and regulatory developments.`, 50, 90, {
       align: 'justify',
       width: 500
     });
  
  // In a real app, we would generate and embed actual charts here
  doc.rect(50, 150, 500, 300).stroke();
  doc.fontSize(14)
     .text('Key Trends (2021-2030)', 150, 300);
}

// Add footer to all pages
function addFooter(doc, research) {
  const totalPages = doc.bufferedPageRange().count;
  
  for (let i = 0; i < totalPages; i++) {
    doc.switchToPage(i);
    
    // Skip footer on cover page
    if (i === 0) continue;
    
    const bottom = doc.page.height - 50;
    
    doc.fontSize(10)
       .text(
         `${research.topic} | Market Research App | Page ${i + 1} of ${totalPages}`,
         50,
         bottom,
         { align: 'center', width: 500 }
       );
  }
}

import { setupTabNavigation } from './tabs.js';

document.addEventListener('DOMContentLoaded', () => {
    setupTabNavigation();
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when a tab is clicked
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mainNav.classList.remove('active');
        }
      });
    });
    
    // Sales chart
    const drawSalesChart = () => {
    const canvas = document.getElementById('salesChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    // Sample data - sales by day of the week
    const data = [4200, 5800, 6300, 7500, 6800, 9200, 8500];
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    
    // Chart dimensions - adjust based on screen size
    const isMobile = window.innerWidth <= 480;
    const padding = isMobile ? 10 : 40;
    const chartWidth = rect.width - padding;
    const chartHeight = isMobile ? 200 : 250;
    
    // Adjust bar width based on available space
    const barSpacing = isMobile ? 10 : 20;
    const barWidth = (chartWidth - (data.length * barSpacing)) / data.length;
    
    // Find max value for scaling
    const maxValue = Math.max(...data);
    const scale = chartHeight / maxValue;
    
    // Font sizes based on screen size
    const labelFontSize = isMobile ? '10px' : '12px';
    const valueFontSize = isMobile ? '9px' : '12px';
    
    // Draw chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.beginPath();
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 1;
    
    const gridLines = isMobile ? 3 : 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = chartHeight - (i * chartHeight / gridLines);
      const leftPadding = isMobile ? 20 : 30;
      ctx.moveTo(leftPadding, y);
      ctx.lineTo(chartWidth, y);
      
      // Draw value labels
      ctx.fillStyle = '#a0a0a0';
      ctx.font = `${labelFontSize} Montserrat`;
      ctx.textAlign = 'right';
      ctx.fillText((maxValue * i / gridLines).toFixed(0), leftPadding - 5, y + 5);
    }
    ctx.stroke();
    
    // Draw bars
    data.forEach((value, index) => {
      const leftPadding = isMobile ? 25 : 40;
      const x = index * (barWidth + barSpacing) + leftPadding;
      const barHeight = value * scale;
      const y = chartHeight - barHeight;
      
      // Create gradient for bars
      const gradient = ctx.createLinearGradient(0, y, 0, chartHeight);
      gradient.addColorStop(0, '#8a0303');
      gradient.addColorStop(1, '#5a0202');
      
      // Draw bar
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Use simple rectangle for older browsers that don't support roundRect
      if (ctx.roundRect) {
        ctx.roundRect(x, y, barWidth, barHeight, 5);
      } else {
        ctx.rect(x, y, barWidth, barHeight);
      }
      ctx.fill();
      
      // Draw value on top of bar - only if there's enough space
      if (barHeight > 25) {
        ctx.fillStyle = '#e0e0e0';
        ctx.font = `${valueFontSize} Montserrat`;
        ctx.textAlign = 'center';
        ctx.fillText(`€${value}`, x + barWidth / 2, y - 5);
      }
      
      // Draw day label
      ctx.fillStyle = '#a0a0a0';
      ctx.font = `${labelFontSize} Montserrat`;
      ctx.textAlign = 'center';
      ctx.fillText(days[index], x + barWidth / 2, chartHeight + 15);
    });
  };
  
  // Add a debounce function to prevent excessive redraws on resize
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  
  // Draw chart initially
  drawSalesChart();
  
  // Use debounced version for resize events
  const debouncedDrawChart = debounce(drawSalesChart, 250);
  window.addEventListener('resize', debouncedDrawChart);
  });
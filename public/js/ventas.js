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
  
    // Form handling
    const ventaForm = document.getElementById('ventaForm');
    const precioInput = document.getElementById('precio');
    const envioInput = document.getElementById('envio');
    const inversionSelect = document.getElementById('inversion');
    const gananciaOutput = document.getElementById('ganancia');
    
    // Populate investment dropdown with sample data
    // In a real application, this would come from an API or database
    const inversionOptions = [
      { value: 500, label: '€500 - Inversión básica' },
      { value: 1000, label: '€1000 - Inversión estándar' },
      { value: 1500, label: '€1500 - Inversión premium' },
      { value: 2000, label: '€2000 - Inversión élite' },
      { value: 2500, label: '€2500 - Inversión suprema' }
    ];
    
    inversionOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      inversionSelect.appendChild(optionElement);
    });
    
    // Set default date to today
    const fechaInput = document.getElementById('fecha');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    fechaInput.value = formattedDate;
    
    // Calculate profit in real-time
    const calculateProfit = () => {
      const precio = parseFloat(precioInput.value) || 0;
      const envio = parseFloat(envioInput.value) || 0;
      const inversion = parseFloat(inversionSelect.value) || 0;
      
      const ganancia = precio - (envio + inversion);
      
      // Format with 2 decimal places and add euro symbol
      gananciaOutput.textContent = `€${ganancia.toFixed(2)}`;
      
      // Add color based on profit value
      if (ganancia > 0) {
        gananciaOutput.classList.remove('negative');
        gananciaOutput.classList.add('positive');
      } else {
        gananciaOutput.classList.remove('positive');
        gananciaOutput.classList.add('negative');
      }
    };
    
    // Add event listeners to inputs that affect profit calculation
    precioInput.addEventListener('input', calculateProfit);
    envioInput.addEventListener('input', calculateProfit);
    inversionSelect.addEventListener('change', calculateProfit);
    
    // Form validation
    const validateForm = () => {
      let isValid = true;
      const requiredFields = [
        { id: 'cliente', error: 'cliente-error', message: 'Por favor, ingrese el nombre del cliente.' },
        { id: 'direccion', error: 'direccion-error', message: 'Por favor, ingrese la dirección de envío.' },
        { id: 'producto', error: 'producto-error', message: 'Por favor, ingrese el nombre del producto.' },
        { id: 'precio', error: 'precio-error', message: 'Por favor, ingrese un precio válido.' },
        { id: 'envio', error: 'envio-error', message: 'Por favor, ingrese un costo de envío válido.' },
        { id: 'inversion', error: 'inversion-error', message: 'Por favor, seleccione un monto de inversión.' },
        { id: 'fecha', error: 'fecha-error', message: 'Por favor, seleccione una fecha.' }
      ];
      
      // Reset all error messages
      requiredFields.forEach(field => {
        document.getElementById(field.error).textContent = '';
        document.getElementById(field.id).classList.remove('error');
      });
      
      // Check each required field
      requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(field.error);
        
        if (!input.value.trim()) {
          errorElement.textContent = field.message;
          input.classList.add('error');
          isValid = false;
        }
      });
      
      // Additional validation for numeric fields
      if (precioInput.value && parseFloat(precioInput.value) <= 0) {
        document.getElementById('precio-error').textContent = 'El precio debe ser mayor que cero.';
        precioInput.classList.add('error');
        isValid = false;
      }
      
      if (envioInput.value && parseFloat(envioInput.value) < 0) {
        document.getElementById('envio-error').textContent = 'El costo de envío no puede ser negativo.';
        envioInput.classList.add('error');
        isValid = false;
      }
      
      return isValid;
    };
    
    // Form submission
    ventaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        // In a real application, this would send data to a server
        // For this example, we'll just show a success message
        
        // Create a data object with form values
        const formData = {
          cliente: document.getElementById('cliente').value,
          direccion: document.getElementById('direccion').value,
          producto: document.getElementById('producto').value,
          precio: parseFloat(document.getElementById('precio').value),
          envio: parseFloat(document.getElementById('envio').value),
          inversion: parseFloat(document.getElementById('inversion').value),
          fecha: document.getElementById('fecha').value,
          ganancia: parseFloat(gananciaOutput.textContent.replace('€', ''))
        };
        
        console.log('Form submitted with data:', formData);
        
        // Show success message (in a real app, this would be a proper notification)
        alert('Venta registrada con éxito!');
        
        // Reset form
        ventaForm.reset();
        
        // Reset profit display
        gananciaOutput.textContent = '€0.00';
        gananciaOutput.classList.remove('positive', 'negative');
        
        // Set date back to today
        fechaInput.value = formattedDate;
      }
    });
    
    // Reset button handler
    ventaForm.addEventListener('reset', () => {
      // Reset all error messages
      document.querySelectorAll('.form-error').forEach(error => {
        error.textContent = '';
      });
      
      // Remove error classes
      document.querySelectorAll('input, textarea, select').forEach(input => {
        input.classList.remove('error');
      });
      
      // Reset profit display
      gananciaOutput.textContent = '€0.00';
      gananciaOutput.classList.remove('positive', 'negative');
      
      // Set date back to today
      setTimeout(() => {
        fechaInput.value = formattedDate;
      }, 0);
    });
  });
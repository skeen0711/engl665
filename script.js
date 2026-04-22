// Function to parse CSV data
function parseCSV(text) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const result = [];
    
    for (let line of lines) {
        // Handle CSV with quotes and commas
        const row = [];
        let cell = '';
        let insideQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                row.push(cell.trim());
                cell = '';
            } else {
                cell += char;
            }
        }
        row.push(cell.trim());
        result.push(row);
    }
    
    return result;
}

// Function to load and display the table
function loadTable() {
    try {
        // tableData is loaded from table-data.js
        if (typeof tableData === 'undefined') {
            throw new Error('Table data not found');
        }
        
        const rows = parseCSV(tableData);
        
        if (rows.length === 0) {
            console.error('No data in table');
            return;
        }
        
        // Create table header
        const thead = document.getElementById('table-header');
        const headerRow = document.createElement('tr');
        
        rows[0].forEach(cell => {
            const th = document.createElement('th');
            th.textContent = cell;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        
        // Create table body
        const tbody = document.getElementById('table-body');
        
        for (let i = 1; i < rows.length; i++) {
            const tr = document.createElement('tr');
            
            rows[i].forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            
            tbody.appendChild(tr);
        }
    } catch (error) {
        console.error('Error loading table:', error);
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: red; padding: 20px;">Error loading table data. Please ensure table-data.js exists in the links folder.</td></tr>';
    }
}

// Load table when page loads
document.addEventListener('DOMContentLoaded', loadTable);
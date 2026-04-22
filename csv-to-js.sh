#!/bin/bash

# Convert table.csv to table-data.js
# Usage: ./csv-to-js.sh
# Make it executable: chmod +x csv-to-js.sh

if [ ! -f "links/table.csv" ]; then
    echo "Error: links/table.csv not found"
    exit 1
fi

echo "// Table data - auto-generated from table.csv" > links/table-data.js
echo "const tableData = \`" >> links/table-data.js
cat links/table.csv >> links/table-data.js
echo "\`;" >> links/table-data.js

echo "Conversion complete! table-data.js has been updated."
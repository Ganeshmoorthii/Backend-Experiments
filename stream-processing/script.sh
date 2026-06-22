#Shebang : Execute this script using the Bash shell.
#!/bin/bash

# ==========================================
# Large Text File Generator
# ==========================================
# This script creates a text file of approximately
# 200 MB by repeatedly writing the same line.
#
# Run:
# chmod +x generate_file.sh
# ./generate_file.sh
# ==========================================

# Output file name
OUTPUT_FILE="large_file.txt"

# Target file size in MB
FILE_SIZE_MB=200

# Convert MB to bytes
TARGET_BYTES=$((FILE_SIZE_MB * 1024 * 1024))

# Text that will be repeated
LINE_TEXT="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"

# Find length of the text
LINE_BYTES=${#LINE_TEXT}

# Calculate how many times the line must be written
# +1 because each echo adds a newline character
ITERATIONS=$((TARGET_BYTES / (LINE_BYTES + 1)))

# Display startup information
echo "=========================================="
echo "Large File Generator"
echo "=========================================="
echo "Output File      : $OUTPUT_FILE"
echo "Target Size      : ${FILE_SIZE_MB} MB"
echo "Line Length      : ${LINE_BYTES} bytes"
echo "Iterations Needed: ${ITERATIONS}"
echo "=========================================="
echo ""

# Create or clear the output file
> "$OUTPUT_FILE"

echo "Generating file..."
echo ""

# Generate content
for ((i=1; i<=ITERATIONS; i++))
do
    echo "$LINE_TEXT" >> "$OUTPUT_FILE"

    # Show progress every 100000 iterations
    if (( i % 100000 == 0 ))
    then

        # Linux
        if stat -c%s "$OUTPUT_FILE" >/dev/null 2>&1
        then
            CURRENT_SIZE=$(stat -c%s "$OUTPUT_FILE")

        # MacOS
        else
            CURRENT_SIZE=$(stat -f%z "$OUTPUT_FILE")
        fi

        CURRENT_SIZE_MB=$((CURRENT_SIZE / 1024 / 1024))

        echo "Progress:"
        echo "  Iterations : $i"
        echo "  File Size  : ${CURRENT_SIZE_MB} MB"
        echo ""
    fi
done

# Get final file size

if stat -c%s "$OUTPUT_FILE" >/dev/null 2>&1
then
    FINAL_SIZE=$(stat -c%s "$OUTPUT_FILE")
else
    FINAL_SIZE=$(stat -f%z "$OUTPUT_FILE")
fi

FINAL_SIZE_MB=$((FINAL_SIZE / 1024 / 1024))

echo ""
echo "=========================================="
echo "Generation Complete"
echo "=========================================="
echo "File Name : $OUTPUT_FILE"
echo "Size      : ${FINAL_SIZE_MB} MB"
echo "Bytes     : $FINAL_SIZE"
echo "=========================================="
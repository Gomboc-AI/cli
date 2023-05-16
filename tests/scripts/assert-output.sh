#!/bin/bash

# $1 = output of run
# $2 = output to test against

# removes all changing properties for the test
./tests/scripts/wipe-json-property-value.sh "timestamp" "$1"
./tests/scripts/wipe-json-property-value.sh "scanId" "$1"
./tests/scripts/wipe-json-property-value.sh "portalUrl" "$1"
./tests/scripts/wipe-json-property-value.sh "id" "$1"
./tests/scripts/wipe-json-property-value.sh "filePath" "$1"

if cmp --silent -- "$1" "$2"; then
    echo "Output is the expected"
else
    echo "Outputs differ"
    echo "If it was expected, update expected output to:"
    echo "-------------------------------------------"
    cat "$1"
    echo "-------------------------------------------"
    exit 1
fi
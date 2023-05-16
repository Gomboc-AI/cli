#!/bin/bash

# $1 = execution code
# $2 = expected code

if [ $1 -eq $2 ]; then
    echo "Codes match ($1)"
else
    echo "Wrong code: Expected $2, but got $1"
    exit 1
fi
#!/bin/bash

# $1 = property name
# $2 = file path

# replaces whatever value is in the property with an empty string

# https://stackoverflow.com/questions/43171648/sed-gives-sed-cant-read-no-such-file-or-directory
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i "" -e "s/\"$1\": \".*\"/\"$1\": \"\"/g" $2
else
  sed -i -e "s/\"$1\": \".*\"/\"$1\": \"\"/g" $2
fi


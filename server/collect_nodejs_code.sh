#!/bin/bash

# This script collects all code files from a Node.js project
# Put this in the root folder of your project
# Run the command chmod +x collect_nodejs_code.sh
# Then run ./collect_nodejs_code.sh

# Use the current directory as the project directory
project_dir=$(pwd)

# Use a fixed name for the output file in the current directory
output_file="${project_dir}/nodejs_code_context.txt"

# Check if the output file exists and remove it if it does
if [ -f "$output_file" ]; then
  rm "$output_file"
fi

# List of directories to look for
directories=("src" "lib" "controllers" "models" "routes" "middlewares" "config" "utils")

# List of file types to ignore
ignore_files=("*.ico" "*.png" "*.jpg" "*.jpeg" "*.gif" "*.svg" "*.mp4" "*.mp3" "*.wav" "*.ogg" "*.pdf" "*.zip" "*.tar" "*.gz" "*.exe" "*.dll")

# Recursive function to read files and append their content
read_files() {
  for entry in "$1"/*
  do
    if [ -d "$entry" ]; then
      # If entry is a directory, call this function recursively
      read_files "$entry"
    elif [ -f "$entry" ]; then
      # Check if the file type should be ignored
      should_ignore=false
      for ignore_pattern in "${ignore_files[@]}"; do
        if [[ "$entry" == $ignore_pattern ]]; then
          should_ignore=true
          break
        fi
      done

      # If the file type should not be ignored, append its relative path and content to the output file
      if ! $should_ignore; then
        relative_path=${entry#"$project_dir/"}
        echo "// File: $relative_path" >> "$output_file"
        cat "$entry" >> "$output_file"
        echo "" >> "$output_file"
      fi
    fi
  done
}

# Call the recursive function for each specified directory in the project directory
for dir in "${directories[@]}"; do
  if [ -d "${project_dir}/${dir}" ]; then
    read_files "${project_dir}/${dir}"
  fi
done
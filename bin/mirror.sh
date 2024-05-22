#!/bin/bash

# download p5js scripts for a user account 
#   and create markdown listing files

cd ${0%/*}

cd ..

# run script to generate download commands
#   saved to directory downloads/gen

# bin/build.sh --user yourUserName

# limit to the n most recent projects
# bin/build.sh --user yourUserName --limit 1

bin/build.sh "$@"

# run script to download zip files generated by build.sh

sh downloads/gen/download.sh

# run script to unzip downloaded zip files

sh downloads/gen/unzip.sh

# run script to generate p5projects-index.md

# bin/p5projects-index.sh --user yourUserName
bin/p5projects-index.sh "$@"

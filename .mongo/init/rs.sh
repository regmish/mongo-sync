#!/bin/bash
echo "**********************************************"
echo "Running Mongo startup script ..."
sleep 5
mongo <<EOF
rs.initiate();
EOF
#!/bin/bash

echo "**********************************************"
echo "Waiting for startup.."
sleep 10
echo "done"

mongo <<EOF
rs.initiate();
rs.status();
EOF
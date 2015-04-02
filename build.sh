#!/bin/bash

echo '# Generate packages.js'
go run gostdlib.go

echo '# Install libs'
bower install

echo '# Copy lib'
cp -v ./bower_components/jquery/dist/jquery.min.js data
cp -v ./bower_components/jquery-ui/jquery-ui.min.js data
cp -v ./bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css data

echo '# Pack xpi'
cfx xpi

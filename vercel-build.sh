#!/bin/bash
rm -rf node_modules
npm ci --legacy-peer-deps
npm run build

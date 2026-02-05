#!/usr/bin/env bash
set -e

# Instala hooks de husky y crea el pre-commit para lint-staged
npm run prepare
npx husky add .husky/pre-commit "npx --no -- lint-staged"
echo "Husky pre-commit hook creado: .husky/pre-commit"

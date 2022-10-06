install:
	npm ci
lint:
	npx eslint .
build:
	npx webpack
serve:
	npx webpack serve

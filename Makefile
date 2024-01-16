install:
	npm install

build:
	npm run build

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

clean:
	rm -rf node_modules
	rm -rf dist
	rm -rf coverage

.PHONY: install build publish lint test test-coverage clean

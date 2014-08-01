
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test: build
	mocha-phantomjs test/index.html

standalone:
	component build --standalone ripple-computed --name standalone
	-rm -r dist
	mkdir dist
	sed 's/this\[\"ripple-computed\"\]/this.ripple.computed/g' build/standalone.js > dist/ripple-computed.js
	rm build/standalone.js
	minify dist/ripple-computed.js dist/ripple-computed.min.js

.PHONY: clean test

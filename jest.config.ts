export default {
	collectCoverage: false,
	preset: 'ts-jest',
	testEnvironment: 'node',
	testRegex: '^((?!int|e2e).)*.spec.ts$',
	coverageDirectory: '../coverage',
	coverageProvider: 'v8',
	moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
	rootDir: 'src'
};
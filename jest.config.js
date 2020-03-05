// module.exports = {
//   coverageDirectory: "./test/coverage/",
//   collectCoverage: true,
//   roots: ["./test"],
//   testEnvironment: "node",
//   transform: {
//     "^.+\\.tsx?$": "ts-jest"
//   },
//   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
// };

module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
};

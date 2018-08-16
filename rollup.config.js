import uglify from "rollup-plugin-uglify";

export default {
  input: "./index.js",
  plugins: [uglify()],
  output: {
    file: "build/bundle.js",
    format: "es"
  }
};

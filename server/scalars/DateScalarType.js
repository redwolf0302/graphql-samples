const { GraphQLScalarType, Kind } = require("graphql");
const moment = require("moment");

const DateScalarType = new GraphQLScalarType({
  name: "Date",
  description: "Date type",
  serialize(value) {
    console.log("serialize", value);
    return moment(value, "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY HH:mm:ss");
  },
  parseLiteral(ast) {
    console.log("parseLiteral", ast);
    if (ast.kind !== Kind.STRING) {
      throw new Error("Date type must be STRING");
    }
    return ast.value;
  },
  parseValue(value) {
    console.log("parseValue", value);
    return moment(value, "MM/DD/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
  },
});

module.exports = DateScalarType;

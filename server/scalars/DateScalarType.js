const { GraphQLScalarType, Kind } = require("graphql");

const DateScalarType = new GraphQLScalarType({
  name: "Date",
  description: "Date type",
  serialize(value) {
    console.log(value);
    return value;
  },
  parseLiteral(ast) {
    console.log(ast);
  },
  parseValue(value) {
    console.log(value);
    return value;
  },
});

module.exports = DateScalarType;

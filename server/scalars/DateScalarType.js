const { GraphQLScalarType, Kind } = require("graphql");
const moment = require("moment");

const DateScalarType = new GraphQLScalarType({
  name: "Date",
  description: "Date type",
  serialize(value) {
    return moment(value, "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY HH:mm:ss");
  },
  parseLiteral(ast) {
    console.log(ast);
  },
  parseValue(value) {
    console.log(value);
    return moment(value, "MM/DD/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
  },
});

module.exports = DateScalarType;

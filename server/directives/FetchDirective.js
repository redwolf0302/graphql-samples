const { SchemaDirectiveVisitor } = require("apollo-server");
class FetchDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { from } = this.args;
    field.resolve = async function(source) {
      return source[from];
    };
  }
}
module.exports = FetchDirective;

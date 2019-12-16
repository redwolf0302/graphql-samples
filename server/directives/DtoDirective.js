const { SchemaDirectiveVisitor } = require("apollo-server");
class DtoDirective extends SchemaDirectiveVisitor {
  visitObject(object) {
    Object.values(object.getFields()).forEach(field => {
      let fieldName = field.name.replace(/([A-Z])/g, "_$1").toLowerCase();
      field.resolve = async function(source) {
        return source[fieldName];
      };
    });
  }
  visitFieldDefinition(field) {
    let fieldName = field.name.replace(/([A-Z])/g, "_$1").toLowerCase();
    field.resolve = async function(source) {
      return source[fieldName];
    };
  }
}
module.exports = DtoDirective;

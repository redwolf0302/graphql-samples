const { SchemaDirectiveVisitor } = require("apollo-server");
const fetch = require("node-fetch");
const Handlebars = require("handlebars");
const baseUrl = "http://localhost:8080";
class ApiDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { url } = this.args;
    const template = Handlebars.compile(url);
    field.resolve = async function(source) {
      let url = template(source);
      return fetch(baseUrl + url, {
        method: "GET",
      }).then(response => response.json());
    };
  }
}
module.exports = ApiDirective;

const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLString } = graphql;

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {},
});

module.exports = RootMutation;

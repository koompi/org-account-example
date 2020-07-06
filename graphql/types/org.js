const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const OrgType = new GraphQLObjectType({
  name: "Org",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    owner_id: { type: GraphQLString },
    members: { type: GraphQLList(GraphQLString) },
  },
});

module.exports = OrgType;

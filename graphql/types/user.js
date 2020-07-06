const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;
const axios = require("axios");
const OrgType = require("./org");
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    owned_orgs: { type: GraphQLList(GraphQLString) },
    joined_org: { type: GraphQLList(GraphQLString) },
    owned_orgs_rel: {
      type: GraphQLList(OrgType),
      resolve: async (root, args) => {
        let orgs = axios
          .get(`http://localhost:4001/orgs?owner_id=${root.id}`)
          .then((res) => {
            return res.data;
          });
        return orgs;
      },
    },
    joined_org_rel: {
      type: GraphQLList(OrgType),
      resolve: async (root, args) => {
        let orgs = axios
          .get(`http://localhost:4001/users/${root.id}/orgs `)
          .then((res) => {
            return res.data;
          });
        return orgs;
      },
    },
  },
});

module.exports = UserType;

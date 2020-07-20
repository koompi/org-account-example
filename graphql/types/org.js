const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;
const axios = require("axios");

const OrgType = new GraphQLObjectType({
	name: "Org",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		owner_id: { type: GraphQLString },
		members: { type: GraphQLList(GraphQLString) },
		members_info: {
			type: GraphQLList(UserType),
			resolve: (root, args) => {
				let users = axios
					.get(`http://localhost:4001/orgs/${root.id}/users`)
					.then((res) => {
						return res.data;
					});

				return users;
			},
		},
	}),
});

module.exports = OrgType;
const UserType = require("./user");

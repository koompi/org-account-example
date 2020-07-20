const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLString } = graphql;
const UserType = require("./types/user");
const OrgType = require("./types/org");

const axios = require("axios");

const RootQuery = new GraphQLObjectType({
	name: "Query",
	fields: {
		users: {
			type: GraphQLList(UserType),
			resolve: async (root, args) => {
				let data = axios.get("http://localhost:4001/users/").then((res) => {
					return res.data;
				});

				return data;
			},
		},
		user_by_id: {
			type: UserType,
			args: {
				id: { type: GraphQLString },
			},
			resolve: async (root, args) => {
				let user = axios
					.get(`http://localhost:4001/users/${args.id}`)
					.then((res) => {
						return res.data;
					});

				return user;
			},
		},
		user_by_name: {
			type: UserType,
			args: {
				userName: { type: GraphQLString },
			},
			resolve: async (root, args) => {
				let user = axios
					.get(`http://localhost:4001/users?userName=${args.userName}`)
					.then((res) => {
						return res.data[0];
					});

				return user;
			},
		},
		orgs: {
			type: GraphQLList(OrgType),
			resolve: async (root, args) => {
				let orgs = axios.get("http://localhost:4001/orgs").then((res) => {
					return res.data;
				});

				return orgs;
			},
		},
		org_by_id: {
			type: OrgType,
			args: {
				id: { type: GraphQLString },
			},
			resolve: async (root, args) => {
				let org = axios
					.get(`http://localhost:4001/orgs/${args.id}`)
					.then((res) => {
						return res.data;
					});
				return org;
			},
		},
		org_by_name: {
			type: OrgType,
			args: {
				name: { type: GraphQLString },
			},
			resolve: async (root, args) => {
				let org = axios
					.get(`http://localhost:4001/orgs?name=${args.name}`)
					.then((res) => {
						return res.data[0];
					});
				return org;
			},
		},
	},
});

module.exports = RootQuery;

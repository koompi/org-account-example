const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLString } = graphql;

const HelloType = new GraphQLObjectType({
	name: "Hello",
	fields: {
		greeting: { type: GraphQLString },
	},
});

const RootQuery = new GraphQLObjectType({
	name: "Query",
	fields: {
		hello: {
			type: HelloType,
			resolve: (root, args) => {
				return { greeting: "Hello" };
			},
		},
	},
});

const schema = new GraphQLSchema({
	query: RootQuery,
});

module.exports = schema;

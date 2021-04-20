import { loadFilesSync } from "@graphql-tools/load-files";
import { IResolvers } from "apollo-server";
import { ITypeDefinitions, makeExecutableSchema, mergeResolvers, mergeTypeDefs } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(
    `${__dirname}/**/*.{queries,mutations}.ts`
);

const typeDefs:ITypeDefinitions = mergeTypeDefs(loadedTypes);
const resolvers:IResolvers = mergeResolvers(loadedResolvers);
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
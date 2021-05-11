import { loadFilesSync } from "@graphql-tools/load-files";
import { IResolvers } from "apollo-server-express";
import { DocumentNode } from "graphql";
import { mergeResolvers, mergeTypeDefs } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs:DocumentNode | DocumentNode[] = mergeTypeDefs(loadedTypes);
export const resolvers:IResolvers = mergeResolvers(loadedResolvers);
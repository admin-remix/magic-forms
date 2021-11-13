import { MagicIntroSpectionData, MagicMatchedMutation } from "../../types";

export function matchedMutationFinder(
  mutationName: string,
  introData: MagicIntroSpectionData
): MagicMatchedMutation {
  const mainFields = introData.__schema.types.find(
    (i: { name: string }) => i.name.toLowerCase() === "Mutation".toLowerCase()
  );
  if (!mainFields) {
    throw new Error("Unable to find Mutation name on introspection call");
  }
  const matchedQuery = mainFields.fields.find(
    (i: { name: string }) => i.name.toLowerCase() === mutationName.toLowerCase()
  );
  if (!matchedQuery) {
    throw new Error(`Unable to find matched query: ${mutationName}`);
  }
  return matchedQuery;
}

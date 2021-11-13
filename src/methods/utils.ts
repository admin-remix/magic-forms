import {
  MagicIntroSpectionData,
  MagicMatchedInput,
  MagicMatchedMutation,
} from "../types";

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

export function matchedObjectInputFinder(
  inputName: string,
  introData: MagicIntroSpectionData
): MagicMatchedInput {
  const inputObject = introData.__schema.types.find(
    (i: { name: string }) => i.name.toLowerCase() === inputName.toLowerCase()
  );
  if (!inputObject) {
    throw new Error(`Unable to find ${inputName} name on introspection call`);
  }
  return inputObject;
}

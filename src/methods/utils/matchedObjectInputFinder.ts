import { MagicIntroSpectionData, MagicMatchedInput } from "../../types";

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

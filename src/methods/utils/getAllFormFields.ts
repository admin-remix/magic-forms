import {
  MagicIntrospectionArgs,
  MagicIntroSpectionData,
  MagicIntrospectionKind,
} from "../../types";
import { matchedMutationFinder } from "./matchedMutationFinder";
import { matchedObjectInputFinder } from "./matchedObjectInputFinder";

export function getAllFormFields(
  mutationName: string,
  introData: MagicIntroSpectionData
): MagicIntrospectionArgs[] {
  const matchedQuery = matchedMutationFinder(mutationName, introData);
  const args = matchedQuery.args;
  const allFields = args.reduce((acc: MagicIntrospectionArgs[], current) => {
    const isScalar = current.type.kind === MagicIntrospectionKind.SCALAR;
    if (isScalar) {
      acc.push(current);
    } else {
      const typeNeeded = current.type.ofType?.name;
      if (!typeNeeded) {
        throw new Error(
          `typeNeeded for ${current.type.name} did not have a known ofType`
        );
      }
      const matchedInput = matchedObjectInputFinder(typeNeeded, introData);
      acc.push(...matchedInput.inputFields);
    }
    return acc;
  }, []);
  return allFields;
}

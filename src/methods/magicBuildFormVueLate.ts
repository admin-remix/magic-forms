import {
  MagicBuildOptions,
  MagicIntrospectionArgs,
  MagicIntroSpectionData,
  MagicIntrospectionKind,
  MagicIntrospectionType,
} from "../types";
import { matchedMutationFinder, matchedObjectInputFinder } from "./utils";

export async function magicBuildFormVueLateStandAlone(
  mutationName: string,
  options: MagicBuildOptions,
  introData: MagicIntroSpectionData
) {
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
  /**
   *     {
      args: [
        {
          name: 'data',
          description: null,
          type: [Object],
          defaultValue: null
        }
      ]
    }

        {
      argType: {
        kind: 'NON_NULL',
        name: null,
        ofType: { kind: 'INPUT_OBJECT', name: 'NewAssetInput', ofType: null }
      }
    }

   */
  console.log({ allFields });
  console.log({ options });
  return `TODO`;
}

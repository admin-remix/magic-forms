import { MagicBuildOptions, MagicIntroSpectionData } from "../types";
import { getAllFormFields } from "./utils/getAllFormFields";

export async function magicBuildFormVueLateStandAlone(
  mutationName: string,
  options: MagicBuildOptions,
  introData: MagicIntroSpectionData
) {
  const allFields = getAllFormFields(mutationName, introData);
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

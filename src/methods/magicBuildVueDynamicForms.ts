import { MagicBuildOptions, MagicIntroSpectionData } from "../types";
import { getAllFormFields } from "./utils/getAllFormFields";
import { excludeBuilder } from "./utils/magicOptionsTools";

export async function magicBuildVueDynamicFormsStandAlone(
  mutationName: string,
  options: MagicBuildOptions,
  introData: MagicIntroSpectionData
) {
  const allFields = getAllFormFields(mutationName, introData);
  const fieldsWithExclusions =
    options.excludeFields && options.excludeFields.length
      ? excludeBuilder(options.excludeFields, allFields)
      : allFields;
  console.log({ fieldsWithExclusions });
  return `TODO`;
}

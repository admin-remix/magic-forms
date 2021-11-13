import { capitalCase } from "capital-case";
import {
  MagicBuildOptions,
  MagicIntroSpectionData,
  MagicIntrospectionKind,
} from "../types";
import { getAllFormFields } from "./utils/getAllFormFields";
import { excludeBuilder } from "./utils/magicOptionsTools";

export async function magicBuildFormVueLateStandAlone(
  mutationName: string,
  options: MagicBuildOptions,
  introData: MagicIntroSpectionData
) {
  const allFields = getAllFormFields(mutationName, introData);
  const fieldsWithExclusions =
    options.excludeFields && options.excludeFields.length
      ? excludeBuilder(options.excludeFields, allFields)
      : allFields;
  const form = fieldsWithExclusions.reduce((acc: any, current) => {
    const scalar = current.type.kind;
    switch (scalar) {
      case MagicIntrospectionKind.SCALAR:
        acc[current.name] = {
          component: current.type.name,
          label: capitalCase(current.name),
        };
        break;
      case MagicIntrospectionKind.NON_NULL:
        acc[current.name] = {
          component: "UNKNOWN",
          label: capitalCase(current.name),
          required: true,
        };
        break;
      default:
        throw new Error(`Unknown scalar type ${scalar}`);
    }
    return acc;
  }, {});
  console.log({ form });
  return `TODO`;
}

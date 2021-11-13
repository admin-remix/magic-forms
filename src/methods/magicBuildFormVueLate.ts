import { capitalCase, camelCase } from "change-case";
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
    const hasNameCorrection =
      options.displayNameCorrection && options.displayNameCorrection.length
        ? options.displayNameCorrection.find(
            (i) => i.fieldName.toLowerCase() === current.name.toLowerCase()
          )
        : null;
    const hasConfigOptions =
      options.configToField && options.configToField.length
        ? options.configToField.find(
            (i) => i.fieldName.toLowerCase() === current.name.toLowerCase()
          )
        : null;
    const shouldRemapField =
      options.remapField && options.remapField.length
        ? options.remapField.find(
            (i) => i.fieldName.toLowerCase() === current.name
          )
        : null;
    const scalar = current.type.kind;
    switch (scalar) {
      case MagicIntrospectionKind.SCALAR:
        if (!shouldRemapField) {
          acc[current.name] = {
            component: current.type.name,
            label: hasNameCorrection
              ? hasNameCorrection.correction
              : capitalCase(current.name),
            ...hasConfigOptions?.config,
          };
        } else {
          acc[camelCase(shouldRemapField.options.fieldName)] = {
            ...shouldRemapField.options.config,
          };
        }
        break;
      case MagicIntrospectionKind.NON_NULL:
        if (!shouldRemapField) {
          acc[current.name] = {
            component: current.type.ofType?.name ?? "UNKNOWN",
            label: hasNameCorrection
              ? hasNameCorrection.correction
              : capitalCase(current.name),
            required: true,
            ...hasConfigOptions?.config,
          };
        } else {
          acc[camelCase(shouldRemapField.options.fieldName)] = {
            ...shouldRemapField.options.config,
          };
        }
        break;
      default:
        throw new Error(`Unknown scalar type ${scalar}`);
    }
    return acc;
  }, {});
  console.log(form);
  return form;
}

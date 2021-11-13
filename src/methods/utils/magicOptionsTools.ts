import { MagicBuildOptions, MagicIntrospectionArgs } from "../../types";

export function excludeBuilder(
  excludeFields: MagicBuildOptions["excludeFields"],
  allFields: MagicIntrospectionArgs[]
): MagicIntrospectionArgs[] {
  if (!excludeFields?.length) {
    return allFields;
  }
  const fieldsWithExclusions = allFields.reduce(
    (acc: MagicIntrospectionArgs[], current) => {
      const find = excludeFields.find(
        (i) => i.toLowerCase() === current.name.toLowerCase()
      );
      if (!find) {
        acc.push(current);
      }
      return acc;
    },
    []
  );
  return fieldsWithExclusions;
}

import { Headers } from "graphql-request/dist/types.dom";

export enum MagicFormType {
  FORM_VUE_LATE = "FormVueLate",
  VUE_DYNAMIC_FORMS = "VueDynamicForms",
}
export interface MagicInitParams {
  formType: MagicFormType;
  graphqlEndpoint: string;
  graphqlHeaders?: Headers;
}

export interface MagicBuildOptionsDisplayNameCorrection {
  fieldName: string;
  correction: string;
}

interface MagicBuildOptionsConfigToFieldConfig {
  options?: string[];
  config?: { type: string };
  required?: boolean;
  important?: boolean;
}

export interface MagicBuildOptionsConfigToField {
  fieldName: string;
  config: MagicBuildOptionsConfigToFieldConfig;
}

interface MagicBuildOptionsRemapFieldConfig {
  component: string;
  label: string;
  config: MagicBuildOptionsConfigToFieldConfig;
}

export interface MagicBuildOptionsRemapField {
  fieldName: string;
  options: MagicBuildOptionsRemapFieldConfig;
}

export interface MagicBuildOptions {
  excludeFields?: string[];
  displayNameCorrection?: MagicBuildOptionsDisplayNameCorrection[];
  configToField?: MagicBuildOptionsConfigToField[];
  remapField?: MagicBuildOptionsRemapField[];
}

export type MagicIntroSpectionData = any;

export enum MagicIntrospectionKind {
  OBJECT = "OBJECT",
  NON_NULL = "NON_NULL",
  INPUT_OBJECT = "INPUT_OBJECT",
  SCALAR = "SCALAR",
}

export interface MagicIntrospectionType {
  kind: MagicIntrospectionKind;
  name: string;
  ofType: MagicIntrospectionType | null;
}

export interface MagicIntrospectionArgs {
  name: string;
  description: string | null;
  type: MagicIntrospectionType;
  defaultValue: string | null;
}

export interface MagicMatchedInput {
  kind: MagicIntrospectionKind;
  name: string;
  description: string;
  fields: null;
  inputFields: MagicIntrospectionArgs[];
}

export interface MagicMatchedMutation {
  name: string;
  description: string | null;
  args: MagicIntrospectionArgs[];
  type: MagicIntrospectionType;
  isDeprecated: boolean;
  deprecationReason: string | null;
}

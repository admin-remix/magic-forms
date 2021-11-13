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
}

export interface MagicBuildOptionsConfigToField {
  fieldName: string;
  config: MagicBuildOptionsConfigToFieldConfig;
}

interface MagicBuildOptionsRemapFieldConfig {
  component: string;
  label: string;
}

export interface MagicBuildOptionsRemapField {
  fieldName: string;
  options: {
    fieldName: string;
    config: MagicBuildOptionsRemapFieldConfig &
      MagicBuildOptionsConfigToFieldConfig;
  };
}

export interface MagicBuildOptions {
  excludeFields?: string[];
  displayNameCorrection?: MagicBuildOptionsDisplayNameCorrection[];
  configToField?: MagicBuildOptionsConfigToField[];
  remapField?: MagicBuildOptionsRemapField[];
  // TODO: this should NOT be optional
  schemaMapping?: any; // Need to build out the schema mapping
  /**
   * String: FormText | 'FormText',
   * This could be a string or the entire component...
   * need to build out an enum for this input
   */
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

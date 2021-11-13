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

export interface MagicBuildOptions {
  includeFields?: string[];
  excludeFields?: string[];
  // TODO: This needs to be flushed out
  includeLogicToField?: string[];
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

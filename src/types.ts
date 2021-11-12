import { Headers } from "graphql-request/dist/types.dom";

export enum MagicFormType {
  FORM_VUE_LATE = "FormVueLate",
  VUE_DYNAMIC_FORMS = "VueDynamicForms",
}
export interface MagicInitParams {
  formType: MagicFormType;
  graphqlEndpoint: string;
  graphqlHeaders: Headers;
}

export interface MagicBuildOptions {}

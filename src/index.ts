import { GraphQLClient, gql } from "graphql-request";
import { MagicBuildOptions, MagicFormType, MagicInitParams } from "./types";

export class MagicForm {
  private formType: MagicFormType;
  private graphqlEndpoint: string;
  private introspectionData: null | any;
  private client: GraphQLClient;

  constructor(init: MagicInitParams) {
    this.formType = init.formType;
    this.graphqlEndpoint = init.graphqlEndpoint;
    this.client = new GraphQLClient(this.graphqlEndpoint, {
      headers: init.graphqlHeaders,
    });
  }
  /**
   *  TODO:
   *    Need to write the into query
   */
  private introQuery = gql``;

  private async getIntrospection() {
    if (this.introspectionData) {
      return this.introspectionData;
    }
    const data = await this.client.request(this.introQuery);
    if (data) {
      /**
       * TODO:
       *  Need to find out the shape of the data and break up logic
       */
      console.log(data);
      this.introspectionData = data;
      return this.introspectionData;
    }
  }

  private async magicBuildFormVueLate(
    inputTypeName: string,
    options: MagicBuildOptions,
    introData: any
  ) {
    console.log({ inputTypeName, options, introData });
    /**
     * TODO:
     *  Need to determine FormVueLate custom logic
     *  Each method will live in a logic folder and be exported
     *  This will allow a caller with intro data to inject it in
     */
    return `TODO`;
  }

  private async magicBuildVueDynamicForms(
    inputTypeName: string,
    options: MagicBuildOptions,
    introData: any
  ) {
    console.log({ inputTypeName, options, introData });
    /**
     * TODO:
     *  Need to determine Vue Dynamic Forms custom logic
     *  Each method will live in a logic folder and be exported
     *  This will allow a caller with intro data to inject it in
     */
    return `TODO`;
  }

  async magicBuild(inputTypeName: string, options: MagicBuildOptions) {
    const introData = await this.getIntrospection();
    switch (this.formType) {
      case MagicFormType.FORM_VUE_LATE:
        return await this.magicBuildFormVueLate(
          inputTypeName,
          options,
          introData
        );
      case MagicFormType.VUE_DYNAMIC_FORMS:
        return await this.magicBuildVueDynamicForms(
          inputTypeName,
          options,
          introData
        );
      default:
        throw new Error(`${this.formType} was not a valid MagicFormType`);
    }
  }
}

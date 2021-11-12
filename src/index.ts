import { GraphQLClient, gql } from "graphql-request";
import { magicBuildFormVueLateStandAlone } from "./methods/magicBuildFormVueLate";
import { magicBuildVueDynamicFormsStandAlone } from "./methods/magicBuildVueDynamicForms";
import {
  MagicBuildOptions,
  MagicFormType,
  MagicInitParams,
  MagicIntroSpectionData,
} from "./types";

export class MagicForm {
  private formType: MagicFormType;
  private graphqlEndpoint: string;
  private introspectionData: null | MagicIntroSpectionData;
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
  private introQuery = gql`
    query IntrospectionQuery {
      __schema {
        queryType {
          name
        }
        mutationType {
          name
        }
        subscriptionType {
          name
        }
        types {
          ...FullType
        }
        directives {
          name
          description
          locations
          args {
            ...InputValue
          }
        }
      }
    }
    fragment FullType on __Type {
      kind
      name
      description
      fields(includeDeprecated: true) {
        name
        description
        args {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }
    fragment InputValue on __InputValue {
      name
      description
      type {
        ...TypeRef
      }
      defaultValue
    }
    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  private async getIntrospection() {
    if (this.introspectionData) {
      return this.introspectionData;
    }
    const data = await this.client.request(this.introQuery);
    if (data) {
      this.introspectionData = data;
      return this.introspectionData;
    }
  }

  private async magicBuildFormVueLate(
    inputTypeName: string,
    options: MagicBuildOptions,
    introData: MagicIntroSpectionData
  ) {
    return await magicBuildFormVueLateStandAlone(
      inputTypeName,
      options,
      introData
    );
  }

  private async magicBuildVueDynamicForms(
    inputTypeName: string,
    options: MagicBuildOptions,
    introData: MagicIntroSpectionData
  ) {
    return await magicBuildVueDynamicFormsStandAlone(
      inputTypeName,
      options,
      introData
    );
  }

  /**
   * @description
   * @param inputTypeName
   * @param options
   *  options.includeFields
   *    By default leaving include fields empty will return all fields
   *  options.excludeFields
   *    By default leaving exclude fields empty will exclude no fields
   * @returns
   */
  async magicBuild(inputTypeName: string, options: MagicBuildOptions = {}) {
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

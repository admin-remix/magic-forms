import { MagicForm } from "../src";
import { MagicFormType } from "../src/types";

describe("Magic Forms Base Test", () => {
  it("class will construct with form vue late type", () => {
    const magic = new MagicForm({
      formType: MagicFormType.FORM_VUE_LATE,
      graphqlEndpoint: `https://graphqlpokemon.favware.tech/`,
    });
    expect(magic).toBeTruthy();
  });
  it("class will construct with form vue dynamic type", () => {
    const magic = new MagicForm({
      formType: MagicFormType.VUE_DYNAMIC_FORMS,
      graphqlEndpoint: `https://graphqlpokemon.favware.tech/`,
    });
    expect(magic).toBeTruthy();
  });
});

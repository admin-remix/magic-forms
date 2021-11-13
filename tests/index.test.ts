import { MagicForm } from "../src";
import { MagicFormType } from "../src/types";

// TODO: Record and make this general
const graphqlEndpoint = "https://back-end-6n643qmf2a-uc.a.run.app";

describe("Magic Forms Base Test", () => {
  it("class will construct with form vue late type", () => {
    const magic = new MagicForm({
      formType: MagicFormType.FORM_VUE_LATE,
      graphqlEndpoint,
    });
    expect(magic).toBeTruthy();
  });
  it("class will construct with form vue dynamic type", () => {
    const magic = new MagicForm({
      formType: MagicFormType.VUE_DYNAMIC_FORMS,
      graphqlEndpoint,
    });
    expect(magic).toBeTruthy();
  });
  it("returns build data for vue late form with no options", async () => {
    const magic = new MagicForm({
      formType: MagicFormType.FORM_VUE_LATE,
      graphqlEndpoint,
    });
    const data = await magic.magicBuild("createAsset");
    expect(data).toBeTruthy();
  });
  it("return build data for vue late form with options", async () => {
    const magic = new MagicForm({
      formType: MagicFormType.FORM_VUE_LATE,
      graphqlEndpoint,
    });
    const data = await magic.magicBuild("createAsset", {
      configToField: [
        {
          fieldName: "notes",
          config: {
            test: "one",
          },
        },
      ],
    });
    expect(data).toBeTruthy();
  });
});

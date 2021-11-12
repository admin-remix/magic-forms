import { MagicForm } from "../src";
import { MagicFormType } from "../src/types";
import { setupPolly } from "setup-polly-jest";

const graphqlEndpoint = "https://back-end-6n643qmf2a-uc.a.run.app";

describe("Magic Forms Base Test", () => {
  let context = setupPolly();
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
  it("returns build data for vue late form", async () => {
    context.polly.configure({ recordIfMissing: true });
    const magic = new MagicForm({
      formType: MagicFormType.FORM_VUE_LATE,
      graphqlEndpoint,
    });
    const data = await magic.magicBuild("NewAssetModelInput");
    expect(data).toBeTruthy();
  });
});

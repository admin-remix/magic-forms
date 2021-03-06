# Magic Forms

# This project is currently a WIP

## Description

The goal of the Magic Forms will be to generate form schema with the help of GraphQL introspection. This is a generalization & V2 of a tool that [AdminRemix](https://adminremix.com) built internal to speed up software development of AssetRemix. V1 of this concept was a britle internal tool that had very limited power and was hard to expand with edge cases that broke the system. V2 of the sytem will leverage current popular form builder shcemas and take insperation from [Frontier Forms](https://github.com/frontier-forms/frontier-forms). We hope that this tool can support many other teams in the future.

## Why?

[FormVueLate](https://formvuelate.js.org/) & [Vue Dynamic Forms](https://vue-dynamic-forms.alvarosaburido.dev/) have mastered form building inside Vue. However one thing to note is that building out your form schema can still be a very manual process. This tool aims to speed up form development for front-end teams that are using Vue, GraphQL, and FormVueLate or Vue Dynamic Forms by leveraging GraphQL introspection to build form schema.

## Init Class

Magic Forms export multiple types and methods but the fastest way to get started is import the base class. See below.

```js
import { MagicForm, MagicFormType } from '@admin-remix/magic-form';

export const magic = new MagicForm({
  formType: MagicFormType.FORM_VUE_LATE // or any other enum from MagicFormType
  graphqlEndpoint: 'https://graphqlserver.com'
})
```

We recommend that you initialize Magic Forms and import where needed over a new class in every file. By doing this you can take advantage of Introspection caching.

## Using

TODO: How to use the magicBuild method

## Stand alone

TODO: Access to exported methods and inject intro data

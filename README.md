# Offr Shopify Example Endpoint

Use this template to create an endpoint to calculate pricing for your shoppers
(you can use Deno Deploy to host it for free).

## Deno

This example is written for Deno. If you aren't familiar, Deno is essentially
the same as NodeJS for JavaScript / TypeScript,
[but better](https://deno.com/learn/nodes-complexity-problem). You can get
started with Deno in VS Code in seconds.
[Here is their tutorial](https://github.com/denoland/vscode_deno).

## Generate Types

To avoid the labor of recreating Shopify's GraphQL schema within TypeScript, we
can use the code generator. The generated TypeScript file can be added to the
repo. For example: we already include `admin.2024-07.graphql.ts`

```shell
deno run --allow-env --allow-sys --allow-read --allow-write ./src/shopify/_codegen.ts
```

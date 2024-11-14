# Offr Shopify Example Endpoint

Use this template to create an endpoint to calculate pricing for your shoppers.

## Hosting

Your HTTP endpoint can be setup however you like (any OS, any language, etc).
Since you already need JavaScript for your shopper's browser experience, we'll
stick with that language in this example.

## Deno

If you aren't familiar,
[Deno is an improvement on NodeJS](https://deno.com/learn/nodes-complexity-problem)
for JavaScript / TypeScript.
[Deno Deploy offers hosting which is easy, fast, and free](https://deno.com/deploy).
You can get started with Deno in VS Code in seconds.
[Here is their tutorial](https://github.com/denoland/vscode_deno). To create a
Deno Deploy server:

1. Fork this repo
2. [Connect](https://docs.deno.com/deploy/manual/ci_github/) your Deno Deploy
   account to your forked git repo
3. 🎉 Push to deploy!

## Generate Types

To avoid the labor of recreating Shopify's GraphQL schema within TypeScript, we
can use the code generator. The generated TypeScript file can be added to the
repo. For example: we already include `admin.2024-07.graphql.ts`

```shell
deno run --allow-env --allow-sys --allow-read --allow-write ./src/shopify/_codegen.ts
```

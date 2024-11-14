# Offr Shopify Example Endpoint

Use this template to create an endpoint to calculate pricing for your shoppers.
There are only a handful of files in the `/src` folder:

1. `index.ts` the entry point which responds to HTTP requests
2. `schema.ts` ensures data into/out-of our endpoint conforms to expectations.
3. `example.ts` provides the actual pricing calculations
4. `/shopify` optionally used to generate types (described below)

## Hosting

Your HTTP endpoint can be setup however you like (any OS, any language, etc).
However, since you already need JavaScript for your shopper's browser
experience, we'll stick with that language and build our example for Deno
Deploy.

### Hosting with Deno Deploy

If you aren't familiar,
[Deno is an improvement on NodeJS](https://deno.com/learn/nodes-complexity-problem)
for JavaScript / TypeScript.
[Deno Deploy offers hosting which is easy, fast, and free](https://deno.com/deploy).
You can get started with
[Deno in VS Code](https://github.com/denoland/vscode_deno) in seconds. To create
your endpoint on Deno Deploy:

1. Fork this repo
2. [Connect](https://docs.deno.com/deploy/manual/ci_github/) your Deno Deploy
   account to your forked git repo
3. 🎉 Push to deploy!

## Generate Types

Although you probably won't need to do this, we provide a code generator to
avoid the labor of recreating Shopify's GraphQL schema within TypeScrip. The
generated TypeScript file can be added to the repo. For example: we already
include `admin.2024-07.graphql.ts`

```shell
deno run --allow-env --allow-sys --allow-read --allow-write ./src/shopify/_codegen.ts
```

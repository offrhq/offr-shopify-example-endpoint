Deno.serve({ path: "f7b9506c-a635-4aa2-81b2-939d4b7debd7" }, async (req) => {
  try {
    const formData = await req.formData();
    console.log(req, formData);
  } catch (error) {
    console.warn(error);
  }

  return new Response(JSON.stringify({ example: "hello world" }), {
    headers: { "Content-Type": "application/json" },
  });
});

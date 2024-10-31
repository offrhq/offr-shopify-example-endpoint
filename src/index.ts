Deno.serve(async (req) => {
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

Deno.serve(async (req) => {
  const formData = await req.formData();
  console.log(req, formData);

  return new Response(JSON.stringify("hello world"), {
    headers: { "Content-Type": "application/json" },
  });
});

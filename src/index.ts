Deno.serve(async (req) => {
  try {
    return await successHandler(req);
  } catch (error) {
    return errorHandler(error as Json);
  }
});

/** returns the success json response */
const successHandler = async (req: Request) => {
  /**
   * the shopper input
   * https://developer.mozilla.org/en-US/docs/Web/API/FormData
   */
  const formData = await req.formData();
  console.log(req, formData);

  return jsonResponse({ success: true, data: { example: "hello world" } });
};

/** returns a standardized error json response */
const errorHandler = (error: Json) => {
  console.warn(error);

  return jsonResponse({
    success: false,
    publicMessage: "Oops. We couldn't process your request.",
    privateErrors: (error as Json) ?? "",
  });
};

type Json = string | number | boolean | { [x: string]: Json } | Array<Json>;

/** simple response JSON wrapper */
const jsonResponse = (json: Json) => {
  return new Response(JSON.stringify(json), {
    headers: { "Content-Type": "application/json" },
  });
};

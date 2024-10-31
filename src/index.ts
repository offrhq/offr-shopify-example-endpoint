import { exampleSuccess } from "./example.ts";

Deno.serve(async (req) => {
  try {
    return await successHandler(req);
  } catch (error) {
    return errorHandler(error);
  }
});

/** returns the success json response */
const successHandler = async (req: Request) => {
  /**
   * the shopper input
   * https://developer.mozilla.org/en-US/docs/Web/API/FormData
   */
  const formData = await req.formData();

  // log for development; probably remove for production
  console.log(req, formData);

  // example response below
  return jsonResponse(exampleSuccess);
};

/** returns a standardized error json response */
// deno-lint-ignore no-explicit-any
const errorHandler = (error: any) => {
  console.warn(error);

  return jsonResponse({
    success: false,
    publicMessage: "Oops. We couldn't process your request.",
    privateErrors: error ?? "",
  });
};

/** simple response JSON wrapper */
// deno-lint-ignore no-explicit-any
const jsonResponse = (json: any) => {
  return new Response(JSON.stringify(json), {
    headers: { "Content-Type": "application/json" },
  });
};

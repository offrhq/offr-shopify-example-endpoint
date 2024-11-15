import { getExample } from "./example.ts";
import { measurementsSchema, type ErrorBodySchema } from "./schema.ts";

/**
 * This is the HTTP entry point.
 * https://docs.deno.com/api/deno/~/Deno.serve
 */
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

  // process the calculation
  const measurements = measurementsSchema.parse({
    lengthInches: formData.get("lengthInches"),
    widthInches: formData.get("widthInches"),
    heightInches: formData.get("heightInches"),
  });
  const res = getExample(measurements);

  // log for development; probably remove these for production
  console.dir(req, { depth: Infinity });
  console.dir(formData, { depth: Infinity });
  console.dir(res, { depth: Infinity });

  return jsonResponse(res);
};

/** returns a standardized error json response */
// deno-lint-ignore no-explicit-any
const errorHandler = (error: any) => {
  console.warn(error);

  return jsonResponse({
    success: false,
    publicMessage: "Oops. We couldn't process your request.",
    privateError: error ?? "",
  } satisfies ErrorBodySchema);
};

/** simple response JSON wrapper */
// deno-lint-ignore no-explicit-any
const jsonResponse = (json: any) => {
  return new Response(JSON.stringify(json), {
    headers: { "Content-Type": "application/json" },
  });
};

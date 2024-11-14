import { z } from "npm:zod@3.23.8";

import {
  SellingPlanGroupInputSchema,
  SellingPlanGroupResourceInputSchema,
  SellingPlanInputSchema,
} from "./shopify/admin.2024-07.graphql.ts";

/**
 * We use [Zod](https://zod.dev/) to enforce a schema of the data we expect.
 * In our example, we are calculating pricing of an "example fish tank".
 *
 * We could choose impose additional restrictions.
 * For example, we could:
 * * restrict numbers to increments of .125
 * * put a max length for each side
 * * put a total volume limitation
 * * etc.
 */
export const measurementsSchema = z.object({
  lengthInches: z.coerce.number().positive(),
  widthInches: z.coerce.number().positive(),
  heightInches: z.coerce.number().positive(),
});

/** To succeed, Offr requires our response to conform to this schema */
export const successBodySchema = z.object({
  success: z.literal(true),
  data: z.object({
    /**
     * Same as Shopify `sellingPlanGroupInput`
     * https://shopify.dev/docs/api/admin-graphql/2024-07/input-objects/SellingPlanGroupInput
     *
     * With additional restrictions:
     * * no sellingPlansToDelete
     * * no sellingPlansToUpdate
     * * no appId
     * * create at least one sellingPlan
     */
    sellingPlanGroupInput: SellingPlanGroupInputSchema()
      .omit({
        sellingPlansToDelete: true, // not allowed
        sellingPlansToUpdate: true, // not allowed
        appId: true, // not allowed
      })
      // at least one selling plan is required
      .merge(
        z.object({
          sellingPlansToCreate: z.array(SellingPlanInputSchema()).min(1),
        })
      ),

    /**
     * OPTIONAL: The products/variants which receive this plan.
     * If not provided, Offr will automatically associate
     * the product and variants received.
     *
     * Note Shopify calls these 'ID', however it expects GID strings.
     */
    resources: SellingPlanGroupResourceInputSchema().optional(),

    /**
     * an ISO 8601 date string (ex: `2030-10-11T14:30:00Z`)
     * which represents the activation time the plan(s)
     *
     * for example:
     * set it to a future time to schedule public ticket sales
     */
    validFrom: z.string().datetime(),

    /**
     * an ISO 8601 date string (ex: `2030-10-11T14:30:00Z`)
     * which represents the deactivation time of the plan(s)
     *
     * for example:
     * set it 3 hours in the future to require checkout within 3 hours
     */
    validUntil: z.string().datetime(),

    /**
     * Array of key-value tuples to show in cart and order summary,
     * such as to show shopper customizations.
     *
     * @example
     * [["Dimensions","12x24x33"],["Material","Glass"]]
     */
    customAttributes: z.array(z.tuple([z.string(), z.string()])),
  }),
});

/**
 * To provide helpful error messages to the shopper,
 * Offr requires our error response to conform to this schema.
 *
 * Without this, the shopper will be presented with a generic error.
 */
export const errorBodySchema = z.object({
  success: z.literal(false),
  /** The message shown to the shopper */
  publicMessage: z.string(),
  /**
   * Debug information which will be stored in `Shopify Admin / Content (Metaobjects) / Log (Offr)`.
   * This data is not conveyed to the client browser;
   * it is only available through your Shopify admin
   */
  privateError: z.any(),
});
export type ErrorBodySchema = z.infer<typeof errorBodySchema>;

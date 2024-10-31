import { z } from "npm:zod@3.23.8";

import {
  SellingPlanGroupInputSchema,
  SellingPlanGroupResourceInputSchema,
  SellingPlanInputSchema,
} from "./shopify/admin.2024-07.graphql.ts";

export const measurementsSchema = z.object({
  lengthInches: z.coerce.number().positive(),
  widthInches: z.coerce.number().positive(),
  heightInches: z.coerce.number().positive(),
});

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
     * The products/variants which receive this plan.
     * Note shopify calls these 'ID', however it expects GID strings.
     * If not provided, Offr will automatically associate
     * the product and variants received.
     */
    resources: SellingPlanGroupResourceInputSchema().optional(),
    /**
     * an ISO 8601 date string representing the time the plan is activated
     * (ex: set it 1 hour the future to impose a 1-hour cool-down period)
     * @example
     * `2030-10-11T14:30:00Z`
     */
    validFrom: z.string().datetime(),
    /**
     * an ISO 8601 date string representing the time the plan is activated
     * (ex: set it 3-h in the future to require checkout within 3 hours)     * @example
     * `2030-10-11T17:30:00Z`
     */
    validUntil: z.string().datetime(),
    /**
     * Array of key-value tuples to show in cart and order summary
     * @example
     * [["Dimensions","12x24x33"],["Material","Glass"]]
     */
    customAttributes: z.array(z.tuple([z.string(), z.string()])),
  }),
});

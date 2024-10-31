import type { z } from "npm:zod@3.23.8";
import { successBodySchema } from "./schema.ts";
import type { SellingPlanInput } from "./shopify/admin.2024-07.graphql.ts";

const acrylicFishTank = {
  name: "Acrylic Fish Tank",
  options: ["Acrylic"],
  category: "OTHER",
  inventoryPolicy: { reserve: "ON_FULFILLMENT" },
  billingPolicy: {
    fixed: {
      checkoutCharge: { type: "PERCENTAGE", value: { percentage: 100 } },
      remainingBalanceChargeTrigger: "NO_REMAINING_BALANCE",
    },
  },
  deliveryPolicy: { fixed: { fulfillmentTrigger: "ASAP" } },
  pricingPolicies: [
    {
      fixed: {
        adjustmentType: "PRICE",
        adjustmentValue: { fixedValue: `${20.33}` },
      },
    },
  ],
} satisfies SellingPlanInput;

const glassFishTank = {
  name: "Glass Fish Tank",
  options: ["Glass"],
  category: "OTHER",
  inventoryPolicy: { reserve: "ON_FULFILLMENT" },
  billingPolicy: {
    fixed: {
      checkoutCharge: { type: "PERCENTAGE", value: { percentage: 100 } },
      remainingBalanceChargeTrigger: "NO_REMAINING_BALANCE",
    },
  },
  deliveryPolicy: { fixed: { fulfillmentTrigger: "ASAP" } },
  pricingPolicies: [
    {
      fixed: {
        adjustmentType: "PRICE",
        adjustmentValue: { fixedValue: `${25.33}` },
      },
    },
  ],
} satisfies SellingPlanInput;

export const exampleSuccess = {
  success: true,
  data: {
    sellingPlanGroupInput: {
      sellingPlansToCreate: [acrylicFishTank, glassFishTank],
      name: "Custom Sized Fish Tank",
      options: ["Material"], // label for plan options
    },
    validFrom: new Date().toISOString(),
    validUntil: new Date(
      new Date().valueOf() + 3 * 60 * 60 * 1000 // 3 hours
    ).toISOString(),
    resources: { productIds: [], productVariantIds: [] },
    customAttributes: [
      ["Dimensions", "12x24x33"],
      ["Material", "Glass"],
    ],
  },
} satisfies z.infer<typeof successBodySchema>;

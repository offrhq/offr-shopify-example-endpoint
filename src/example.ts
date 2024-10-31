import type { z } from "npm:zod@3.23.8";
import { measurementsSchema, successBodySchema } from "./schema.ts";
import type { SellingPlanInput } from "./shopify/admin.2024-07.graphql.ts";

type Measurements = z.infer<typeof measurementsSchema>;

export const getExample = (measurements: Measurements) => {
  const acrylicTank = {
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
          adjustmentValue: {
            fixedValue: `${
              20.33 +
              measurements.lengthInches *
                measurements.widthInches *
                measurements.heightInches *
                0.02
            }`,
          },
        },
      },
    ],
  } satisfies SellingPlanInput;

  const glassTank = {
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
          adjustmentValue: {
            fixedValue: `${
              25.33 +
              measurements.lengthInches *
                measurements.widthInches *
                measurements.heightInches *
                0.021
            }`,
          },
        },
      },
    ],
  } satisfies SellingPlanInput;
  return {
    success: true,
    data: {
      sellingPlanGroupInput: {
        sellingPlansToCreate: [acrylicTank, glassTank],
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
};

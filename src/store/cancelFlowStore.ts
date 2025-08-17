import { create } from "zustand";
import { z } from "zod";

export const CancelFlowSchema = z.object({
  user: z
    .object({
      id: z.string(),
      email: z.string().email(),
    })
    .nullable(),
  subscription: z
    .object({
      id: z.string(),
      user_id: z.string(),
      monthly_price: z.number(),
      status: z.string(),
    })
    .nullable(),
  cancellation: z
    .object({
      id: z.string().optional(),
      user_id: z.string(),
      subscription_id: z.string(),
      cancel_reason: z.string().optional(),
      downsell_variant: z.string().optional(),
      accepted_downsell: z.boolean().optional(),
      created_at: z.string().optional(),
    })
    .nullable(),
  // UI state properties for cancellation flow
  choice: z.enum(["yes", "no"]).nullable().default(null),
  currentStep: z.number().default(1),
  foundViaMM: z.enum(["yes", "no"]).nullable().default(null),
  hasLawyer: z.enum(["yes", "no"]).nullable().default(null),
  flowCompletedUnemployed: z.boolean().default(false),
  flowCompletedEmployed: z.boolean().default(false),
  subscriptionContinued: z.boolean().default(false),
  subscriptionEndDate: z.string().default("XX date"),
  response: z.record(z.string(), z.any()).default({}),
});

export type CancelFlowState = z.infer<typeof CancelFlowSchema>;

export const useCancelFlowStore = create<{
  state: CancelFlowState;
  setState: (newState: Partial<CancelFlowState>) => void;
}>((set) => ({
  state: {
    user: null,
    subscription: null,
    cancellation: null,
    choice: null,
    currentStep: 1,
    foundViaMM: null,
    hasLawyer: null,
    flowCompletedUnemployed: false,
    flowCompletedEmployed: false,
    subscriptionContinued: false,
    subscriptionEndDate: "XX date",
    response: {},
  },
  setState: (newState) => {
    const merged = { ...useCancelFlowStore.getState().state, ...newState };
    CancelFlowSchema.parse(merged);
    set({ state: merged });
  },
}));

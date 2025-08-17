import { create } from 'zustand';
import { z } from 'zod';

export const CancelFlowSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string().email(),
  }).nullable(),
  subscription: z.object({
    id: z.string(),
    user_id: z.string(),
    monthly_price: z.number(),
    status: z.string(),
  }).nullable(),
  cancellation: z.object({
    id: z.string().optional(),
    user_id: z.string(),
    subscription_id: z.string(),
    cancel_reason: z.string().optional(),
    downsell_variant: z.string().optional(),
    accepted_downsell: z.boolean().optional(),
    created_at: z.string().optional(),
  }).nullable(),
});

export type CancelFlowState = z.infer<typeof CancelFlowSchema>;

export const useCancelFlowStore = create<{
  state: CancelFlowState;
  setState: (newState: Partial<CancelFlowState>) => void;
}>(set => ({
  state: {
    user: null,
    subscription: null,
    cancellation: null,
  },
  setState: (newState) => {
    const merged = { ...useCancelFlowStore.getState().state, ...newState };
    CancelFlowSchema.parse(merged);
    set({ state: merged });
  },
}));

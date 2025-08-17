import { z } from "zod";

export const cancellationInputSchema = z.object({
  user_id: z.string().uuid(),
  subscription_id: z.string().uuid(),
  employment_status: z.enum(["employed", "unemployed"]),
  found_via_mm: z.boolean().optional(),
  applied_count: z.string().max(20).optional(),
  emailed_count: z.string().max(20).optional(),
  interviewed_count: z.string().max(20).optional(),
  has_lawyer: z.boolean().optional(),
  visa_type: z.string().max(50).optional(),
  feedback: z.string().min(0).max(500).optional(),
  cancel_reason: z.string().min(0).max(200).optional(),
  details: z.string().max(500).optional(),
  downsell_variant: z.enum(["A", "B"]),
  accepted_downsell: z.boolean().optional(),
  created_at: z.string().datetime(),
});

export type CancellationInput = z.infer<typeof cancellationInputSchema>;

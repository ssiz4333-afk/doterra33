import { z } from "zod";

export const ConsultationSchema = z.object({
    name: z
        .string()
        .min(2, { message: "이름은 2자 이상이어야 합니다." })
        .max(50, { message: "이름은 50자 이하이어야 합니다." }),
    phone: z
        .string()
        .regex(/^010-\d{4}-\d{4}$/, {
            message: "전화번호는 010-XXXX-XXXX 형식으로 입력해주세요.",
        }),
    interest: z.string().max(100).optional(),
    message: z.string().max(1000).optional(),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
});

export type ConsultationFormData = z.infer<typeof ConsultationSchema>;

"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateStatus(id: string, status: string) {
    await db.consultation.update({
        where: { id },
        data: { status: status as any },
    });
    revalidatePath("/admin/consultations");
    revalidatePath(`/admin/consultations/${id}`);
}

export async function updateAdminNote(id: string, note: string) {
    await db.consultation.update({
        where: { id },
        data: { adminNote: note },
    });
    revalidatePath("/admin/consultations");
    revalidatePath(`/admin/consultations/${id}`);
}

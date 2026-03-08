"use client";

import { useState } from "react";
import { updateStatus, updateAdminNote } from "./actions";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function StatusUpdater({
    id,
    currentStatus,
}: {
    id: string;
    currentStatus: string;
}) {
    const [isPending, setIsPending] = useState(false);

    async function handleStatusChange(value: string) {
        setIsPending(true);
        try {
            await updateStatus(id, value);
            toast.success("상태가 변경되었습니다.");
        } catch {
            toast.error("상태 변경에 실패했습니다.");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">상태</span>
            <Select
                defaultValue={currentStatus}
                onValueChange={handleStatusChange}
                disabled={isPending}
            >
                <SelectTrigger className="w-32">
                    <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="PENDING">대기중</SelectItem>
                    <SelectItem value="CONTACTED">연락완료</SelectItem>
                    <SelectItem value="COMPLETED">상담완료</SelectItem>
                    <SelectItem value="CANCELLED">취소</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export function AdminNoteUpdater({
    id,
    rawNote,
}: {
    id: string;
    rawNote: string;
}) {
    const [note, setNote] = useState(rawNote);
    const [isPending, setIsPending] = useState(false);

    async function handleSave() {
        setIsPending(true);
        try {
            await updateAdminNote(id, note);
            toast.success("메모가 저장되었습니다.");
        } catch {
            toast.error("메모 저장에 실패했습니다.");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="space-y-4">
            <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="상담 내용이나 특이사항을 기록하세요."
                className="min-h-[200px] resize-none"
            />
            <Button
                onClick={handleSave}
                disabled={isPending || note === rawNote}
                className="w-full"
            >
                {isPending ? "저장 중..." : "메모 저장"}
            </Button>
        </div>
    );
}

'use client'

import TiptapEditor from "@/components/editor/TipTapEditor";
import { useTranslations } from "next-intl"
import { useState } from "react";

export default function WritePage() {
    const t = useTranslations('Write');
    const [writeState, setWriteState] = useState('post');

    function changeWriteState(state) {
        setWriteState(state);
    }
    return (
        <div className="max-w-[800px] w-full min-h-[90vh] flex flex-col">
            <TiptapEditor />
        </div>
    )
}
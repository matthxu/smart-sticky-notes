import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function useUserSettings() {
    const [systemPrompt, setSystemPrompt] = useState<string>("")

    useEffect(() => {
        supabase.from("user_settings").select("custom_system_prompt").single()
            .then(({ data }) => { if (data) setSystemPrompt(data.custom_system_prompt ?? "") })
    }, [])

    async function saveSystemPrompt(value: string) {
        await supabase.from("user_settings").upsert({ custom_system_prompt: value })
        setSystemPrompt(value)
    }

    return { systemPrompt, saveSystemPrompt }
}

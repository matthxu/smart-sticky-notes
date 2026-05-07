import { useState } from "react"
import { useUserSettings } from "@/hooks/useUserSettings"
import { Link } from "react-router-dom"

export function Settings() {
    const { systemPrompt, saveSystemPrompt } = useUserSettings()
    const [value, setValue] = useState("")
    const [saved, setSaved] = useState(false)

    // Sync once loaded
    if (systemPrompt && !value) setValue(systemPrompt)

    async function handleSave() {
        await saveSystemPrompt(value)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                    <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">Back to notes</Link>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-gray-700">
                        Custom AI system prompt
                        <span className="ml-2 text-xs text-gray-400 font-normal">Prepended to all AI calls</span>
                    </label>
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="e.g. I'm a software engineer. Keep suggestions technical and concise."
                        rows={6}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-yellow-300 resize-none"
                    />
                    <button
                        onClick={handleSave}
                        className="self-end text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium px-4 py-1.5 rounded-lg"
                    >
                        {saved ? "Saved!" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    )
}

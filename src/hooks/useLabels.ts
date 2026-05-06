import { useState, useEffect } from "react"
import { fetchLabels, createLabel, deleteLabel } from "@/lib/labels"
import { Label } from "@/types"

export function useLabels() {
    const [labels, setLabels] = useState<Label[]>([])

    async function refetch() {
        const data = await fetchLabels()
        setLabels(data)
    }

    async function addLabel(name: string) {
        const label = await createLabel(name)
        await refetch()
        return label
    }

    async function removeLabel(id: string) {
        await deleteLabel(id)
        await refetch()
    }

    useEffect(() => {
        refetch()
    }, [])

    return { labels, addLabel, removeLabel, refetch }
}

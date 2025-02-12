import { prompt_configuration } from "@prisma/client";
import { useEffect, useState } from "react";
import { getPromptConfiguration } from "../../admin/actions";

export function usePromptConfiguration(): { isLoading: boolean, config: prompt_configuration | null } {
    const [isLoading, setIsLoading] = useState(true)
    const [config, setConfig] = useState<prompt_configuration | null>(null)

    useEffect(() => {
        getPromptConfiguration().then(setConfig).finally(() => setIsLoading(false))
        return () => setIsLoading(false)
    }, [])

    return { isLoading, config }
}
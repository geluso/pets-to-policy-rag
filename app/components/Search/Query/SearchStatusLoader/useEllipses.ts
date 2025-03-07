import { useState, useEffect } from 'react'

export default function useEllipsis(interval: number = 500): string {
    const ellipses = ['', '.', '..', '...']
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % ellipses.length)
        }, interval)

        return () => clearInterval(timer)
    }, [interval])

    return ellipses[index]
}

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

export function useCountdown(endDate: string | null | undefined): TimeLeft {
  const calculate = (): TimeLeft => {
    if (!endDate) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }

    const diff = new Date(endDate).getTime() - Date.now()

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    }
  }

  const [time, setTime] = useState<TimeLeft>(calculate)

  useEffect(() => {
    const id = setInterval(() => setTime(calculate()), 1000)
    return () => clearInterval(id)
  }, [endDate])

  return time
}

import { useState, useEffect, useCallback } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Gift,
  ArrowRight,
  Pause,
  Play,
} from 'lucide-react'
import { getImageUrl } from '../../services/api'
import { useCountdown } from '../../hooks/useCountdown'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ─── Countdown digit box ──────────────────────── */
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.07] backdrop-blur-sm sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -24, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="countdown-digit font-playfair text-2xl font-bold text-white sm:text-3xl lg:text-[34px]"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        {/* Subtle horizontal split line */}
        <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/[0.06]" />
      </div>
      <span className="mt-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/50 sm:text-[10px]">
        {label}
      </span>
    </div>
  )
}

interface OffersSectionProps {
  offers: any[]
  activeOffer: number
  currentOffer: any
  setActiveOffer: (index: number) => void
}

export default function OffersSection({
  offers,
  activeOffer,
  currentOffer,
  setActiveOffer,
}: OffersSectionProps) {
  const [paused, setPaused] = useState(false)
  const [progressKey, setProgressKey] = useState(0)

  const countdown = useCountdown(currentOffer?.endDate)

  const goTo = useCallback(
    (index: number) => {
      setActiveOffer(index)
      setProgressKey((k) => k + 1)
    },
    [setActiveOffer]
  )

  const prev = () => goTo(activeOffer === 0 ? offers.length - 1 : activeOffer - 1)
  const next = useCallback(
    () => goTo(activeOffer === offers.length - 1 ? 0 : activeOffer + 1),
    [activeOffer, offers.length, goTo]
  )

  // Auto-advance (pauses when user pauses)
  useEffect(() => {
    if (paused || offers.length <= 1) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [paused, offers.length, next])

  // Reset progress bar each time active slide changes
  useEffect(() => {
    setProgressKey((k) => k + 1)
  }, [activeOffer])

  return (
    <section className="relative w-full overflow-hidden bg-[#0D0D0D]">
      {/* ═══ BACKGROUND IMAGE with ken-burns ═══ */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${currentOffer.id}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          {currentOffer.bannerImage && (
            <img
              src={getImageUrl(currentOffer.bannerImage)}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ═══ OVERLAYS ═══ */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/90 via-[#0D0D0D]/60 to-[#0D0D0D]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-[#0D0D0D]/40" />
      {/* Subtle golden tint */}
      <div className="absolute inset-0 bg-[#C9A45B]/[0.03]" />

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 flex min-h-[600px] flex-col justify-between px-5 py-14 sm:min-h-[640px] sm:px-8 lg:min-h-[680px] lg:px-12 xl:px-16">
        {/* ─── Top bar: badge + controls ─── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-[#C9A45B]/30 bg-[#C9A45B]/10 px-4 py-2 backdrop-blur-sm">
              <Flame size={14} className="text-[#C9A45B]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C9A45B]">
                Limited Offers
              </span>
            </span>

            <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm sm:flex">
              <Gift size={13} className="text-white/70" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                {offers.length} {offers.length === 1 ? 'Offer' : 'Offers'} Live
              </span>
            </span>
          </div>

          {/* Arrow controls + pause */}
          {offers.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPaused(!paused)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-[#C9A45B]/50 hover:text-[#C9A45B]"
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <button
                onClick={prev}
                aria-label="Previous offer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-[#C9A45B]/50 hover:text-[#C9A45B]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => next()}
                aria-label="Next offer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-[#C9A45B]/50 hover:text-[#C9A45B]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* ─── Center: animated offer content ─── */}
        <div className="flex-1 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentOffer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              {/* Offer number */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-6 bg-[#C9A45B]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#C9A45B]">
                  Offer {String(activeOffer + 1).padStart(2, '0')} / {String(offers.length).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-playfair text-3xl leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {currentOffer.name}
              </h3>

              {/* Description */}
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:mt-6 sm:text-base sm:leading-8">
                {currentOffer.description}
              </p>

              {/* Countdown Timer */}
              {currentOffer.endDate && !countdown.expired && (
                <div className="mt-8">
                  <div className="mb-3 flex items-center gap-2">
                    <Clock size={13} className="text-[#C9A45B]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
                      Offer Ends In
                    </span>
                  </div>
                  <div className="flex gap-3 sm:gap-4">
                    <CountdownUnit value={countdown.days} label="Days" />
                    <span className="flex items-center pt-0 font-playfair text-2xl text-[#C9A45B]/40">:</span>
                    <CountdownUnit value={countdown.hours} label="Hours" />
                    <span className="flex items-center pt-0 font-playfair text-2xl text-[#C9A45B]/40">:</span>
                    <CountdownUnit value={countdown.minutes} label="Mins" />
                    <span className="flex items-center pt-0 font-playfair text-2xl text-[#C9A45B]/40">:</span>
                    <CountdownUnit value={countdown.seconds} label="Secs" />
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="mt-9 flex flex-wrap gap-3 sm:mt-10">
                <Link
                  to={currentOffer?.id ? `/products?offer=${currentOffer.id}` : '/products'}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#C9A45B] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-[#1C1C1C] sm:px-9 sm:py-4 sm:text-[12px]"
                >
                  Shop This Offer
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href="https://wa.me/917096241594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white sm:px-9 sm:py-4 sm:text-[12px]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Order
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Bottom: thumbnail strip + progress ─── */}
        <div className="mt-8">
          {/* Thumbnail navigation */}
          {offers.length > 1 && (
            <div className="mb-5 flex items-center gap-3 overflow-x-auto pb-1">
              {offers.map((offer: any, idx: number) => {
                const isActive = idx === activeOffer
                return (
                  <button
                    key={offer.id || idx}
                    onClick={() => goTo(idx)}
                    className={`group relative flex-shrink-0 overflow-hidden rounded-xl transition-all duration-500 ${
                      isActive
                        ? 'ring-2 ring-[#C9A45B] ring-offset-2 ring-offset-[#0D0D0D]'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <div className="relative h-16 w-24 overflow-hidden rounded-xl sm:h-[72px] sm:w-28">
                      {offer.bannerImage ? (
                        <img
                          src={getImageUrl(offer.bannerImage)}
                          alt={offer.name || `Offer ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#1C1C1C] font-playfair text-lg text-[#C9A45B]">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                      )}
                      {/* Dark overlay on inactive */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isActive ? 'bg-transparent' : 'bg-black/40'
                        }`}
                      />
                      {/* Index badge */}
                      <span className="absolute bottom-1.5 right-2 text-[9px] font-bold text-white/80">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Progress bar */}
          {offers.length > 1 && (
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                key={progressKey}
                className={`h-full rounded-full bg-gradient-to-r from-[#C9A45B] to-[#E8D4A2] ${
                  paused ? '' : 'offer-progress-bar'
                }`}
                style={
                  paused
                    ? { width: '100%', animationPlayState: 'paused' }
                    : { animationDuration: '6s' }
                }
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

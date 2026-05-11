import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'

/* ══════════════════════════════════════════════════════════════════
   DATA  — hanya 3 alasan (item ke-4 dihapus)
══════════════════════════════════════════════════════════════════ */
const REASONS = [
  {
    icon: '🌙',
    title: 'Cara Kamu Tertawa',
    body: 'Ada sesuatu yang ajaib dalam tawamu — matamu menyipit, pipimu merona, dan untuk sesaat dunia berhenti berputar. Aku bisa mendengar suaramu tertawa seumur hidup.',
  },
  {
    icon: '🌸',
    title: 'Hati yang Tulus',
    body: 'Kamu peduli tanpa pamrih, memberi tanpa hitungan. Ketulusanmu adalah hal paling indah yang pernah aku temui, dan itu membuatku ingin menjadi orang yang lebih baik.',
  },
  {
    icon: '☁️',
    title: 'Rasa Aman Bersamamu',
    body: 'Di sisimu aku tidak perlu berpura-pura. Kamu adalah tempat pulang yang tidak pernah memintaku menjadi orang lain — dan itu segalanya bagiku.',
  },
]

/* ══════════════════════════════════════════════════════════════════
   MICRO COMPONENTS
══════════════════════════════════════════════════════════════════ */

/* BUG-FIX 3: Gunakan karakter emoji langsung — bukan \\u escape */
const FloatingHeart = ({ x, delay, size, color, duration }) => (
  <motion.div
    aria-hidden
    className="pointer-events-none select-none fixed z-0"
    style={{ left: `${x}%`, bottom: '-8%', fontSize: size, color, lineHeight: 1 }}
    animate={{
      y: [0, -(window.innerHeight + 120)],
      rotate: [0, 20],
      opacity: [0, 0.7, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
      repeatDelay: Math.random() * 3,
    }}
  >
    ♡
  </motion.div>
)

const Petal = ({ x, delay, duration }) => (
  <motion.div
    aria-hidden
    className="pointer-events-none select-none fixed z-0 text-petal opacity-60"
    style={{ left: `${x}%`, top: '-3%', fontSize: '14px' }}
    animate={{
      y: [0, window.innerHeight + 60],
      x: [0, 60, -20, 40],
      rotate: [0, 360],
      opacity: [0, 0.8, 0],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
  >
    🌸
  </motion.div>
)

/* Fade-in saat scroll */
const Reveal = ({ children, className = '', delay = 0, y = 40 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* BUG-FIX 2: Photo component — terima prop `height` eksplisit
   supaya foto selalu mengisi polaroid dengan benar */
const Photo = ({ src, alt, fallback = '🌸', className = '', imgClass = '', height }) => {
  const [err, setErr] = useState(false)
  return (
    <div
      className={`overflow-hidden bg-blush/30 ${className}`}
      style={height ? { height } : undefined}
    >
      {!err ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover object-center ${imgClass}`}
          onError={() => setErr(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-6xl select-none">
          {fallback}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const letterVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: 0.4 + i * 0.055, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-blush/20 to-lavender/30" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blush/40 blur-[80px]" />
        <div className="absolute bottom-1/4 -right-24 w-80 h-80 rounded-full bg-champagne/60 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-lavender/30 blur-[100px]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full"
      >
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full glass shadow-card"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💌
          </motion.span>
          <span className="font-body text-dustyrose text-xs tracking-[0.35em] uppercase">
            sebuah kejutan kecil untukmu
          </span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
          >
            💌
          </motion.span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-1">
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold italic leading-none tracking-tight">
            {'Untuk'.split('').map((l, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block text-shimmer"
              >
                {l}
              </motion.span>
            ))}
          </h1>
        </div>
        <div className="overflow-hidden mb-8">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-rosewood/90">
            {'Kesayanganku'.split('').map((l, i) => (
              <motion.span
                key={i}
                custom={i + 6}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {l}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent to-petal/70" />
          <span className="text-petal text-base">♡ ♡ ♡</span>
          <div className="h-px w-24 sm:w-40 bg-gradient-to-l from-transparent to-petal/70" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-dustyrose/80 italic font-light max-w-lg mb-14"
        >
          "Dalam semua semesta yang mungkin ada,
          <br />aku selalu akan memilihmu — lagi dan lagi."
        </motion.p>

        {/* ── Hero Polaroid ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          /* BUG-FIX 1: rotate via Framer Motion animate, NOT inline style */
          style={{ rotate: -4 }}
          className="animate-float-slow relative"
        >
          {/* Shadow */}
          <div
            className="absolute polaroid opacity-20 blur-sm"
            style={{ width: 240, height: 300, top: 18, left: 10, rotate: '5deg' }}
          />

          {/* Main */}
          <div className="polaroid relative" style={{ width: 240 }}>
            {/* BUG-FIX 2: Photo dengan height eksplisit */}
            <Photo
              src="./assets/foto1.jpg"
              alt="Foto pertama kesayanganku"
              fallback="🌷"
              className="w-full"
              height={250}
              imgClass="transition-transform duration-700 hover:scale-105"
            />
            <p className="text-center font-serif text-dustyrose text-sm italic mt-2 font-light leading-snug">
              senyummu, favoritku ♡
            </p>
            {/* Tape strip */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-champagne/70"
              style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}
            />
          </div>

          {/* Badge */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-2, 4, -2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-5 -right-8 sm:-right-14 glass rounded-2xl px-4 py-2 shadow-card text-xs font-serif text-dustyrose italic whitespace-nowrap"
          >
            kamu cantik banget 🌸
          </motion.div>

          {/* Sparkle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-8 -right-4 text-gold text-2xl pointer-events-none select-none"
          >
            ✦
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16 flex flex-col items-center gap-2 text-petal/50"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase">gulir ke bawah</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="text-xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 2 — KENAPA AKU SAYANG KAMU  (3 alasan saja)
══════════════════════════════════════════════════════════════════ */
const ReasonsSection = () => (
  <section className="relative py-28 px-4 overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/10 to-cream" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-lavender/20 blur-[100px]" />
      <div className="absolute right-0 top-1/3 w-64 h-64 rounded-full bg-champagne/40 blur-[80px]" />
    </div>

    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <Reveal className="text-center mb-20">
        <div className="inline-flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-petal/60" />
            <span className="font-body text-xs text-dustyrose tracking-[0.35em] uppercase font-light">
              dari dalam hatiku
            </span>
            <div className="h-px w-12 bg-petal/60" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-rosewood/90 leading-tight">
            Kenapa Aku
          </h2>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold italic text-shimmer leading-tight">
            Sayang Kamu
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-petal/50" />
            <span className="text-petal text-2xl animate-pulse-soft">♡</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-petal/50" />
          </div>
        </div>
      </Reveal>

      {/* Grid: cards + photo */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left — Reason cards */}
        <div className="space-y-5 order-2 lg:order-1">
          {REASONS.map((r, i) => (
            <Reveal key={i} delay={i * 0.1} y={30}>
              <motion.div
                whileHover={{ x: 6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative flex items-start gap-5 p-6 rounded-2xl glass shadow-card
                           hover:shadow-glow border border-blush/30 hover:border-petal/40 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-blush to-petal
                               flex items-center justify-center font-display font-bold text-rosewood text-sm shadow-inner">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-rosewood font-semibold text-base mb-1">
                    {r.icon} {r.title}
                  </p>
                  <p className="font-body text-dustyrose/75 text-sm leading-relaxed font-light">
                    {r.body}
                  </p>
                </div>
                <div className="absolute right-5 top-5 text-petal text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ♡
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* ── RIGHT: Foto 2 — Polaroid stack ─────────────────────
            BUG-FIX 1: Semua rotasi via Framer Motion `initial`,
            bukan CSS inline style {{ transform: 'rotate(Xdeg)' }}
            BUG-FIX 2: Photo dengan height eksplisit → foto muncul
            dan berada di tengah polaroid
        ═══════════════════════════════════════════════════════ */}
        <Reveal delay={0.25} className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative flex justify-center" style={{ width: 280, height: 380 }}>

            {/* Main polaroid — single, no hover */}
            <motion.div
              className="polaroid"
              style={{ width: 250 }}
              initial={{ rotate: -3 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <Photo
                src="./assets/foto2.jpg"
                alt="Foto kedua kesayanganku"
                fallback="🌷"
                className="w-full"
                height={260}
                imgClass="transition-transform duration-700"
              />
              <p className="text-center font-serif text-dustyrose text-xs italic mt-2 font-light">
                bersamamu, selalu ♡
              </p>
            </motion.div>



            {/* Sparkle */}
            <motion.div
              animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 right-2 text-gold text-xl"
            >
              ✦
            </motion.div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)

/* ══════════════════════════════════════════════════════════════════
   SECTION 3 — SURAT CINTA
══════════════════════════════════════════════════════════════════ */
const LoveLetterSection = () => (
  <section className="relative py-28 px-4 overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-blush/20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-96 rounded-full bg-blush/25 blur-[100px]" />
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-lavender/25 blur-[80px]" />
    </div>

    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <Reveal className="text-center mb-16">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="h-px w-16 bg-petal/50" />
          <span className="font-body text-xs text-dustyrose tracking-[0.35em] uppercase">
            — surat dariku —
          </span>
          <div className="h-px w-16 bg-petal/50" />
        </div>
        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold italic text-rosewood/90">
          Untuk Kamu,
        </h2>
        <p className="font-serif text-dustyrose/60 text-lg italic mt-3 font-light">
          yang selalu ada di hatiku
        </p>
      </Reveal>

      {/* Letter + Photo */}
      <div className="grid md:grid-cols-5 gap-12 items-start">

        {/* Surat — 3 cols */}
        <Reveal className="md:col-span-3" delay={0.1}>
          <div className="envelope-border p-8 sm:p-10 relative">
            <div
              className="absolute top-6 right-8 font-display text-7xl text-blush/40 leading-none select-none"
              aria-hidden
            >
              "
            </div>
            <div className="space-y-5 relative z-10">
              <p className="font-serif text-rosewood/80 text-lg sm:text-xl italic font-light leading-relaxed">
                Mungkin aku tidak selalu sempurna dalam mengungkapkan apa yang aku rasakan,
                tapi hari ini aku ingin kamu tahu —
              </p>
              <p className="font-serif text-rosewood/75 text-base sm:text-lg leading-relaxed font-light">
                Setiap hari yang aku lalui bersamamu terasa seperti halaman baru dari cerita
                paling indah yang pernah aku baca. Kamu bukan hanya seseorang yang aku cintai,
                kamu adalah alasan mengapa aku percaya bahwa hal-hal baik itu sungguh nyata.
              </p>
              <p className="font-serif text-rosewood/75 text-base sm:text-lg leading-relaxed font-light">
                Di semua kerumitan hidup, kehadiranmu adalah hal yang paling sederhana
                sekaligus paling berharga. Terima kasih sudah ada. Terima kasih sudah memilih
                untuk tetap di sini, bersamaku.
              </p>
              <p className="font-serif text-rosewood/80 text-lg sm:text-xl italic font-light leading-relaxed">
                Aku akan terus sayang kamu — hari ini, besok, dan semua hari setelahnya.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-petal/20 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-petal/30 to-transparent" />
              <div className="text-center">
                <p className="font-display text-dustyrose italic text-base">Dengan segenap cinta,</p>
                <p className="font-display text-rosewood italic font-semibold text-lg mt-1">Fausta ♡</p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-petal/30 to-transparent" />
            </div>
          </div>
        </Reveal>

        {/* Foto 3 + Heartbeat — 2 cols */}
        <Reveal className="md:col-span-2" delay={0.3}>
          <div className="flex flex-col items-center gap-8">

            {/* ✅ Foto 3 — rotate via Framer Motion initial */}
            <motion.div
              className="polaroid cursor-pointer"
              style={{ width: 210 }}
              initial={{ rotate: 4 }}                    /* ← FIXED: bukan style={{ transform }} */
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
              <Photo
                src="./assets/foto3.jpg"
                alt="Foto ketiga kesayanganku"
                fallback="🌹"
                className="w-full"
                height={220}
                imgClass="transition-transform duration-700"
              />
              <p className="text-center font-serif text-dustyrose text-xs italic mt-2 font-light">
                yang paling indah ♡
              </p>
            </motion.div>

            {/* Heartbeat */}
            <div className="flex flex-col items-center gap-3">
              {/* ECG line */}
              <svg
                viewBox="0 0 160 40"
                className="w-40 h-10 overflow-visible"
                style={{ filter: 'drop-shadow(0 0 6px rgba(196,116,138,0.5))' }}
              >
                <motion.path
                  d="M0 20 L30 20 L38 20 L42 5 L46 35 L50 20 L58 20 L62 8 L66 32 L70 20 L160 20"
                  fill="none"
                  stroke="#C4748A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                />
              </svg>

              {/* Big heart */}
              <motion.div
                animate={{ scale: [1, 1.22, 1, 1.14, 1, 1, 1] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.14, 0.28, 0.42, 0.56, 0.7, 1],
                }}
                className="text-6xl select-none"
                style={{ filter: 'drop-shadow(0 0 16px rgba(196,116,138,0.55))' }}
              >
                ❤️
              </motion.div>

              <p className="font-serif text-dustyrose/60 text-xs italic text-center">
                detak jantungku
                <br />selalu untukmu
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* CTA */}
      <Reveal delay={0.5} className="mt-20 text-center">
        <button
          className="btn-seal inline-flex items-center gap-3 text-sm tracking-wider"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ♡
          </motion.span>
          Baca dari awal lagi
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
          >
            ♡
          </motion.span>
        </button>
      </Reveal>

      {/* Footer */}
      <Reveal delay={0.6} className="mt-14 text-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-petal/40" />
          <span className="text-petal/40 text-xs">♡ ♡ ♡</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-petal/40" />
        </div>
        <p className="font-serif text-rosewood/25 text-xs italic font-light">
          dibuat dengan cinta tulus — hanya untukmu, selalu.
        </p>
      </Reveal>
    </div>
  </section>
)

/* ══════════════════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════════════════ */
export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const hearts = React.useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        x: 5 + (i / 14) * 90,
        delay: i * 0.9 + Math.random() * 2,
        size: `${13 + Math.random() * 16}px`,
        color: ['#EBA8B8', '#C4748A', '#C9A96E', '#E8DCF0'][i % 4],
        duration: 7 + Math.random() * 7,
      })),
    [],
  )

  const petals = React.useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        x: 10 + i * 13,
        delay: i * 1.5,
        duration: 9 + Math.random() * 5,
      })),
    [],
  )

  return (
    <div className="relative min-h-screen bg-cream font-body">
      {/* Scroll progress bar */}
      <motion.div id="scroll-progress" style={{ scaleX }} />

      {/* Ambient particles */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {hearts.map((h, i) => (
          <FloatingHeart key={i} {...h} />
        ))}
        {petals.map((p, i) => (
          <Petal key={i} {...p} />
        ))}
      </div>

      <main>
        <HeroSection />
        <ReasonsSection />
        <LoveLetterSection />
      </main>
    </div>
  )
}

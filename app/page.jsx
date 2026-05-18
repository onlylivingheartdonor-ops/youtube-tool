"use client"

import { useState } from "react"
import { RELATED_LINKS as RELATED } from "./lib/links"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .yt-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .yt-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .yt-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .yt-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .yt-title em { font-style: italic; color: #b91c1c; }
  .yt-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .yt-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }

  .yt-mode-tabs { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; margin-bottom: 1.5rem; }
  .yt-mode-tab { padding: .65rem 1rem; border: 1px solid #e0dbd3; border-radius: 2px; font-family: 'DM Mono', monospace; font-size: 12px; color: #555; cursor: pointer; background: none; transition: all .15s; text-align: center; }
  .yt-mode-tab.on { border-color: #b91c1c; background: #fff5f5; color: #b91c1c; }

  .yt-textarea { width: 100%; border: 1.5px solid #e0dbd3; background: #faf8f4; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .75rem 1rem; outline: none; border-radius: 3px; resize: none; height: 56px; transition: border-color .2s; line-height: 1.4; }
  .yt-textarea:focus { border-color: #b91c1c; }
  .yt-char-count { font-size: 11px; text-align: right; margin-top: .25rem; }

  .yt-score-hero { background: #fff5f5; border: 1px solid #fcd4d4; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1.5rem; }
  .yt-score-circle { width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 3px solid; }
  .yt-score-num { font-family: 'DM Serif Display', serif; font-size: 1.8rem; line-height: 1; }
  .yt-score-info { flex: 1; }
  .yt-score-grade { font-family: 'DM Serif Display', serif; font-size: 1.3rem; margin-bottom: .25rem; }
  .yt-score-desc { font-size: 12px; color: #555; line-height: 1.5; }

  .yt-score-breakdown { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; margin-bottom: 1.5rem; }
  .yt-score-cat { background: #faf8f4; border: 1px solid #e0dbd3; border-radius: 3px; padding: .75rem 1rem; }
  .yt-score-cat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: .4rem; }
  .yt-score-cat-name { font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: #888; }
  .yt-score-cat-val { font-family: 'DM Serif Display', serif; font-size: 1.1rem; }
  .yt-score-cat-bar-track { height: 3px; background: #e0dbd3; border-radius: 2px; overflow: hidden; }
  .yt-score-cat-bar { height: 100%; border-radius: 2px; transition: width .5s; }

  .yt-findings { margin-bottom: 1.5rem; }
  .yt-findings-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .6rem; }
  .yt-finding-list { display: flex; flex-direction: column; gap: .4rem; }
  .yt-finding-row { display: flex; align-items: flex-start; gap: .65rem; font-size: 12px; line-height: 1.5; padding: .6rem .75rem; border-radius: 3px; }
  .yt-finding-row.pass { background: #f0fdf4; }
  .yt-finding-row.warn { background: #fffbeb; }
  .yt-finding-row.fail { background: #fff5f5; }
  .yt-finding-row.info { background: #f0f9ff; }
  .yt-finding-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: .35rem; }

  .yt-preview-section { margin-bottom: 1.5rem; }
  .yt-preview-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
  .yt-previews { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: .75rem; }
  .yt-preview-card { border: 1px solid #e0dbd3; border-radius: 3px; overflow: hidden; }
  .yt-preview-thumb { background: #1a1a1a; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; }
  .yt-preview-play { width: 0; height: 0; border-top: 8px solid transparent; border-bottom: 8px solid transparent; border-left: 13px solid rgba(255,255,255,0.5); margin-left: 2px; }
  .yt-preview-meta { padding: .5rem .6rem; }
  .yt-preview-device { font-size: 9px; letter-spacing: .06em; text-transform: uppercase; color: #aaa; margin-bottom: .25rem; }
  .yt-preview-text { font-size: 11px; color: #1a1a1a; line-height: 1.35; font-family: system-ui, sans-serif; font-weight: 500; }
  .yt-preview-text .cut { color: #b91c1c; }
  .yt-preview-channel { font-size: 10px; color: #aaa; margin-top: .2rem; font-family: system-ui, sans-serif; }

  .yt-length-bar { margin-bottom: 1.5rem; }
  .yt-length-bar-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .4rem; display: flex; justify-content: space-between; }
  .yt-length-track { height: 6px; background: #e0dbd3; border-radius: 3px; position: relative; overflow: visible; }
  .yt-length-fill { height: 100%; border-radius: 3px; transition: width .3s, background .3s; position: absolute; top: 0; left: 0; }
  .yt-length-tick { position: absolute; top: -3px; width: 2px; height: 12px; background: #bbb; }
  .yt-length-tick-label { position: absolute; top: 12px; font-size: 9px; color: #aaa; transform: translateX(-50%); white-space: nowrap; }

  .yt-ab { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  .yt-ab-cell { }
  .yt-ab-label { font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: #888; margin-bottom: .4rem; }
  .yt-ab-winner { display: inline-block; font-size: 10px; padding: .15rem .5rem; border-radius: 20px; background: #eaf5ee; color: #166534; margin-left: .4rem; }

  .yt-pattern-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; margin-top: .75rem; }
  .yt-pattern-item { padding: .75rem; border: 1px solid #e0dbd3; border-radius: 3px; cursor: pointer; transition: border-color .15s; }
  .yt-pattern-item:hover { border-color: #b91c1c; }
  .yt-pattern-name { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .2rem; }
  .yt-pattern-example { font-size: 11px; color: #b91c1c; margin-bottom: .2rem; }
  .yt-pattern-desc { font-size: 11px; color: #888; line-height: 1.4; }

  .yt-power-words { display: flex; flex-wrap: wrap; gap: .35rem; margin-top: .5rem; }
  .yt-power-word { font-size: 11px; padding: .2rem .55rem; border-radius: 20px; border: 1px solid; cursor: default; }
  .yt-power-word.trigger  { background: #fff5f5; border-color: #fcd4d4; color: #b91c1c; }
  .yt-power-word.number   { background: #eff6ff; border-color: #bfdbfe; color: #1e40af; }
  .yt-power-word.question { background: #fefce8; border-color: #fde68a; color: #854d0e; }
  .yt-power-word.action   { background: #f0fdf4; border-color: #bbf7d0; color: #166534; }

  .yt-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .yt-info-item { padding: .75rem; border-left: 2px solid #fcd4d4; }
  .yt-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .yt-info-body { font-size: 12px; color: #888; line-height: 1.5; }

  .yt-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .yt-prose p:last-child { margin-bottom: 0; }
  .yt-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .yt-prose ul li { margin-bottom: .3rem; }

  .yt-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .yt-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #fcd4d4; line-height: 1; margin-bottom: .4rem; }
  .yt-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .yt-tip-body { font-size: 12px; color: #888; line-height: 1.5; }

  .yt-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .yt-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .yt-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .yt-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .yt-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .yt-footer-links a { color: #888; text-decoration: underline; }

  @media (max-width: 600px) {
    .yt-score-breakdown, .yt-ab, .yt-pattern-grid, .yt-info-grid, .yt-tip-grid { grid-template-columns: 1fr; }
    .yt-previews { grid-template-columns: 1fr 1fr; }
  }
`

const MOBILE_LIMIT  = 70
const SEARCH_LIMIT  = 60
const DESKTOP_LIMIT = 100
const IDEAL_MAX     = 55

const POWER_WORDS = {
  trigger:  ["secret","never","always","mistake","warning","shocking","surprising","finally","proven","ultimate","best","worst","fail","dangerous","controversial","truth","hack","hidden","exposed","revealed","illegal","banned","censored","unbelievable","incredible"],
  number:   [],
  question: ["how","why","what","when","which","should","can","will","does","is","are","do"],
  action:   ["get","make","build","create","learn","stop","start","avoid","fix","boost","grow","save","earn","win","beat","master","discover"],
}

const CLICKBAIT_PHRASES = ["you won't believe","click here","watch this","gone wrong","gone sexual","shocking truth","they don't want you","the government","illuminati","not clickbait","*not clickbait*","(emotional)","(gone wrong)"]

const TITLE_PATTERNS = [
  { name: "How To",        example: "How to [Achieve X] in [Timeframe]",         desc: "Tutorial format. Clear value proposition. Very high search intent." },
  { name: "Listicle",      example: "7 Ways to [Achieve X] (That Actually Work)", desc: "Numbers increase CTR. Odd numbers outperform even numbers." },
  { name: "Question",      example: "Why Does [Common Thing] Happen?",            desc: "Matches conversational search queries. Strong curiosity gap." },
  { name: "Story",         example: "How I [Achieved X] in [Y Days]",             desc: "Personal narrative. High trust factor. Works well with results." },
  { name: "Vs / Compare",  example: "[Option A] vs [Option B]: Which is Better?", desc: "Decision-making content. High engagement. Strong search volume." },
  { name: "Mistake/Warning", example: "The [X] Mistake That's Costing You [Y]",  desc: "Loss aversion is a powerful motivator. Flags common errors." },
  { name: "Ultimate Guide", example: "The Complete Guide to [Topic] ([Year])",    desc: "Signals comprehensive content. Good for SEO. Use current year." },
  { name: "Challenge",     example: "I Tried [Thing] for [X] Days — Here's What Happened", desc: "Documentary format. High curiosity. Strong retention signal." },
]

function truncateAt(text, limit) {
  if (text.length <= limit) return { visible: text, cut: "" }
  return { visible: text.slice(0, limit), cut: text.slice(limit) }
}

function analyzeTitle(title) {
  if (!title || title.trim().length < 3) return null
  const t   = title.trim()
  const low = t.toLowerCase()
  const len = t.length
  const words = t.split(/\s+/)
  const firstWords = words.slice(0, 5).join(" ").toLowerCase()

  // ── LENGTH SCORE (0–25) ──
  let lengthScore = 0
  if (len >= 30 && len <= IDEAL_MAX)       lengthScore = 25
  else if (len > IDEAL_MAX && len <= SEARCH_LIMIT) lengthScore = 20
  else if (len > SEARCH_LIMIT && len <= MOBILE_LIMIT) lengthScore = 12
  else if (len > MOBILE_LIMIT)             lengthScore = 5
  else if (len < 30)                       lengthScore = 10

  // ── KEYWORD SCORE (0–25) ──
  let keywordScore = 15
  const hasNumber = /\d/.test(t)
  const hasQuestion = POWER_WORDS.question.some(w => firstWords.includes(w))
  const hasAction = POWER_WORDS.action.some(w => firstWords.includes(w + " ") || firstWords.startsWith(w))
  const hasTrigger = POWER_WORDS.trigger.some(w => low.includes(w))
  const hasYear = /\b(202[3-9]|2030)\b/.test(t)
  if (hasNumber) keywordScore += 4
  if (hasQuestion) keywordScore += 3
  if (hasAction) keywordScore += 3
  if (hasTrigger) keywordScore += 2
  if (hasYear) keywordScore += 3
  keywordScore = Math.min(keywordScore, 25)

  // ── STRUCTURE SCORE (0–25) ──
  let structureScore = 10
  const detectedPattern = TITLE_PATTERNS.find(p => {
    const n = p.name.toLowerCase()
    if (n === "how to" && low.startsWith("how to")) return true
    if (n === "listicle" && /^\d+\s/.test(t)) return true
    if (n === "question" && /\?$/.test(t)) return true
    if (n === "story" && /(how i|i tried|i made|i lost|i gained|i went)/i.test(low)) return true
    if (n === "vs / compare" && /\svs\.?\s/i.test(t)) return true
    if (n === "mistake/warning" && /(mistake|stop|avoid|warning|never)/i.test(low)) return true
    if (n === "ultimate guide" && /(complete|ultimate|guide|everything)/i.test(low)) return true
    if (n === "challenge" && /(days?|weeks?|hours?|times?)\s*[—–-]/i.test(t)) return true
    return false
  })
  if (detectedPattern) structureScore += 10
  if (words.length >= 4 && words.length <= 10) structureScore += 5
  structureScore = Math.min(structureScore, 25)

  // ── CTR SCORE (0–25) ──
  let ctrScore = 10
  const isClickbait = CLICKBAIT_PHRASES.some(p => low.includes(p))
  const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(t)
  const hasCuriosity = /(secret|hidden|never|finally|actually|really|honest|truth|real)/i.test(t)
  const hasBrackets = /[\[\(]/.test(t)
  const allCaps = words.filter(w => w.length > 3 && w === w.toUpperCase()).length > 2
  if (isClickbait) ctrScore -= 8
  if (hasEmoji) ctrScore += 2
  if (hasCuriosity) ctrScore += 4
  if (hasBrackets) ctrScore += 3
  if (allCaps) ctrScore -= 5
  if (hasNumber) ctrScore += 3
  if (/\?$/.test(t)) ctrScore += 3
  ctrScore = Math.max(0, Math.min(ctrScore, 25))

  const total = lengthScore + keywordScore + structureScore + ctrScore

  // ── FINDINGS ──
  const findings = []

  // Length
  if (len >= 30 && len <= IDEAL_MAX)
    findings.push({ type: "pass", text: "Length is " + len + " characters — ideal for search results and all device types." })
  else if (len > MOBILE_LIMIT)
    findings.push({ type: "fail", text: "Title is " + len + " characters — will be cut off on mobile (limit ~" + MOBILE_LIMIT + "). Consider shortening by " + (len - MOBILE_LIMIT) + " characters." })
  else if (len > SEARCH_LIMIT)
    findings.push({ type: "warn", text: "Title is " + len + " characters — may be truncated in search results. Aim for under " + SEARCH_LIMIT + " for full visibility everywhere." })
  else if (len < 30)
    findings.push({ type: "warn", text: "Title is short at " + len + " characters. Longer titles (35–55 chars) tend to perform better by giving YouTube more context." })

  // Keywords
  if (hasNumber) findings.push({ type: "pass", text: "Contains a number — titles with specific numbers consistently get higher click-through rates." })
  else findings.push({ type: "warn", text: "No numbers found. Adding a specific number (\"5 Ways\", \"In 30 Days\", \"$10K\") typically boosts CTR." })

  if (hasAction) findings.push({ type: "pass", text: "Starts with or contains a strong action word — signals clear value to viewers immediately." })
  if (hasQuestion) findings.push({ type: "pass", text: "Contains a question word — matches conversational search queries and creates curiosity." })
  if (hasYear) findings.push({ type: "pass", text: "Contains the current year — signals fresh, up-to-date content which boosts both CTR and search ranking." })
  if (hasTrigger) findings.push({ type: "info", text: "Contains emotional trigger words — effective when used genuinely, but overuse can signal clickbait to YouTube's algorithm." })

  // Structure
  if (detectedPattern) findings.push({ type: "pass", text: "Matches the \"" + detectedPattern.name + "\" title pattern — one of the most proven formats for YouTube performance." })
  else findings.push({ type: "info", text: "No recognized title pattern detected. Consider structuring around How To, a number, a question, or a personal story." })

  // CTR
  if (isClickbait) findings.push({ type: "fail", text: "Contains a phrase YouTube's algorithm flags as potential clickbait. This can suppress distribution. Rewrite to be specific and honest." })
  if (allCaps) findings.push({ type: "warn", text: "Multiple words in ALL CAPS. This reads as shouting and can reduce perceived credibility. Use title case instead." })
  if (hasBrackets) findings.push({ type: "pass", text: "Uses brackets or parentheses — effective for adding context, format hints, or secondary hooks (e.g. [FULL GUIDE])." })
  if (hasEmoji) findings.push({ type: "info", text: "Contains an emoji — can stand out in feeds, but use sparingly. One emoji max; avoid if your audience is professional." })

  // Front-loading check
  const importantInFirst5 = hasAction || hasQuestion || hasNumber
  if (!importantInFirst5)
    findings.push({ type: "warn", text: "Your strongest keyword or hook may not be in the first 5 words. Mobile viewers see only the beginning — lead with your most compelling element." })

  // Detected power words
  const foundTriggers  = POWER_WORDS.trigger.filter(w => low.includes(w))
  const foundActions   = POWER_WORDS.action.filter(w => new RegExp(`\\b${w}\\b`).test(low))
  const foundQuestions = POWER_WORDS.question.filter(w => new RegExp(`\\b${w}\\b`).test(low))
  const numbers        = t.match(/\d+/g) || []

  const powerWords = [
    ...foundTriggers.map(w  => ({ word: w, type: "trigger"  })),
    ...foundActions.map(w   => ({ word: w, type: "action"   })),
    ...foundQuestions.map(w => ({ word: w, type: "question" })),
    ...numbers.map(n        => ({ word: n, type: "number"   })),
  ]

  return {
    total, lengthScore, keywordScore, structureScore, ctrScore,
    findings, detectedPattern, powerWords,
    mobileOk: len <= MOBILE_LIMIT, desktopOk: len <= DESKTOP_LIMIT,
    searchOk: len <= SEARCH_LIMIT, idealOk: len <= IDEAL_MAX,
  }
}

function scoreColor(score, max) {
  const pct = score / max
  if (pct >= 0.8) return "#166534"
  if (pct >= 0.6) return "#0369a1"
  if (pct >= 0.4) return "#b45309"
  return "#b91c1c"
}

function gradeLabel(total) {
  if (total >= 88) return { grade: "Excellent",    desc: "This title is well-optimized for both search and click-through. Publish with confidence." }
  if (total >= 72) return { grade: "Good",          desc: "Solid title with strong fundamentals. Minor tweaks could push it to excellent." }
  if (total >= 55) return { grade: "Fair",           desc: "Some good elements but meaningful improvements are available. See findings below." }
  if (total >= 35) return { grade: "Needs work",    desc: "This title has significant room for improvement before publishing." }
  return                  { grade: "Poor",           desc: "This title is likely to underperform. Review all findings and consider a full rewrite." }
}

export default function Page() {
  const [mode,   setMode]   = useState("single")
  const [titleA, setTitleA] = useState("")
  const [titleB, setTitleB] = useState("")

  const analysisA = analyzeTitle(titleA)
  const analysisB = mode === "ab" ? analyzeTitle(titleB) : null

  const winnerIsA = analysisA && analysisB && analysisA.total >= analysisB.total

  function TitleInput({ value, onChange, label }) {
    const len = value.length
    const col = len > MOBILE_LIMIT ? "#b91c1c" : len > SEARCH_LIMIT ? "#b45309" : "#888"
    return (
      <div>
        {label && <p style={{ fontSize: "11px", letterSpacing: ".06em", textTransform: "uppercase", color: "#888", marginBottom: ".4rem" }}>{label}</p>}
        <textarea className="yt-textarea" placeholder="Type or paste your YouTube title…"
          value={value} onChange={e => onChange(e.target.value)} maxLength={200} />
        <p className="yt-char-count" style={{ color: col }}>{len} characters</p>
      </div>
    )
  }

  function ScorePanel({ analysis, title }) {
    if (!analysis) return null
    const { total, lengthScore, keywordScore, structureScore, ctrScore, findings, powerWords } = analysis
    const { grade, desc } = gradeLabel(total)
    const tc = scoreColor(total, 100)

    const cats = [
      { name: "Length",    score: lengthScore,    max: 25 },
      { name: "Keywords",  score: keywordScore,   max: 25 },
      { name: "Structure", score: structureScore, max: 25 },
      { name: "CTR",       score: ctrScore,       max: 25 },
    ]

    const len = title.length
    const barPct = Math.min((len / DESKTOP_LIMIT) * 100, 105)
    const barCol = len <= IDEAL_MAX ? "#166534" : len <= SEARCH_LIMIT ? "#0369a1" : len <= MOBILE_LIMIT ? "#b45309" : "#b91c1c"

    const previews = [
      { label: "Search result", limit: SEARCH_LIMIT },
      { label: "Mobile feed",   limit: MOBILE_LIMIT },
      { label: "Desktop feed",  limit: DESKTOP_LIMIT },
    ]

    return (
      <>
        <div className="yt-score-hero">
          <div className="yt-score-circle" style={{ borderColor: tc }}>
            <span className="yt-score-num" style={{ color: tc }}>{total}</span>
          </div>
          <div className="yt-score-info">
            <p className="yt-score-grade" style={{ color: tc }}>{grade}</p>
            <p className="yt-score-desc">{desc}</p>
          </div>
        </div>

        <div className="yt-score-breakdown">
          {cats.map((c, i) => (
            <div className="yt-score-cat" key={i}>
              <div className="yt-score-cat-header">
                <span className="yt-score-cat-name">{c.name}</span>
                <span className="yt-score-cat-val" style={{ color: scoreColor(c.score, c.max) }}>{c.score}/{c.max}</span>
              </div>
              <div className="yt-score-cat-bar-track">
                <div className="yt-score-cat-bar" style={{ width: (c.score / c.max * 100) + "%", background: scoreColor(c.score, c.max) }} />
              </div>
            </div>
          ))}
        </div>

        <div className="yt-length-bar" style={{ marginBottom: "1.25rem" }}>
          <div className="yt-length-bar-label">
            <span>Character length</span>
            <span style={{ color: barCol }}>{len} chars</span>
          </div>
          <div className="yt-length-track" style={{ height: "6px", background: "#e0dbd3", borderRadius: "3px", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: Math.min(barPct, 100) + "%", background: barCol, borderRadius: "3px", transition: "width .3s" }} />
            {[IDEAL_MAX, SEARCH_LIMIT, MOBILE_LIMIT].map((v, i) => (
              <div key={i} style={{ position: "absolute", top: "-3px", left: (v / DESKTOP_LIMIT * 100) + "%", width: "1.5px", height: "12px", background: "#bbb" }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#aaa", marginTop: ".3rem" }}>
            <span>0</span>
            <span style={{ marginLeft: (IDEAL_MAX / DESKTOP_LIMIT * 100) + "%" }}>{IDEAL_MAX} ideal</span>
            <span>{SEARCH_LIMIT} search</span>
            <span>{MOBILE_LIMIT} mobile</span>
            <span>{DESKTOP_LIMIT} desktop</span>
          </div>
        </div>

        <div className="yt-preview-section">
          <p className="yt-preview-label">Title preview by context</p>
          <div className="yt-previews">
            {previews.map((p, i) => {
              const trunc = truncateAt(title, p.limit)
              return (
                <div className="yt-preview-card" key={i}>
                  <div className="yt-preview-thumb">
                    <div style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "11px solid rgba(255,255,255,0.4)", marginLeft: "2px" }} />
                  </div>
                  <div className="yt-preview-meta">
                    <p className="yt-preview-device">{p.label}</p>
                    <p className="yt-preview-text">
                      {trunc.visible}{trunc.cut && <span className="cut">…</span>}
                    </p>
                    <p className="yt-preview-channel">Your Channel</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="yt-findings">
          <p className="yt-findings-label">Analysis</p>
          <div className="yt-finding-list">
            {findings.map((f, i) => {
              const colors = { pass: "#166534", warn: "#b45309", fail: "#b91c1c", info: "#0369a1" }
              return (
                <div className={"yt-finding-row " + f.type} key={i}>
                  <div className="yt-finding-dot" style={{ background: colors[f.type] }} />
                  <span style={{ color: colors[f.type] === "#888" ? "#555" : "#444" }}>{f.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        {powerWords.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <p style={{ fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase", color: "#888", marginBottom: ".5rem" }}>Detected power words</p>
            <div className="yt-power-words">
              {powerWords.map((pw, i) => (
                <span key={i} className={"yt-power-word " + pw.type}>{pw.word}</span>
              ))}
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <style>{css}</style>
      <main className="yt-wrap">

        <div className="yt-header">
          <p className="yt-eyebrow">Content &amp; SEO</p>
          <h1 className="yt-title">YouTube Title<br /><em>Optimizer</em></h1>
        </div>

        {/* TOOL */}
        <div className="yt-card">
          <div className="yt-mode-tabs">
            <button className={"yt-mode-tab" + (mode === "single" ? " on" : "")} onClick={() => setMode("single")}>
              Analyze a title
            </button>
            <button className={"yt-mode-tab" + (mode === "ab" ? " on" : "")} onClick={() => setMode("ab")}>
              A/B compare two titles
            </button>
          </div>

          {mode === "single" ? (
            <>
              <TitleInput value={titleA} onChange={setTitleA} label={null} />
              {analysisA && <div style={{ marginTop: "1.5rem", borderTop: "1px solid #e0dbd3", paddingTop: "1.5rem" }}>
                <ScorePanel analysis={analysisA} title={titleA} />
              </div>}
            </>
          ) : (
            <>
              <div className="yt-ab">
                <div>
                  <TitleInput value={titleA} onChange={setTitleA}
                    label={analysisA && analysisB ? "Title A " + (winnerIsA ? "— winner ✓" : "") : "Title A"} />
                </div>
                <div>
                  <TitleInput value={titleB} onChange={setTitleB}
                    label={analysisA && analysisB ? "Title B " + (!winnerIsA ? "— winner ✓" : "") : "Title B"} />
                </div>
              </div>

              {analysisA && analysisB && (
                <>
                  <div style={{ background: "#faf8f4", border: "1px solid #e0dbd3", borderRadius: "3px", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
                    <p style={{ fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase", color: "#888", marginBottom: ".5rem" }}>Score comparison</p>
                    {[
                      { name: "Length",    a: analysisA.lengthScore,    b: analysisB.lengthScore,    max: 25 },
                      { name: "Keywords",  a: analysisA.keywordScore,   b: analysisB.keywordScore,   max: 25 },
                      { name: "Structure", a: analysisA.structureScore, b: analysisB.structureScore, max: 25 },
                      { name: "CTR",       a: analysisA.ctrScore,       b: analysisB.ctrScore,       max: 25 },
                      { name: "Total",     a: analysisA.total,          b: analysisB.total,          max: 100, bold: true },
                    ].map((row, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".35rem", fontSize: "12px" }}>
                        <span style={{ width: "70px", color: "#888", fontWeight: row.bold ? 500 : 400, color: row.bold ? "#1a1a1a" : "#888" }}>{row.name}</span>
                        <span style={{ width: "30px", textAlign: "right", color: row.a >= row.b ? "#166534" : "#888", fontWeight: row.a > row.b ? 500 : 400 }}>{row.a}</span>
                        <span style={{ color: "#ccc" }}>vs</span>
                        <span style={{ width: "30px", color: row.b > row.a ? "#166534" : "#888", fontWeight: row.b > row.a ? 500 : 400 }}>{row.b}</span>
                        <span style={{ flex: 1, fontSize: "11px", color: "#aaa" }}>/ {row.max}</span>
                      </div>
                    ))}
                  </div>

                  <p style={{ fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase", color: "#888", marginBottom: "1rem" }}>
                    Title A — {gradeLabel(analysisA.total).grade}
                  </p>
                  <ScorePanel analysis={analysisA} title={titleA} />

                  <div style={{ borderTop: "1px solid #e0dbd3", margin: "1.5rem 0" }} />

                  <p style={{ fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase", color: "#888", marginBottom: "1rem" }}>
                    Title B — {gradeLabel(analysisB.total).grade}
                  </p>
                  <ScorePanel analysis={analysisB} title={titleB} />
                </>
              )}
            </>
          )}
        </div>

        {/* TITLE PATTERNS */}
        <div className="yt-card">
          <p className="yt-section-title">High-performing title patterns</p>
          <div className="yt-prose">
            <p>These eight structures account for the majority of high-performing YouTube titles. They work because they match how viewers decide whether to click — by quickly communicating what they'll get, why it matters, and why now.</p>
          </div>
          <div className="yt-pattern-grid">
            {TITLE_PATTERNS.map((p, i) => (
              <div className="yt-pattern-item" key={i}>
                <p className="yt-pattern-name">{p.name}</p>
                <p className="yt-pattern-example">{p.example}</p>
                <p className="yt-pattern-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HOW YOUTUBE TITLES WORK */}
        <div className="yt-card">
          <p className="yt-section-title">How YouTube titles actually work</p>
          <div className="yt-prose">
            <p>A YouTube title does three jobs simultaneously: it tells YouTube's algorithm what your video is about (search ranking), it convinces a viewer to click over a competing video (click-through rate), and it sets expectations that determine whether viewers watch to the end (retention). A title optimized for only one of these will underperform on the others.</p>
            <p>YouTube's algorithm treats your title as the primary signal for search ranking — more weight than tags, slightly less than the description. Exact keyword matches in the title directly affect whether your video surfaces for specific queries. This means title optimization is partly audience copywriting and partly search engine optimization, and the best titles do both.</p>
            <p>Click-through rate (CTR) — the percentage of people who see your video and click it — is one of YouTube's strongest ranking signals. A video with high CTR gets shown to more people, which generates more watch time, which increases its ranking further. Your title (along with the thumbnail) is almost entirely responsible for CTR. A 1% improvement in CTR can compound into dramatically more views over time.</p>
          </div>
          <div className="yt-info-grid">
            <div className="yt-info-item">
              <p className="yt-info-title">The keyword-curiosity balance</p>
              <p className="yt-info-body">The best titles satisfy both search intent (exact keywords) and emotional curiosity (intrigue, surprise, urgency). A purely keyword-optimized title reads like a tag; a purely curiosity-driven title doesn't rank. Aim to include the core keyword in the first half and the hook in the second — or weave them together.</p>
            </div>
            <div className="yt-info-item">
              <p className="yt-info-title">Front-loading importance</p>
              <p className="yt-info-body">On mobile and in most feed contexts, only the first 6–8 words of your title are visible before truncation. This means your most compelling word, number, or keyword should appear at the very beginning — not after a clause, a qualifier, or a channel name.</p>
            </div>
            <div className="yt-info-item">
              <p className="yt-info-title">How YouTube detects clickbait</p>
              <p className="yt-info-body">YouTube's algorithm compares what your title promises against viewer satisfaction signals — primarily watch time and likes. Titles that attract clicks but don't deliver (high CTR, low retention) are penalized in the algorithm. Specific, honest titles perform better long-term than vague, sensational ones.</p>
            </div>
            <div className="yt-info-item">
              <p className="yt-info-title">The role of numbers</p>
              <p className="yt-info-body">Numbers in titles consistently outperform titles without them — they signal specificity, set clear expectations, and stand out visually in a text-heavy feed. Odd numbers (5, 7, 9) historically outperform even numbers, though the effect is modest. More important is that the number is specific and meaningful.</p>
            </div>
          </div>
        </div>

        {/* TIPS */}
        <div className="yt-card">
          <p className="yt-section-title">Title writing best practices</p>
          <div className="yt-tip-grid">
            <div>
              <p className="yt-tip-num">01</p>
              <p className="yt-tip-title">Write the title before the video</p>
              <p className="yt-tip-body">Your title should define what the video is, not describe what you made. Writing it first keeps you focused on delivering exactly what the title promises — which is what retention depends on. If you can't write a compelling title, the video concept may need refining.</p>
            </div>
            <div>
              <p className="yt-tip-num">02</p>
              <p className="yt-tip-title">Test with the A/B tool</p>
              <p className="yt-tip-body">Write at least two title options for every video and compare them here before publishing. Look at score differences by category — a title that scores lower overall but wins on CTR may outperform one with a better structure score, depending on your goals.</p>
            </div>
            <div>
              <p className="yt-tip-num">03</p>
              <p className="yt-tip-title">Update old titles</p>
              <p className="yt-tip-body">YouTube allows title editing after publishing, and changing a poorly performing title can revive a video that never got traction. Run your old titles through this tool and update any that score below 55. Add the current year to evergreen content to signal freshness.</p>
            </div>
            <div>
              <p className="yt-tip-num">04</p>
              <p className="yt-tip-title">Match the thumbnail</p>
              <p className="yt-tip-body">Your title and thumbnail are a unit. The strongest combinations show the same information in different formats — if the thumbnail shows a shocked face, the title explains why. If the thumbnail shows a result, the title creates the curiosity gap. Redundancy between the two weakens both.</p>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className="yt-card">
          <p className="yt-section-title">Related tools</p>
          <div className="yt-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="yt-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="yt-disclaimer">
            Scoring is based on established YouTube best practices and content performance research. Results are indicative only — actual video performance depends on many factors including thumbnail, topic, channel authority, and audience. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="yt-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}

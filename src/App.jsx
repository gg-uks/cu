import { useState, useEffect, useMemo } from 'react'
import './App.css'

const FIRST_MET = new Date('2026-06-06T00:00:00')
const START_DATE = new Date('2026-06-14T00:00:00')

const MILESTONES = [100, 200, 365, 500, 730, 1000]

function getDays() {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = now - START_DATE
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1
}

function formatDate(date) {
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function getMilestoneDate(n) {
  const d = new Date(START_DATE)
  d.setDate(d.getDate() + n - 1)
  return d
}

function getMilestoneLabel(n) {
  if (n === 365) return '1주년'
  if (n === 730) return '2주년'
  if (n === 1000) return '1000일'
  return `${n}일`
}

export default function App() {
  const [days, setDays] = useState(getDays)
  const [hearts, setHearts] = useState([])
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const timer = setInterval(() => setDays(getDays()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setHearts(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 5 + Math.random() * 5,
        size: 12 + Math.random() * 18,
        char: i % 3 === 0 ? '❤' : i % 3 === 1 ? '♥' : '💕',
      }))
    )
    setSparkles(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
        size: 3 + Math.random() * 5,
      }))
    )
  }, [])

  const nextMilestones = useMemo(() => {
    return MILESTONES.filter(m => m > days)
      .slice(0, 3)
      .map(m => ({
        n: m,
        label: getMilestoneLabel(m),
        date: getMilestoneDate(m),
        daysLeft: m - days,
      }))
  }, [days])

  const metDaysAgo = Math.floor((START_DATE - FIRST_MET) / (1000 * 60 * 60 * 24))

  return (
    <div className="app">
      {/* 떠다니는 하트 */}
      <div className="hearts-layer" aria-hidden="true">
        {hearts.map(h => (
          <span
            key={h.id}
            className="floating-heart"
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}px`,
            }}
          >
            {h.char}
          </span>
        ))}
      </div>

      {/* 반짝이 */}
      <div className="sparkles-layer" aria-hidden="true">
        {sparkles.map(s => (
          <span
            key={s.id}
            className="sparkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              width: `${s.size}px`,
              height: `${s.size}px`,
            }}
          />
        ))}
      </div>

      <main className="content">
        {/* 상단 뱃지 */}
        <div className="badge">
          <span className="badge-dot" />
          처음 만난 날로부터 {metDaysAgo + days - 1}일째
        </div>

        {/* 메인 카운터 */}
        <section className="counter-section">
          <p className="counter-label">우리가 사귄 지</p>
          <h1 className="counter">
            <span className="counter-d">D</span>
            <span className="counter-plus">+</span>
            <span className="counter-num">{days}</span>
          </h1>
          <p className="counter-since">{formatDate(START_DATE)} 시작 💕</p>
        </section>

        {/* 메시지 */}
        <p className="message">
          네 옆에 있는 매 순간이 행복해 🩷
        </p>

        {/* 다음 기념일 */}
        {nextMilestones.length > 0 && (
          <section className="milestones">
            <p className="milestones-title">다가오는 기념일</p>
            <div className="milestone-cards">
              {nextMilestones.map(m => (
                <div key={m.n} className="milestone-card">
                  <span className="milestone-label">{m.label}</span>
                  <span className="milestone-date">
                    {m.date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                  </span>
                  <span className="milestone-left">D-{m.daysLeft}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 처음 만난 날 */}
        <div className="first-met">
          <span className="first-met-icon">🤍</span>
          처음 만난 날 · {formatDate(FIRST_MET)}
        </div>
      </main>
    </div>
  )
}

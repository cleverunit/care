import { useMemo, useState } from 'react'
import {
  Activity, Bell, ChevronDown, CircleHelp, ClipboardPlus, Droplets,
  HeartPulse, LayoutDashboard, LogOut, Menu, Moon, Pill, Plus,
  Settings, Sparkles, Stethoscope, UserRound, X
} from 'lucide-react'

type FormData = {
  weight: string
  systolic: string
  diastolic: string
  glucose: string
  sleep: string
}

const navItems = [
  { label: '健康概览', icon: LayoutDashboard },
  { label: '健康档案', icon: UserRound },
  { label: '指标记录', icon: Activity },
  { label: '用药提醒', icon: Pill },
]

const initialData: FormData = {
  weight: '56.8', systolic: '118', diastolic: '76', glucose: '5.2', sleep: '7.5'
}

function App() {
  const [activeNav, setActiveNav] = useState('健康概览')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<FormData>(initialData)
  const [savedAt, setSavedAt] = useState('今天 08:20')

  const healthScore = useMemo(() => {
    const sleep = Number(form.sleep) || 0
    const glucose = Number(form.glucose) || 0
    const systolic = Number(form.systolic) || 0
    const base = 78 + (sleep >= 7 ? 4 : 0) + (glucose <= 6 ? 3 : 0) + (systolic <= 120 ? 3 : 0)
    return Math.min(base, 96)
  }, [form])

  const saveRecord = () => {
    setSavedAt('刚刚')
    setModalOpen(false)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${drawerOpen ? 'open' : ''}`}>
        <div className="brand"><div className="brand-mark"><HeartPulse size={22} /></div><span>知己健康</span><button className="mobile-close" onClick={() => setDrawerOpen(false)} aria-label="关闭菜单"><X size={19}/></button></div>
        <nav>
          <p className="nav-caption">健康管理</p>
          {navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label); setDrawerOpen(false) }}><Icon size={19}/><span>{label}</span></button>)}
          <p className="nav-caption lower">账户设置</p>
          <button className="nav-item"><Settings size={19}/><span>设置</span></button>
        </nav>
        <div className="profile-mini"><div className="avatar avatar-small">林</div><div><b>林小满</b><span>健康管理者</span></div><ChevronDown size={16}/></div>
      </aside>

      <main className="content">
        <header className="topbar">
          <button className="menu-button" onClick={() => setDrawerOpen(true)} aria-label="打开菜单"><Menu size={22}/></button>
          <div className="crumb"><span>健康管理</span><i>/</i><b>{activeNav}</b></div>
          <div className="top-actions"><button aria-label="帮助"><CircleHelp size={20}/></button><button className="bell" aria-label="消息"><Bell size={20}/><em></em></button><div className="avatar">林</div></div>
        </header>

        <section className="page-content">
          <div className="hero-row">
            <div><p className="eyebrow">2026 年 10 月 4 日，星期日</p><h1>早上好，林小满 <span>☀️</span></h1><p className="subtitle">照顾好自己，从关注每一个健康细节开始。</p></div>
            <button className="primary-button" onClick={() => setModalOpen(true)}><Plus size={19}/>记录健康数据</button>
          </div>

          <div className="summary-grid">
            <article className="score-card"><div className="card-label"><span>今日健康评分</span><Sparkles size={18}/></div><div className="score-main"><div className="ring" style={{ '--score': `${healthScore * 3.6}deg` } as React.CSSProperties}><strong>{healthScore}</strong><small>分</small></div><div><h2>状态很棒</h2><p>继续保持规律作息<br/>和均衡饮食</p></div></div><div className="score-footer"><span>较上周 <b>↑ 4 分</b></span><button>查看报告 <ChevronDown size={14}/></button></div></article>
            <article className="streak-card"><div className="streak-icon"><Moon size={22}/></div><div><p>连续健康打卡</p><h2>12 <small>天</small></h2><span>已超过 86% 的用户</span></div><div className="week-dots">{['一','二','三','四','五','六','日'].map((day, index) => <div key={day} className={index < 6 ? 'done' : 'today'}><i>{index < 6 ? '✓' : day}</i><small>{day}</small></div>)}</div></article>
          </div>

          <section className="section-heading"><div><h2>今日健康数据</h2><p>最后更新于 {savedAt}</p></div><button onClick={() => setModalOpen(true)}>查看全部 <ChevronDown size={16}/></button></section>
          <div className="metrics-grid">
            <Metric icon={<Activity size={20}/>} title="血压" value={`${form.systolic}/${form.diastolic}`} unit="mmHg" tag="正常" color="coral" note="理想范围内" />
            <Metric icon={<Droplets size={20}/>} title="血糖" value={form.glucose} unit="mmol/L" tag="正常" color="blue" note="空腹血糖" />
            <Metric icon={<HeartPulse size={20}/>} title="体重" value={form.weight} unit="kg" tag="稳定" color="purple" note="较昨日 -0.2 kg" />
            <Metric icon={<Moon size={20}/>} title="睡眠" value={form.sleep} unit="小时" tag="良好" color="yellow" note="深睡 1 小时 42 分" />
          </div>

          <div className="bottom-grid">
            <section className="trend-card"><div className="card-top"><div><h2>体重趋势</h2><p>近 7 天变化</p></div><button>最近 7 天 <ChevronDown size={15}/></button></div><div className="chart"><div className="y-axis"><span>58</span><span>57</span><span>56</span><span>55</span></div><svg viewBox="0 0 620 172" preserveAspectRatio="none" aria-label="体重趋势图"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#7668e8" stopOpacity=".22"/><stop offset="100%" stopColor="#7668e8" stopOpacity="0"/></linearGradient></defs><path d="M5 115 C55 108 76 120 108 100 S164 104 202 78 S270 92 306 73 S359 80 397 51 S451 69 489 40 S546 53 615 15 L615 170 L5 170Z" fill="url(#fill)"/><path d="M5 115 C55 108 76 120 108 100 S164 104 202 78 S270 92 306 73 S359 80 397 51 S451 69 489 40 S546 53 615 15" fill="none" stroke="#7565df" strokeWidth="3"/><circle cx="615" cy="15" r="5" fill="#fff" stroke="#7565df" strokeWidth="3"/></svg><div className="x-axis"><span>9/28</span><span>9/29</span><span>9/30</span><span>10/1</span><span>10/2</span><span>10/3</span><span>今天</span></div></div></section>
            <section className="reminder-card"><div className="card-top"><div><h2>用药提醒</h2><p>今天还有 2 项待完成</p></div><button><Plus size={17}/></button></div><div className="medicine"><div className="medicine-icon peach"><Pill size={18}/></div><div><b>维生素 D3</b><p>午餐后 · 1 粒</p></div><button className="check-button">完成</button></div><div className="medicine"><div className="medicine-icon lavender"><Pill size={18}/></div><div><b>钙片</b><p>晚餐后 · 1 片</p></div><button className="check-button">完成</button></div><button className="all-reminders">查看所有提醒 <ChevronDown size={15}/></button></section>
          </div>
        </section>
      </main>

      {modalOpen && <div className="modal-backdrop" onMouseDown={() => setModalOpen(false)}><form className="record-modal" onMouseDown={event => event.stopPropagation()} onSubmit={event => { event.preventDefault(); saveRecord() }}><div className="modal-title"><div><p className="eyebrow">健康记录</p><h2>录入今日数据</h2></div><button type="button" onClick={() => setModalOpen(false)} aria-label="关闭"><X size={20}/></button></div><div className="form-grid"><Field label="体重" unit="kg" value={form.weight} field="weight" setForm={setForm}/><Field label="收缩压" unit="mmHg" value={form.systolic} field="systolic" setForm={setForm}/><Field label="舒张压" unit="mmHg" value={form.diastolic} field="diastolic" setForm={setForm}/><Field label="空腹血糖" unit="mmol/L" value={form.glucose} field="glucose" setForm={setForm}/><Field label="睡眠时长" unit="小时" value={form.sleep} field="sleep" setForm={setForm}/></div><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>取消</button><button className="primary-button" type="submit"><ClipboardPlus size={18}/>保存记录</button></div></form></div>}
    </div>
  )
}

function Metric({ icon, title, value, unit, tag, color, note }: { icon: React.ReactNode; title: string; value: string; unit: string; tag: string; color: string; note: string }) {
  return <article className="metric-card"><div className={`metric-icon ${color}`}>{icon}</div><div className="metric-content"><div className="metric-title"><span>{title}</span><b>{tag}</b></div><div className="metric-value">{value}<small>{unit}</small></div><p>{note}</p></div></article>
}

function Field({ label, unit, value, field, setForm }: { label: string; unit: string; value: string; field: keyof FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  return <label className="field"><span>{label}</span><div><input inputMode="decimal" value={value} onChange={event => setForm(current => ({ ...current, [field]: event.target.value }))}/><i>{unit}</i></div></label>
}

export default App

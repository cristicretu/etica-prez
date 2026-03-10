import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Mic, Layout, Users, BarChart3, Target, PieChart, 
  TrendingUp, CheckCircle2, Zap, Shield, Clock, DollarSign, Award, Layers,
  ArrowRight, Globe, Building2, UserCheck, Briefcase, Database, Cpu, HeartPulse
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    // SLIDE 1: Title
    {
      id: 'title',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="w-36 h-36 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/30">
              <Mic size={72} className="text-white" strokeWidth={1.5} />
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center"
            >
              <Zap size={16} className="text-white" />
            </motion.div>
          </motion.div>
          
          <div className="space-y-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-8xl font-black tracking-tight text-zinc-900"
            >
              MaxOn<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">Scribe</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-zinc-500 font-medium max-w-3xl mx-auto"
            >
              AI-Powered Medical Documentation for Romanian Healthcare
            </motion.p>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-8 pt-4"
          >
            {[
              { icon: Mic, label: "Voice-to-Text" },
              { icon: Cpu, label: "AI Extraction" },
              { icon: Globe, label: "Romanian Native" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-zinc-400">
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      )
    },

    // SLIDE 2: Market Description - TAM/SAM/SOM
    {
      id: 'market-size',
      title: "MARKET OPPORTUNITY",
      subtitle: "€187M Total Addressable Market",
      content: (
        <div className="grid grid-cols-5 gap-8 h-full items-center">
          {/* Left: TAM/SAM/SOM Funnel */}
          <div className="col-span-2 flex flex-col justify-center space-y-8">
            {[
              { 
                label: "TAM", 
                name: "Total Addressable", 
                value: "€187M", 
                desc: "All Romanian healthcare providers",
                color: "from-indigo-500 to-indigo-600"
              },
              { 
                label: "SAM", 
                name: "Serviceable Available", 
                value: "€56M", 
                desc: "Private sector + progressive public",
                color: "from-violet-500 to-violet-600"
              },
              { 
                label: "SOM", 
                name: "Serviceable Obtainable", 
                value: "€9.4M", 
                desc: "Year 3 realistic capture",
                color: "from-fuchsia-500 to-fuchsia-600"
              }
            ].map((tier, i) => (
              <motion.div
                key={tier.label}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                className="w-full"
              >
                <div className={cn(
                  "p-7 rounded-2xl bg-gradient-to-r text-white shadow-lg",
                  tier.color
                )}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-black tracking-wide">{tier.label}</span>
                        <span className="text-sm font-semibold opacity-80">{tier.name}</span>
                      </div>
                      <p className="text-sm opacity-85 leading-relaxed">{tier.desc}</p>
                    </div>
                    <span className="text-4xl font-black shrink-0">{tier.value}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Market Breakdown */}
          <div className="col-span-3 space-y-6">
            <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-800 mb-6 flex items-center gap-2">
                <PieChart className="text-indigo-500" size={20} />
                Market Segmentation
              </h3>
              <div className="space-y-4">
                {[
                  { segment: "Individual Physicians", count: "65,000", potential: "€93.6M", pct: 50, color: "bg-indigo-500" },
                  { segment: "Private Clinics", count: "7,000", potential: "€50.4M", pct: 27, color: "bg-violet-500" },
                  { segment: "Hospital Departments", count: "1,200", potential: "€43.2M", pct: 23, color: "bg-fuchsia-500" }
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={cn("w-3 h-3 rounded-full", row.color)} />
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-semibold text-zinc-800">{row.segment}</span>
                        <span className="text-sm text-zinc-500">{row.count} units</span>
                      </div>
                      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${row.pct}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                          className={cn("h-full rounded-full", row.color)}
                        />
                      </div>
                    </div>
                    <span className="font-bold text-zinc-900 w-20 text-right">{row.potential}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Market Growth</p>
                <p className="text-3xl font-black text-emerald-700">12.4%</p>
                <p className="text-sm text-emerald-600 mt-1">CAGR 2024-2028</p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Digitization Push</p>
                <p className="text-3xl font-black text-amber-700">€2.1B</p>
                <p className="text-sm text-amber-600 mt-1">EU Healthcare Funds RO</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 3: Market Segmentation Deep Dive
    {
      id: 'segmentation',
      title: "CUSTOMER SEGMENTATION",
      subtitle: "Distinct Needs, Unified Solution",
      content: (
        <div className="grid grid-cols-3 gap-6 h-full">
          {[
            {
              segment: "Solo Practitioners",
              icon: UserCheck,
              size: "65,000",
              avgRevenue: "€12/mo",
              distinctives: [
                "Time-starved (8+ patients/day)",
                "Price-sensitive (self-funded)",
                "Mobile-first workflow",
                "Zero IT support"
              ],
              needs: "Instant ROI, zero learning curve",
              trigger: "Missed family time due to paperwork",
              color: "indigo"
            },
            {
              segment: "Specialists",
              icon: HeartPulse,
              size: "12,000",
              avgRevenue: "€25/mo",
              distinctives: [
                "Complex terminology",
                "High documentation stakes",
                "Research/academic needs",
                "Willing to pay premium"
              ],
              needs: "Specialty templates + precision",
              trigger: "Malpractice risk from poor records",
              color: "violet"
            },
            {
              segment: "Private Clinics",
              icon: Building2,
              size: "7,000",
              avgRevenue: "€200/mo",
              distinctives: [
                "Multi-physician coordination",
                "Brand consistency required",
                "Compliance-focused",
                "Has IT decision maker"
              ],
              needs: "Standardization + admin dashboard",
              trigger: "Staff turnover from burnout",
              color: "fuchsia"
            }
          ].map((card, i) => (
            <motion.div
              key={card.segment}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-zinc-100 p-7 shadow-sm flex flex-col"
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-5",
                card.color === "indigo" && "bg-indigo-100 text-indigo-600",
                card.color === "violet" && "bg-violet-100 text-violet-600",
                card.color === "fuchsia" && "bg-fuchsia-100 text-fuchsia-600"
              )}>
                <card.icon size={28} />
              </div>

              <h3 className="text-xl font-bold text-zinc-900 mb-1">{card.segment}</h3>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm text-zinc-500">{card.size} units</span>
                <span className="text-xs px-2 py-0.5 bg-zinc-100 rounded-full font-medium">{card.avgRevenue} avg</span>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Distinctive Elements</p>
                  <ul className="space-y-1.5">
                    {card.distinctives.map((d, j) => (
                      <li key={j} className="text-sm text-zinc-600 flex items-start gap-2">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                          card.color === "indigo" && "bg-indigo-400",
                          card.color === "violet" && "bg-violet-400",
                          card.color === "fuchsia" && "bg-fuchsia-400"
                        )} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={cn(
                  "p-4 rounded-xl",
                  card.color === "indigo" && "bg-indigo-50",
                  card.color === "violet" && "bg-violet-50",
                  card.color === "fuchsia" && "bg-fuchsia-50"
                )}>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Core Need</p>
                  <p className={cn(
                    "text-sm font-semibold",
                    card.color === "indigo" && "text-indigo-700",
                    card.color === "violet" && "text-violet-700",
                    card.color === "fuchsia" && "text-fuchsia-700"
                  )}>{card.needs}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100">
                <p className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">Switch Trigger</p>
                <p className="text-sm text-zinc-600 italic">"{card.trigger}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },

    // SLIDE 4: Competitive Analysis Matrix
    {
      id: 'competition',
      title: "COMPETITIVE LANDSCAPE",
      subtitle: "Blue Ocean in Romanian Healthcare",
      content: (
        <div className="space-y-8 h-full">
          {/* Competitive Matrix Table */}
          <div className="bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="text-left p-4 text-sm font-bold text-zinc-500">Feature</th>
                  <th className="text-center p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center mb-1">
                        <Mic size={18} className="text-white" />
                      </div>
                      <span className="text-sm font-bold text-zinc-900">MaxOnScribe</span>
                    </div>
                  </th>
                  <th className="text-center p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-zinc-200 rounded-xl flex items-center justify-center mb-1 text-zinc-500 text-xs font-bold">DM</div>
                      <span className="text-sm font-bold text-zinc-600">Dragon Medical</span>
                    </div>
                  </th>
                  <th className="text-center p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-zinc-200 rounded-xl flex items-center justify-center mb-1 text-zinc-500 text-xs font-bold">MS</div>
                      <span className="text-sm font-bold text-zinc-600">Manual/Secretary</span>
                    </div>
                  </th>
                  <th className="text-center p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-zinc-200 rounded-xl flex items-center justify-center mb-1 text-zinc-500 text-xs font-bold">STT</div>
                      <span className="text-sm font-bold text-zinc-600">Generic STT</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { feature: "Romanian Medical Terms", us: "★★★★★", dragon: "★★☆☆☆", manual: "★★★★☆", generic: "★☆☆☆☆" },
                  { feature: "Price/Month", us: "€12", dragon: "€150+", manual: "€400+", generic: "€0-20" },
                  { feature: "HIPAA-Compliant Coding", us: "✓", dragon: "✓", manual: "✗", generic: "✗" },
                  { feature: "Setup Time", us: "5 min", dragon: "2 weeks", manual: "N/A", generic: "30 min" },
                  { feature: "Specialty Templates", us: "✓", dragon: "✓", manual: "✗", generic: "✗" },
                  { feature: "GDPR Local Storage", us: "✓", dragon: "✗", manual: "✓", generic: "✗" },
                  { feature: "Real-time Processing", us: "✓", dragon: "✓", manual: "✗", generic: "✓" }
                ].map((row, i) => (
                  <tr key={i} className={cn("border-b border-zinc-50", i % 2 === 0 && "bg-zinc-50/50")}>
                    <td className="p-4 font-medium text-zinc-700">{row.feature}</td>
                    <td className="p-4 text-center font-bold text-indigo-600">{row.us}</td>
                    <td className="p-4 text-center text-zinc-500">{row.dragon}</td>
                    <td className="p-4 text-center text-zinc-500">{row.manual}</td>
                    <td className="p-4 text-center text-zinc-500">{row.generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key Industry Elements */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Regulatory", value: "HIPAA-Compliant", desc: "Healthcare standards", icon: Shield },
              { label: "Trend", value: "Digital-First", desc: "Post-COVID acceleration", icon: TrendingUp },
              { label: "Barrier", value: "Trust", desc: "Data sensitivity", icon: Award },
              { label: "Opportunity", value: "Fragmentation", desc: "No clear leader", icon: Layers }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-zinc-800 rounded-2xl p-5 text-white"
              >
                <item.icon size={20} className="text-indigo-400 mb-3" />
                <p className="text-xs text-zinc-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-lg font-bold mt-1">{item.value}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },

    // SLIDE 5: Value Proposition Deep Dive
    {
      id: 'value-prop',
      title: "VALUE PROPOSITION",
      subtitle: "Solving Real Pain Points",
      content: (
        <div className="space-y-6 h-full flex flex-col">
          {/* Top: Functional Benefits */}
          <div className="bg-white rounded-3xl border border-zinc-100 p-7 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-800 mb-5 flex items-center gap-2">
              <Zap className="text-amber-500" size={20} />
              Functional Benefits
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { benefit: "70% Time Reduction", detail: "From 45min to 12min per patient documentation" },
                { benefit: "HIPAA-Compliant Coding", detail: "Diagnosis codes extracted in real-time" },
                { benefit: "Professional DOCX Export", detail: "Print-ready, legally compliant records" },
                { benefit: "98% Medical Accuracy", detail: "Romanian terminology fine-tuned" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="font-semibold text-zinc-800">{item.benefit}</p>
                    <p className="text-sm text-zinc-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Two columns - Fears & Substitutes */}
          <div className="grid grid-cols-2 gap-6 flex-1">
            <div className="bg-rose-50 rounded-3xl p-7 border border-rose-100 h-full">
              <h3 className="text-lg font-bold text-rose-800 mb-5 flex items-center gap-2">
                <Shield size={20} />
                Addressing Customer Fears
              </h3>
              <div className="space-y-3">
                {[
                  { fear: "Data Privacy", response: "100% GDPR compliant, EU servers, encrypted" },
                  { fear: "Learning Curve", response: "5-minute onboarding, speak naturally" },
                  { fear: "Accuracy Doubts", response: "Free tier to validate before committing" },
                  { fear: "Vendor Lock-in", response: "Export all data anytime, your records" }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-3">
                    <p className="font-semibold text-rose-700 text-sm">"{item.fear}"</p>
                    <p className="text-sm text-zinc-600 mt-1 flex items-start gap-2">
                      <ArrowRight size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      {item.response}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-800 rounded-3xl p-7 text-white h-full">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                <Target size={20} className="text-amber-400" />
                vs. Substitutes & Inertia
              </h3>
              <div className="space-y-3">
                {[
                  { sub: "Hiring a Secretary", counter: "10x cheaper, no sick days, instant" },
                  { sub: "Manual Typing", counter: "Voice is 3x faster than typing" },
                  { sub: "Generic Voice Apps", counter: "Can't extract medical data automatically" },
                  { sub: "Doing Nothing", counter: "Burnout is real—we're the painkiller" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl p-6">
                    <span className="text-zinc-400 text-sm line-through">{item.sub}</span>
                    <span className="text-emerald-400 text-sm font-medium">{item.counter}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 6: Business Model Canvas
    {
      id: 'business-model',
      title: "BUSINESS MODEL",
      subtitle: "Lean, Scalable Architecture",
      content: (
        <div className="flex flex-col gap-6 h-full text-sm">
          {/* First Row: Value Proposition - Full Width */}
          <div className="bg-gradient-to-r from-indigo-500 via-violet-500 to-violet-600 text-white rounded-3xl p-8 flex items-center justify-center text-center">
            <div className="flex items-center gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-2">Value Proposition</h4>
                <p className="text-indigo-100 text-lg leading-relaxed">
                  Transform Romanian medical consultations into professional, compliant documentation in seconds.
                </p>
                <div className="mt-3 text-sm text-indigo-200">
                  Save 70% time • HIPAA-Compliant • GDPR Safe
                </div>
              </div>
            </div>
          </div>

          {/* Second Row: Other Segments as Squares */}
          <div className="grid grid-cols-6 gap-4 flex-1">
            {/* Key Partners */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-bold text-zinc-600 uppercase tracking-wider mb-3">Key Partners</p>
              <ul className="space-y-2">
                {["Groq (Free AI inference)", "Gemini Pro (Extraction)", "Convex (Backend)", "Hetzner (EU Hosting)"].map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-700 text-sm">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Activities */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-bold text-zinc-600 uppercase tracking-wider mb-3">Key Activities</p>
              <ul className="space-y-2">
                {["Romanian AI Training", "Specialty Template Dev", "User Support", "Security Compliance"].map((a, i) => (
                  <li key={i} className="text-zinc-700 flex items-start gap-2 text-sm">
                    <Zap size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Relationships */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-bold text-zinc-600 uppercase tracking-wider mb-3">Customer Relationships</p>
              <ul className="space-y-2">
                {["Self-service SaaS", "In-app tutorials", "Email support", "Medical webinars"].map((r, i) => (
                  <li key={i} className="text-zinc-700 flex items-start gap-2 text-sm">
                    <Users size={14} className="text-violet-500 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Channels */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-bold text-zinc-600 uppercase tracking-wider mb-3">Channels</p>
              <ul className="space-y-2">
                {["Direct Web (SEO)", "Medical Congresses", "Doctor Referrals", "LinkedIn Ads"].map((c, i) => (
                  <li key={i} className="text-zinc-700 flex items-start gap-2 text-sm">
                    <Globe size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Resources */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-bold text-zinc-600 uppercase tracking-wider mb-3">Key Resources</p>
              <ul className="space-y-2">
                {["Romanian Medical Corpus", "Fine-tuned ASR Model", "Template Library", "Dev Team (2)"].map((r, i) => (
                  <li key={i} className="text-zinc-700 flex items-start gap-2 text-sm">
                    <Database size={14} className="text-zinc-500 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Segments */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-bold text-zinc-600 uppercase tracking-wider mb-3">Customer Segments</p>
              <ul className="space-y-2">
                {["Solo Practitioners", "Specialists", "Private Clinics", "Hospital Depts"].map((s, i) => (
                  <li key={i} className="text-zinc-700 flex items-start gap-2 text-sm">
                    <UserCheck size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Third Row: Cost and Revenue */}
          <div className="grid grid-cols-2 gap-4">
            {/* Cost Structure */}
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
            <p className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-3">Cost Structure</p>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-zinc-700"><strong>Fixed:</strong> €200/mo (infra + marketing)</p>
                <p className="text-zinc-700"><strong>Variable:</strong> €0.02/transcription (Gemini extraction)</p>
                <p className="text-zinc-700"><strong>CAC:</strong> €35 estimated (organic + paid mix)</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-rose-700">€250</p>
                <p className="text-xs text-rose-500">Monthly Burn</p>
              </div>
            </div>
          </div>

            {/* Revenue Streams */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">Revenue Streams</p>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-zinc-200 rounded text-xs font-bold">FREE</span>
                  <span className="text-zinc-600">5 docs/mo — lead gen</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-indigo-500 text-white rounded text-xs font-bold">PRO</span>
                  <span className="text-zinc-600">€12/mo — unlimited</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-violet-600 text-white rounded text-xs font-bold">CLINIC</span>
                  <span className="text-zinc-600">€200/mo — 20 seats + admin</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-700">~90%</p>
                <p className="text-xs text-emerald-600">Gross Margin</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      )
    },

    // SLIDE 7: Unit Economics & Financial Projections
    {
      id: 'financials',
      title: "FINANCIAL PROJECTIONS",
      subtitle: "Path to Profitability",
      content: (
        <div className="space-y-6 h-full">
          {/* Unit Economics Row */}
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: "CAC", value: "€35", sub: "Cost to Acquire", color: "bg-rose-500" },
              { label: "ARPU", value: "€14", sub: "Avg Revenue/User", color: "bg-indigo-500" },
              { label: "Gross Margin", value: "90%", sub: "After variable costs", color: "bg-emerald-500" },
              { label: "LTV", value: "€252", sub: "18mo avg lifetime", color: "bg-violet-500" },
              { label: "LTV:CAC", value: "7.2x", sub: "Healthy ratio", color: "bg-amber-500" }
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm text-center"
              >
                <div className={cn("w-3 h-3 rounded-full mx-auto mb-3", metric.color)} />
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{metric.label}</p>
                <p className="text-3xl font-black text-zinc-900 mt-1">{metric.value}</p>
                <p className="text-xs text-zinc-500 mt-1">{metric.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* 3-Year Projection Table */}
          <div className="bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800 text-white">
                  <th className="text-left p-4 text-sm font-bold">Metric</th>
                  <th className="text-center p-4 text-sm font-bold">Year 1</th>
                  <th className="text-center p-4 text-sm font-bold">Year 2</th>
                  <th className="text-center p-4 text-sm font-bold">Year 3</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { metric: "Paying Users", y1: "500", y2: "2,500", y3: "8,000", highlight: false },
                  { metric: "MRR", y1: "€7,000", y2: "€35,000", y3: "€112,000", highlight: true },
                  { metric: "ARR", y1: "€84,000", y2: "€420,000", y3: "€1.34M", highlight: true },
                  { metric: "Monthly Costs", y1: "€3,500", y2: "€12,000", y3: "€35,000", highlight: false },
                  { metric: "Net Margin", y1: "50%", y2: "66%", y3: "69%", highlight: false },
                  { metric: "Net Profit/mo", y1: "€3,500", y2: "€23,000", y3: "€77,000", highlight: true }
                ].map((row, i) => (
                  <tr key={i} className={cn(
                    "border-b border-zinc-50",
                    row.highlight && "bg-emerald-50"
                  )}>
                    <td className={cn("p-4 font-medium", row.highlight ? "text-emerald-800" : "text-zinc-700")}>{row.metric}</td>
                    <td className="p-4 text-center text-zinc-600">{row.y1}</td>
                    <td className="p-4 text-center text-zinc-600">{row.y2}</td>
                    <td className={cn("p-4 text-center font-bold", row.highlight ? "text-emerald-700" : "text-zinc-800")}>{row.y3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Break-even & Growth */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider opacity-70">Break-even Point</p>
              <p className="text-4xl font-black mt-2">70 Users</p>
              <p className="text-sm mt-2 opacity-80">Projected in 4-6 months</p>
            </div>
            <div className="bg-zinc-800 rounded-2xl p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Payback Period</p>
              <p className="text-4xl font-black mt-2">2.5 mo</p>
              <p className="text-sm mt-2 text-zinc-400">CAC recovered quickly</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider opacity-70">Y3 Market Share</p>
              <p className="text-4xl font-black mt-2">9.5%</p>
              <p className="text-sm mt-2 opacity-80">Of SAM captured</p>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 8: Customer Acquisition Funnel
    {
      id: 'acquisition',
      title: "GROWTH ENGINE",
      subtitle: "Freemium Conversion Funnel",
      content: (
        <div className="grid grid-cols-2 gap-8 h-full items-start">
          {/* Funnel Visualization */}
          <div className="flex flex-col justify-center space-y-4 h-full">
            {[
              { stage: "Awareness", count: "10,000", rate: "100%", color: "from-zinc-400 to-zinc-500", width: "100%" },
              { stage: "Website Visit", count: "3,000", rate: "30%", color: "from-blue-400 to-blue-500", width: "85%" },
              { stage: "Free Signup", count: "600", rate: "20%", color: "from-indigo-400 to-indigo-500", width: "70%" },
              { stage: "Active Free User", count: "300", rate: "50%", color: "from-violet-400 to-violet-500", width: "55%" },
              { stage: "Paid Conversion", count: "75", rate: "25%", color: "from-emerald-400 to-emerald-500", width: "40%" }
            ].map((stage, i) => (
              <motion.div
                key={i}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                style={{ width: stage.width }}
                className="mx-auto"
              >
                <div className={cn(
                  "bg-gradient-to-r text-white rounded-xl p-4 flex items-start justify-between",
                  stage.color
                )}>
                  <div>
                    <p className="text-xs font-bold opacity-70">{stage.stage}</p>
                    <p className="text-2xl font-black">{stage.count}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{stage.rate}</p>
                    <p className="text-xs opacity-70">conv. rate</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Acquisition Channels */}
          <div className="flex flex-col justify-center h-full">
            <div className="bg-white rounded-3xl border border-zinc-100 p-7 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-800 mb-6">Acquisition Channels</h3>
              <div className="space-y-4">
                {[
                  { channel: "Organic SEO", pct: 40, cac: "€15", desc: "Romanian medical + documentation keywords" },
                  { channel: "Doctor Referrals", pct: 25, cac: "€0", desc: "Built-in sharing incentive" },
                  { channel: "Medical Congresses", pct: 20, cac: "€50", desc: "Live demos, QR signups" },
                  { channel: "LinkedIn Ads", pct: 15, cac: "€65", desc: "Targeted physician audiences" }
                ].map((ch, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 text-right">
                      <span className="text-lg font-bold text-indigo-600">{ch.pct}%</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-zinc-800">{ch.channel}</span>
                        <span className="text-sm text-zinc-500">CAC: {ch.cac}</span>
                      </div>
                      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden mt-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${ch.pct}%` }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="h-full bg-indigo-500 rounded-full"
                        />
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">{ch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 9: Roadmap & Conclusion
    {
      id: 'conclusion',
      title: "EXECUTION ROADMAP",
      subtitle: "From MVP to Market Leader",
      content: (
        <div className="space-y-14 h-full">
          {/* Timeline */}
          <div className="relative mt-16">
            <div className="absolute top-6 left-0 w-full h-1 bg-zinc-200 rounded-full" />
            <div className="grid grid-cols-4 gap-4 relative mt-16">
              {[
                { phase: "Q1 2026", title: "Launch MVP", items: ["Free tier live", "Cardiology focus", "10 beta users"], status: "active" },
                { phase: "Q2 2026", title: "Product-Market Fit", items: ["100 paying users", "3 specialties", "Break-even"], status: "next" },
                { phase: "Q3-Q4 2026", title: "Scale", items: ["1,000 users", "Clinic tier", "Mobile app"], status: "future" },
                { phase: "2027", title: "Expansion", items: ["Balkan markets", "EMR integration", "Series A"], status: "future" }
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center relative z-10",
                    phase.status === "active" && "bg-gradient-to-br from-indigo-500 to-violet-600 text-white",
                    phase.status === "next" && "bg-indigo-100 text-indigo-600 border-2 border-indigo-300",
                    phase.status === "future" && "bg-zinc-100 text-zinc-400"
                  )}>
                    {i + 1}
                  </div>
                  <p className={cn(
                    "text-xs font-bold uppercase tracking-wider mb-1",
                    phase.status === "active" ? "text-indigo-600" : "text-zinc-400"
                  )}>{phase.phase}</p>
                  <p className="font-bold text-zinc-800 mb-3">{phase.title}</p>
                  <ul className="space-y-1 text-sm text-zinc-500">
                    {phase.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Metrics Summary */}
          <div className="grid grid-cols-5 gap-4 top-12">
            {[
              { label: "TAM", value: "€187M", icon: PieChart },
              { label: "Break-even", value: "70 users", icon: Target },
              { label: "LTV:CAC", value: "7.2x", icon: TrendingUp },
              { label: "Y3 ARR", value: "€1.34M", icon: BarChart3 },
              { label: "Y3 Margin", value: "69%", icon: DollarSign }
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-800 rounded-2xl p-5 text-white text-center">
                <stat.icon size={20} className="mx-auto mb-2 text-indigo-400" />
                <p className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

        </div>
      )
    }
  ];

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide, slides.length]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98
    })
  };

  return (
    <div className="fixed inset-0 bg-[#fafafa] flex flex-col items-center justify-center selection:bg-indigo-100 selection:text-indigo-700 font-[system-ui]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-30%] left-[-15%] w-[60%] h-[60%] bg-indigo-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[60%] h-[60%] bg-violet-50/50 rounded-full blur-[120px]" />
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-zinc-100 z-50">
        <motion.div 
          initial={false}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
        />
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl aspect-[16/9] px-12 z-10">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", ease: "easeOut", duration: 0.25 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.25 }
            }}
            className="w-full h-full flex flex-col"
          >
            {/* Header */}
            {currentSlide > 0 && slides[currentSlide].title && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 shrink-0"
              >
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-500 mb-2">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-4xl font-bold text-zinc-800 tracking-tight">
                  {slides[currentSlide].subtitle}
                </p>
              </motion.div>
            )}

            {/* Content */}
            <div className="flex-1 min-h-0">
              {slides[currentSlide].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 w-full px-12 flex items-center justify-between z-20">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-zinc-500">{String(currentSlide + 1).padStart(2, '0')}</span>
            <div className="w-8 h-px bg-zinc-300" />
            <span className="text-sm text-zinc-400">{String(slides.length).padStart(2, '0')}</span>
          </div>
          
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentSlide ? 1 : -1);
                  setCurrentSlide(i);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  i === currentSlide ? "w-6 bg-indigo-500" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;


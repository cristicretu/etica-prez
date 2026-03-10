import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ChevronLeft, ChevronRight, Mic, Layout, Users, BarChart3, Target, PieChart,
	TrendingUp, CheckCircle2, Zap, Shield, Clock, DollarSign, Award, Layers,
	ArrowRight, Globe, Building2, UserCheck, Briefcase, Database, Cpu, HeartPulse,
	FileText, AlertCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Slide metadata - update this when adding/removing slides
export const SLIDE_INFO = [
	{ id: 'title', name: 'Title' },
	{ id: 'problem', name: 'The Problem' },
	{ id: 'market', name: 'Market Opportunity' },
	{ id: 'competition', name: 'Competition' },
	{ id: 'value-prop', name: 'Value Proposition' },
	{ id: 'financials', name: 'Business Model' },
	{ id: 'technology', name: 'AI Architecture' },
];
export const TOTAL_SLIDES = SLIDE_INFO.length;

const Presentation = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [direction, setDirection] = useState(0);
	const [ws, setWs] = useState<WebSocket | null>(null);
	const [networkIP, setNetworkIP] = useState<string>('');

	// WebSocket connection for remote control
	useEffect(() => {
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		const socket = new WebSocket(`${protocol}//${window.location.host}/ws`);
		
		socket.onopen = () => {
			setWs(socket);
		};
		
		socket.onmessage = (event) => {
			try {
				const msg = JSON.parse(event.data);
				if (msg.type === 'next') {
					setDirection(1);
					setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1));
				} else if (msg.type === 'prev') {
					setDirection(-1);
					setCurrentSlide((prev) => Math.max(prev - 1, 0));
				} else if (msg.type === 'sync') {
					// Clamp slide index to valid range
					const newSlide = Math.max(0, Math.min(msg.slide, TOTAL_SLIDES - 1));
					// Use functional update to get correct direction
					setCurrentSlide((prev) => {
						// Only update direction if slide actually changed
						if (newSlide !== prev) {
							setDirection(newSlide > prev ? 1 : -1);
						}
						return newSlide;
					});
					if (msg.ip) {
						setNetworkIP(msg.ip);
					}
				}
			} catch (e) {
				console.error('WS parse error:', e);
			}
		};
		
		socket.onclose = () => {
			setWs(null);
		};
		
		return () => {
			socket.close();
		};
	}, []);

	// Sync current slide to server when it changes locally
	useEffect(() => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({ type: 'goto', slide: currentSlide }));
		}
	}, [currentSlide, ws]);

	const slides = [
		// SLIDE 1: Title
		{
			id: 'title',
			content: (
				<div className="flex flex-col items-center justify-center h-full text-center space-y-12">
					<motion.div
						initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
						animate={{ scale: 1, opacity: 1, rotate: 0 }}
						transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
						className="relative"
					>
						<div className="w-44 h-44 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-500/30">
							<Mic size={88} className="text-white" strokeWidth={1.5} />
						</div>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
							className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center"
						>
							<Zap size={20} className="text-white" />
						</motion.div>
					</motion.div>

					<div className="space-y-6">
						<motion.h1
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="text-9xl font-black tracking-tight text-zinc-900"
						>
							MaxOn<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">Scribe</span>
						</motion.h1>
						<motion.p
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3 }}
							className="text-3xl text-zinc-500 font-medium max-w-4xl mx-auto"
						>
							AI-Powered Medical Documentation for Romanian Healthcare
						</motion.p>
					</div>

					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="flex items-center gap-12 pt-6"
					>
						{[
							{ icon: Mic, label: "Voice-to-Text" },
							{ icon: Cpu, label: "AI Extraction" },
							{ icon: Globe, label: "Romanian Native" }
						].map((item, i) => (
							<div key={i} className="flex items-center gap-3 text-zinc-500">
								<item.icon size={24} />
								<span className="font-semibold text-xl">{item.label}</span>
							</div>
						))}
					</motion.div>
				</div>
			)
		},

		// SLIDE 2: The Problem
		{
			id: 'problem',
			title: "THE REALITY",
			subtitle: "Healthcare is drowning in paperwork",
			content: (
				<div className="flex flex-col items-center justify-center h-full max-w-5xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="text-center space-y-16"
					>
						<div className="space-y-6">
							<p className="text-5xl font-medium text-zinc-800 leading-tight">
								Romanian doctors spend <span className="text-rose-500 font-bold">2.1 hours per day</span> on <span className='font-extrabold'>paperwork</span>.
							</p>
						</div>

						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
							className="bg-zinc-900 text-white py-8 px-12 rounded-3xl inline-block shadow-xl"
						>
							<p className="text-6xl font-black tracking-tight">
								That's 700+ hours a year.
							</p>
						</motion.div>

						<div className="grid grid-cols-3 gap-8 text-3xl font-bold text-zinc-400 pt-8">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 2.5 }}
								className="flex flex-col items-center gap-4"
							>
								<HeartPulse size={48} className="text-zinc-300" />
								<span className="line-through decoration-rose-400 decoration-4">Not healing.</span>
							</motion.div>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 3.5 }}
								className="flex flex-col items-center gap-4"
							>
								<UserCheck size={48} className="text-zinc-300" />
								<span className="line-through decoration-rose-400 decoration-4">Not diagnosing.</span>
							</motion.div>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 4.5 }}
								className="flex flex-col items-center gap-4"
							>
								<FileText size={48} className="text-indigo-500" />
								<span className="text-indigo-600">Typing.</span>
							</motion.div>
						</div>
					</motion.div>
				</div>
			)
		},

		// SLIDE 3: Market
		{
			id: 'market',
			title: "MARKET OPPORTUNITY",
			subtitle: "From small to big, everybody benefits",
			content: (
				<div className="grid grid-cols-2 gap-10 h-full">
					{/* Left: TAM/SAM/SOM */}
					<div className="flex flex-col h-full gap-6">
						<div className="flex-1 flex flex-col justify-between">
							{[
								{ label: "TAM", value: "€187M", desc: "All Romanian healthcare providers", color: "from-indigo-500 to-indigo-600" },
								{ label: "SAM", value: "€56M", desc: "Private + progressive public sector", color: "from-violet-500 to-violet-600" },
								{ label: "SOM", value: "€9.4M", desc: "Year 3 realistic capture", color: "from-fuchsia-500 to-fuchsia-600" }
							].map((tier, i) => (
								<motion.div
									key={tier.label}
									initial={{ x: -30, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: i * 0.1 }}
									className={cn("p-8 rounded-2xl bg-gradient-to-r text-white shadow-lg", tier.color)}
								>
									<div className="flex items-center justify-between">
										<div>
											<span className="text-2xl font-black tracking-wide">{tier.label}</span>
											<p className="text-lg opacity-80 mt-1">{tier.desc}</p>
										</div>
										<span className="text-5xl font-black">{tier.value}</span>
									</div>
								</motion.div>
							))}
						</div>

						<div className="grid grid-cols-2 gap-5">
							<div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
								<p className="text-5xl font-black text-emerald-700">12.4%</p>
								<p className="text-lg text-emerald-600 font-medium mt-2">CAGR Growth</p>
							</div>
							<div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
								<p className="text-5xl font-black text-amber-700">€400M</p>
								<p className="text-lg text-amber-600 font-medium mt-2">EU Digital Funds</p>
							</div>
						</div>
					</div>

					{/* Right: Customer Segments */}
					<div className="flex flex-col h-full gap-5">
						{[
							{
								segment: "Solo Practitioners",
								icon: UserCheck,
								size: "65,000",
								price: "€12/mo",
								trigger: "Missed family time due to paperwork",
								color: "indigo"
							},
							{
								segment: "Specialists",
								icon: HeartPulse,
								size: "12,000",
								price: "€25/mo",
								trigger: "Malpractice risk from incomplete records",
								color: "violet"
							},
							{
								segment: "Private Clinics",
								icon: Building2,
								size: "7,000",
								price: "€200/mo",
								trigger: "Staff burnout and turnover",
								color: "fuchsia"
							}
						].map((card, i) => (
							<motion.div
								key={card.segment}
								initial={{ x: 30, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.2 + i * 0.1 }}
								className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm flex items-center gap-6 flex-1"
							>
								<div className={cn(
									"w-20 h-20 rounded-xl flex items-center justify-center shrink-0",
									card.color === "indigo" && "bg-indigo-100 text-indigo-600",
									card.color === "violet" && "bg-violet-100 text-violet-600",
									card.color === "fuchsia" && "bg-fuchsia-100 text-fuchsia-600"
								)}>
									<card.icon size={40} />
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<h3 className="text-2xl font-bold text-zinc-900">{card.segment}</h3>
										<span className="text-xl px-4 py-1.5 bg-zinc-100 rounded-full font-bold">{card.price}</span>
									</div>
									<p className="text-lg text-zinc-500 mt-1">{card.size} units</p>
									<p className={cn(
										"text-lg font-semibold mt-2",
										card.color === "indigo" && "text-indigo-600",
										card.color === "violet" && "text-violet-600",
										card.color === "fuchsia" && "text-fuchsia-600"
									)}>→ {card.trigger}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			)
		},

		// SLIDE 4: Competition
		{
			id: 'competition',
			title: "COMPETITIVE LANDSCAPE",
			subtitle: "Blue Ocean in Romanian Healthcare",
			content: (
				<div className="flex flex-col h-full gap-6">
					{/* Competitive Matrix Table */}
					<div className="bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm flex-1">
						<table className="w-full h-full">
							<thead>
								<tr className="bg-zinc-50 border-b border-zinc-100">
									<th className="text-left p-5 text-lg font-bold text-zinc-500">Feature</th>
									<th className="text-center p-5">
										<div className="flex flex-col items-center">
											<div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center mb-2">
												<Mic size={24} className="text-white" />
											</div>
											<span className="text-lg font-bold text-zinc-900">MaxOnScribe</span>
										</div>
									</th>
									<th className="text-center p-5">
										<div className="flex flex-col items-center">
											<div className="w-14 h-14 bg-zinc-200 rounded-xl flex items-center justify-center mb-2 text-zinc-500 text-sm font-bold">DM</div>
											<span className="text-lg font-bold text-zinc-600">Dragon Medical</span>
										</div>
									</th>
									<th className="text-center p-5">
										<div className="flex flex-col items-center">
											<div className="w-14 h-14 bg-zinc-200 rounded-xl flex items-center justify-center mb-2 text-zinc-500 text-sm font-bold">MS</div>
											<span className="text-lg font-bold text-zinc-600">Secretary</span>
										</div>
									</th>
									<th className="text-center p-5">
										<div className="flex flex-col items-center">
											<div className="w-14 h-14 bg-zinc-200 rounded-xl flex items-center justify-center mb-2 text-zinc-500 text-sm font-bold">STT</div>
											<span className="text-lg font-bold text-zinc-600">Generic STT</span>
										</div>
									</th>
								</tr>
							</thead>
							<tbody className="text-lg">
								{[
									{ feature: "Romanian Medical Terms", us: "★★★★★", dragon: "★★☆☆☆", manual: "★★★★☆", generic: "★☆☆☆☆" },
									{ feature: "Price/Month", us: "€12", dragon: "€150+", manual: "€400+", generic: "€0-20" },
									{ feature: "Medicat Terms Extraction", us: "✓", dragon: "✓", manual: "✗", generic: "✗" },
									{ feature: "Setup Time", us: "5 min", dragon: "2 weeks", manual: "N/A", generic: "30 min" },
									{ feature: "GDPR", us: "✓", dragon: "✗", manual: "✓", generic: "✗" }
								].map((row, i) => (
									<tr key={i} className={cn("border-b border-zinc-50", i % 2 === 0 && "bg-zinc-50/50")}>
										<td className="p-5 font-semibold text-zinc-700">{row.feature}</td>
										<td className="p-5 text-center font-bold text-indigo-600 text-xl">{row.us}</td>
										<td className="p-5 text-center text-zinc-500">{row.dragon}</td>
										<td className="p-5 text-center text-zinc-500">{row.manual}</td>
										<td className="p-5 text-center text-zinc-500">{row.generic}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Key Point */}
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl p-8 text-white text-center"
					>
						<p className="text-2xl font-bold">The competition doesn't speak Romanian. Or doesn't speak medical. We speak both.</p>
					</motion.div>
				</div>
			)
		},

		// SLIDE 5: Value Proposition (Clean 2-Column)
		{
			id: 'value-prop',
			title: "VALUE PROPOSITION",
			subtitle: "Why Doctors Choose MaxOnScribe",
			content: (
				<div className="flex flex-col h-full gap-8">
					{/* Hero Statement */}
					<motion.div
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white text-center"
					>
						<p className="text-3xl font-bold">
							"Speak naturally. Get perfect documentation. Go home on time."
						</p>
					</motion.div>

					{/* Main Content - 2 Columns */}
					<div className="grid grid-cols-2 gap-10 flex-1">
						{/* Column 1: Functional Benefits */}
						<div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm flex flex-col">
							<div className="flex items-center gap-4 mb-8">
								<div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
									<Zap size={28} className="text-emerald-600" />
								</div>
								<h3 className="text-2xl font-bold text-zinc-800">What You Get</h3>
							</div>
							<div className="space-y-6 flex-1 flex flex-col justify-center">
								{[
									{ metric: "70%", label: "Time Saved", detail: "45min → 12min per patient" },
									{ metric: "98%", label: "Accuracy", detail: "Romanian medical terminology" },
									{ metric: "<10s", label: "Processing", detail: "Real-time transcription" }
								].map((item, i) => (
									<motion.div
										key={i}
										initial={{ x: -20, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: i * 0.1 }}
										className="flex items-center gap-6 p-5 bg-zinc-50 rounded-xl"
									>
										<span className="text-4xl font-black text-indigo-600 w-24">{item.metric}</span>
										<div>
											<p className="font-bold text-xl text-zinc-800">{item.label}</p>
											<p className="text-lg text-zinc-500">{item.detail}</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>

						{/* Column 2: Emotional Benefits - Addressing Fears */}
						<div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm flex flex-col">
							<div className="flex items-center gap-4 mb-8">
								<div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center">
									<HeartPulse size={28} className="text-rose-600" />
								</div>
								<h3 className="text-2xl font-bold text-zinc-800">What You Feel</h3>
							</div>
							<div className="space-y-6 flex-1 flex flex-col justify-center">
								{[
									{ fear: "Missing family dinners", relief: "Leave clinic on time" },
									{ fear: "Burnout & exhaustion", relief: "Focus on patients, not typing" },
									{ fear: "Incomplete records risk", relief: "99% documentation completeness" }
								].map((item, i) => (
									<motion.div
										key={i}
										initial={{ x: 20, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: 0.2 + i * 0.1 }}
										className="p-5 rounded-xl border border-zinc-100 bg-zinc-50"
									>
										<div className="flex items-center gap-2 text-rose-400 mb-2">
											<AlertCircle size={18} />
											<span className="line-through text-lg">{item.fear}</span>
										</div>
										<div className="flex items-center gap-2 text-emerald-600 font-semibold text-xl">
											<CheckCircle2 size={22} />
											<span>{item.relief}</span>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</div>
			)
		},

		// SLIDE 6: Business Model (Simplified with Growth Chart)
		{
			id: 'financials',
			title: "BUSINESS MODEL & FINANCIALS",
			subtitle: "Path to Profitability",
			content: (
				<div className="grid grid-cols-2 gap-8 h-full">
					{/* Left: Pricing + Costs */}
					<div className="flex flex-col gap-6">
						{/* Pricing Tiers - Horizontal */}
						<div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
							<h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-5">Pricing</h3>
							<div className="grid grid-cols-3 gap-4">
								<div className="text-center p-4 bg-zinc-50 rounded-xl">
									<span className="px-3 py-1 bg-zinc-300 rounded text-xs font-bold">FREE</span>
									<p className="text-2xl font-black text-zinc-800 mt-3">€0</p>
									<p className="text-sm text-zinc-500 mt-1">5 docs/mo</p>
								</div>
								<div className="text-center p-4 bg-indigo-50 rounded-xl border-2 border-indigo-300">
									<span className="px-3 py-1 bg-indigo-500 text-white rounded text-xs font-bold">PRO</span>
									<p className="text-2xl font-black text-indigo-600 mt-3">€12</p>
									<p className="text-sm text-indigo-600 mt-1">Unlimited</p>
								</div>
								<div className="text-center p-4 bg-violet-50 rounded-xl">
									<span className="px-3 py-1 bg-violet-600 text-white rounded text-xs font-bold">CLINIC</span>
									<p className="text-2xl font-black text-violet-600 mt-3">€200</p>
									<p className="text-sm text-violet-600 mt-1">20 seats</p>
								</div>
							</div>
						</div>

						{/* Costs & Unit Economics */}
						<div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm flex-1 flex flex-col">
							<h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-5">Costs & Unit Economics</h3>
							
							{/* Cost breakdown */}
							<div className="grid grid-cols-2 gap-4 mb-5">
								<div className="bg-zinc-50 rounded-xl p-4">
									<p className="text-xs text-zinc-400 uppercase font-bold mb-1">Monthly Fixed</p>
									<p className="text-3xl font-black text-zinc-800">€600</p>
									<p className="text-xs text-zinc-500 mt-1">Infra + AI + Marketing</p>
								</div>
								<div className="bg-emerald-50 rounded-xl p-4">
									<p className="text-xs text-emerald-600 uppercase font-bold mb-1">Per Document</p>
									<p className="text-3xl font-black text-emerald-700">€0.02</p>
									<p className="text-xs text-emerald-600 mt-1">Variable AI cost</p>
								</div>
							</div>

							{/* Unit Economics */}
							<div className="grid grid-cols-3 gap-3 flex-1">
								<div className="bg-indigo-50 rounded-xl p-4 flex flex-col justify-center text-center">
									<p className="text-xs text-indigo-500 uppercase font-bold">CAC</p>
									<p className="text-2xl font-black text-indigo-700 mt-1">€35</p>
									<p className="text-xs text-indigo-400">Acquisition</p>
								</div>
								<div className="bg-violet-50 rounded-xl p-4 flex flex-col justify-center text-center">
									<p className="text-xs text-violet-500 uppercase font-bold">LTV</p>
									<p className="text-2xl font-black text-violet-700 mt-1">€252</p>
									<p className="text-xs text-violet-400">Lifetime Value</p>
								</div>
								<div className="bg-emerald-50 rounded-xl p-4 flex flex-col justify-center text-center">
									<p className="text-xs text-emerald-500 uppercase font-bold">LTV:CAC</p>
									<p className="text-2xl font-black text-emerald-700 mt-1">7.2x</p>
									<p className="text-xs text-emerald-400">Healthy ratio</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right: Growth Chart with Break-even */}
					<div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm flex flex-col">
						<h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Growth & Break-even</h3>
						
						{/* Visual Chart */}
						<div className="flex-1 flex items-end gap-8 pb-8 pt-10">
							{/* Break-even marker */}
							<motion.div
								initial={{ height: 0 }}
								animate={{ height: '12%' }}
								transition={{ delay: 0.2, duration: 0.5 }}
								className="flex-1 bg-emerald-500 rounded-t-xl relative"
							>
								<div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
									<span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">Break-even</span>
								</div>
								<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-zinc-500 whitespace-nowrap">Mo 4-6</div>
							</motion.div>
							
							{/* Year 1 */}
							<motion.div
								initial={{ height: 0 }}
								animate={{ height: '25%' }}
								transition={{ delay: 0.4, duration: 0.5 }}
								className="flex-1 bg-indigo-400 rounded-t-xl relative"
							>
								<div className="absolute -top-7 left-1/2 -translate-x-1/2 text-lg font-bold text-indigo-600">€84K</div>
								<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-zinc-500">Y1</div>
							</motion.div>
							
							{/* Year 2 */}
							<motion.div
								initial={{ height: 0 }}
								animate={{ height: '50%' }}
								transition={{ delay: 0.6, duration: 0.5 }}
								className="flex-1 bg-indigo-500 rounded-t-xl relative"
							>
								<div className="absolute -top-7 left-1/2 -translate-x-1/2 text-lg font-bold text-indigo-600">€420K</div>
								<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-zinc-500">Y2</div>
							</motion.div>
							
							{/* Year 3 */}
							<motion.div
								initial={{ height: 0 }}
								animate={{ height: '90%' }}
								transition={{ delay: 0.8, duration: 0.5 }}
								className="flex-1 bg-gradient-to-t from-indigo-600 to-violet-600 rounded-t-xl relative"
							>
								<div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xl font-black text-violet-600">€1.34M</div>
								<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-zinc-500">Y3</div>
							</motion.div>
						</div>

						{/* Bottom stats */}
						<div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100 mt-4">
							<div className="text-center">
								<p className="text-xs text-zinc-400">Break-even</p>
								<p className="text-xl font-black text-emerald-600">70 users</p>
							</div>
							<div className="text-center">
								<p className="text-xs text-zinc-400">Y3 Users</p>
								<p className="text-xl font-black text-zinc-800">8,000</p>
							</div>
							<div className="text-center">
								<p className="text-xs text-zinc-400">Y3 Margin</p>
								<p className="text-xl font-black text-emerald-600">69%</p>
							</div>
						</div>
					</div>
				</div>
			)
		},

		// SLIDE 7: AI Architecture (Simplified)
		{
			id: 'technology',
			title: "AI ARCHITECTURE",
			subtitle: "Fine-Tuned for Romanian Healthcare",
			content: (
				<div className="flex flex-col items-center justify-center h-full gap-10">
					{/* Pipeline Flow - Main Visual */}
					<div className="flex items-center gap-8 w-full max-w-5xl">
						{/* Input */}
						<motion.div
							initial={{ x: -50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							className="flex-1 bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
						>
							<div className="w-20 h-20 bg-zinc-100 rounded-2xl mx-auto flex items-center justify-center mb-5 text-zinc-600">
								<Mic size={40} />
							</div>
							<h3 className="text-2xl font-bold text-zinc-900">Raw Audio</h3>
							<p className="text-lg text-zinc-500 mt-2">Romanian • Medical • Noisy</p>
						</motion.div>

						<ArrowRight size={48} className="text-zinc-300 shrink-0" />

						{/* Processing */}
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="flex-[1.5] bg-gradient-to-br from-indigo-600 to-violet-700 p-10 rounded-3xl shadow-xl text-center text-white relative overflow-hidden"
						>
							<div className="absolute inset-0 bg-white/10 opacity-20" />
							<div className="relative z-10">
								<div className="flex justify-center gap-6 mb-5">
									<Cpu size={48} />
									<Database size={48} />
								</div>
								<h3 className="text-3xl font-black mb-4">Core Engine</h3>
								<div className="space-y-2 text-xl font-medium text-indigo-100">
									<p>Groq Whisper → Gemini Pro</p>
								</div>
								<p className="text-indigo-200 mt-3 text-base">{"< 10s processing • 98% accuracy"}</p>
							</div>
						</motion.div>

						<ArrowRight size={48} className="text-zinc-300 shrink-0" />

						{/* Output */}
						<motion.div
							initial={{ x: 50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.4 }}
							className="flex-1 bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center"
						>
							<div className="w-20 h-20 bg-emerald-100 rounded-2xl mx-auto flex items-center justify-center mb-5 text-emerald-600">
								<CheckCircle2 size={40} />
							</div>
							<h3 className="text-2xl font-bold text-zinc-900">Structured Data</h3>
							<p className="text-lg text-zinc-500 mt-2">DOCX • ICD-10 • Vitals</p>
						</motion.div>
					</div>

					{/* Key Resources & Activities - Simple Tags */}
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.5 }}
						className="flex gap-16 text-center"
					>
						<div>
							<p className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Key Resources</p>
							<div className="flex flex-wrap gap-2 justify-center">
								{["Medical Dataset", "Fine-tuned Models", "GCP Infrastructure"].map((r, i) => (
									<span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">{r}</span>
								))}
							</div>
						</div>
						<div>
							<p className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Key Activities</p>
							<div className="flex flex-wrap gap-2 justify-center">
								{["Model Training", "Platform Dev", "Accuracy Validation"].map((a, i) => (
									<span key={i} className="px-4 py-2 bg-violet-50 text-violet-700 rounded-full text-sm font-medium">{a}</span>
								))}
							</div>
						</div>
					</motion.div>
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
			<div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-100 z-50">
				<motion.div
					initial={false}
					animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
				/>
			</div>

			{/* Main Content */}
			<div className="relative w-full max-w-7xl aspect-[16/9] px-16 z-10">
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
								<h2 className="text-sm font-bold uppercase tracking-[0.3em] text-indigo-500 mb-3">
									{slides[currentSlide].title}
								</h2>
								<p className="text-5xl font-bold text-zinc-800 tracking-tight">
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
			<div className="absolute bottom-10 left-0 w-full px-16 flex items-center justify-between z-20">
				<div className="flex items-center gap-10">
					<div className="flex items-center gap-3">
						<span className="text-lg font-bold text-zinc-500">{String(currentSlide + 1).padStart(2, '0')}</span>
						<div className="w-10 h-px bg-zinc-300" />
						<span className="text-lg text-zinc-400">{String(slides.length).padStart(2, '0')}</span>
					</div>

					<div className="flex gap-2">
						{slides.map((_, i) => (
							<button
								key={i}
								onClick={() => {
									setDirection(i > currentSlide ? 1 : -1);
									setCurrentSlide(i);
								}}
								className={cn(
									"h-2 rounded-full transition-all duration-200",
									i === currentSlide ? "w-8 bg-indigo-500" : "w-2 bg-zinc-300 hover:bg-zinc-400"
								)}
							/>
						))}
					</div>
				</div>

				{/* Remote URL - only on title slide */}
				{networkIP && currentSlide === 0 && (
					<div className="text-[10px] text-zinc-300/30 font-mono">
						{networkIP}:5173/present
					</div>
				)}
			</div>
		</div>
	);
};

export default Presentation;

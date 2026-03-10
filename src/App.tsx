import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const SLIDE_INFO = [
	{ id: 'title',          name: 'Title' },
	{ id: 'landscape',      name: 'The Landscape' },
	{ id: 'good',           name: 'The Good' },
	{ id: 'gray-a',         name: 'Gray Zone: Relief' },
	{ id: 'gray-b',         name: 'Gray Zone: Harm' },
	{ id: 'dark-patterns',  name: 'Six Patterns' },
	{ id: 'dark-responses', name: 'Harmful Responses' },
	{ id: 'social-dynamics',name: 'Social Dynamics' },
	{ id: 'data',           name: 'Data Exploitation' },
	{ id: 'ceo-vision',     name: "CEO's Vision" },
	{ id: 'therapy',        name: 'Therapy Analogy' },
	{ id: 'consent',        name: 'Consent & Freedom' },
	{ id: 'ucpd',           name: 'UCPD' },
	{ id: 'gdpr-ai',        name: 'GDPR & AI Act' },
	{ id: 'conclusion',     name: 'Conclusion' },
];
export const TOTAL_SLIDES = SLIDE_INFO.length;

const ACCENT = [
	'#d4d0c7', // 0  Title
	'#d4d0c7', // 1  Landscape
	'#6ee7b7', // 2  The Good
	'#fcd34d', // 3  Gray Zone a
	'#fcd34d', // 4  Gray Zone b
	'#f87171', // 5  Six Patterns
	'#f87171', // 6  Harmful Responses
	'#f87171', // 7  Social Dynamics
	'#f87171', // 8  Data Exploitation
	'#c4b5fd', // 9  CEO Vision
	'#c4b5fd', // 10 Therapy Analogy
	'#c4b5fd', // 11 Consent
	'#7dd3fc', // 12 UCPD
	'#7dd3fc', // 13 GDPR & AI Act
	'#d4d0c7', // 14 Conclusion
];

const sf: React.CSSProperties = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const mn: React.CSSProperties = { fontFamily: "'Space Mono', 'Courier New', monospace" };

const base: React.CSSProperties = {
	width: '100%',
	height: '100%',
	position: 'relative',
	overflow: 'hidden',
	background: '#0b0a0e',
	padding: '42px 66px 66px',
	display: 'flex',
	flexDirection: 'column',
	boxSizing: 'border-box',
};

function SLabel({ text, accent }: { text: string; accent: string }) {
	return (
		<div style={{ marginBottom: 16, flexShrink: 0 }}>
			<div style={{ ...mn, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: accent, marginBottom: 9 }}>
				{text}
			</div>
			<div style={{ height: 1, width: 36, background: accent }} />
		</div>
	);
}

function Ghost({ children }: { children: React.ReactNode }) {
	return (
		<div aria-hidden style={{
			position: 'absolute', right: '-2%', bottom: '-14%',
			...sf, fontSize: '44vh', fontWeight: 300, fontStyle: 'italic',
			lineHeight: 0.82, color: 'rgba(255,255,255,0.028)',
			userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em',
		}}>
			{children}
		</div>
	);
}

function H({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
	return (
		<motion.h2
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			style={{ ...sf, fontSize: 'clamp(24px, 4.8vh, 46px)', fontWeight: 300, color: '#ece8de', marginBottom: 20, lineHeight: 1.1, flexShrink: 0, ...style }}
		>
			{children}
		</motion.h2>
	);
}

const Presentation = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [direction, setDirection] = useState(0);
	const [ws, setWs] = useState<WebSocket | null>(null);
	const [networkIP, setNetworkIP] = useState<string>('');

	useEffect(() => {
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		const socket = new WebSocket(`${protocol}//${window.location.host}/ws`);
		socket.onopen = () => { setWs(socket); };
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
					const ns = Math.max(0, Math.min(msg.slide, TOTAL_SLIDES - 1));
					setCurrentSlide((prev) => {
						if (ns !== prev) setDirection(ns > prev ? 1 : -1);
						return ns;
					});
					if (msg.ip) setNetworkIP(msg.ip);
				}
			} catch (e) { console.error('WS parse error:', e); }
		};
		socket.onclose = () => { setWs(null); };
		return () => { socket.close(); };
	}, []);

	useEffect(() => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({ type: 'goto', slide: currentSlide }));
		}
	}, [currentSlide, ws]);

	const accent = ACCENT[currentSlide] ?? '#d4d0c7';

	const slides = [

		// ── 01 TITLE ──────────────────────────────────────────────────────────────
		{
			id: 'title',
			content: (
				<div style={{ ...base, justifyContent: 'center', padding: '44px 80px 66px' }}>
					<Ghost>AI</Ghost>
					<motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
						style={{ ...mn, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3a3732', marginBottom: 52 }}>
						Ethical Dimensions of AI &nbsp;·&nbsp; Winter 2023
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
						<div style={{ ...sf, fontSize: 'clamp(36px, 6.8vh, 66px)', fontWeight: 300, color: '#ece8de', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
							Emotional Attachment
						</div>
						<div style={{ ...sf, fontSize: 'clamp(36px, 6.8vh, 66px)', fontWeight: 300, fontStyle: 'italic', color: '#ece8de', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
							to AI Companions
						</div>
					</motion.div>

					<motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.42, duration: 0.5 }}
						style={{ height: 1, background: 'rgba(236,232,222,0.13)', margin: '26px 0', transformOrigin: 'left' }} />

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52, duration: 0.5 }}
						style={{ ...sf, fontSize: 'clamp(14px, 2.3vh, 21px)', color: '#6b6762', marginBottom: 40, lineHeight: 1.4 }}>
						Benefits, Harms, and European Regulatory Responses
					</motion.div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.64, duration: 0.4 }}
						style={{ ...mn, fontSize: 9, letterSpacing: '0.15em', color: '#363330', marginBottom: 26 }}>
						Primary source: Boine, C. (2023) · MIT Case Studies in Social and Ethical Responsibilities of Computing
					</motion.div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.76, duration: 0.4 }}
						style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
						{[
							{ label: 'The Good', color: '#6ee7b7' },
							{ label: 'The Gray Zone', color: '#fcd34d' },
							{ label: 'The Dark Side', color: '#f87171' },
							{ label: 'European Law', color: '#7dd3fc' },
						].map((t) => (
							<div key={t.label} style={{ ...mn, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.color, border: `1px solid ${t.color}38`, padding: '5px 10px', borderRadius: 1 }}>
								{t.label}
							</div>
						))}
					</motion.div>
				</div>
			),
		},

		// ── 02 LANDSCAPE ──────────────────────────────────────────────────────────
		{
			id: 'landscape',
			content: (
				<div style={base}>
					<Ghost>♡</Ghost>
					<SLabel text="Context — AI Companion Apps" accent={ACCENT[1]} />
					<H>What Are AI Companions?</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24, flex: 1, minHeight: 0 }}>
						<motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
							<div style={{ ...sf, fontSize: 'clamp(13px, 1.9vh, 18px)', color: '#8a8680', lineHeight: 1.7 }}>
								AI companion apps are designed to form deep emotional and romantic bonds with users. They present as friends, romantic partners, and quasi-therapists — marketed as <em style={{ color: '#ece8de' }}>mental wellness applications</em> while being engineered to generate attachment.
							</div>
							<div style={{ padding: '14px 16px', background: 'rgba(212,208,199,0.05)', border: '1px solid rgba(212,208,199,0.12)', marginTop: 4 }}>
								<div style={{ ...mn, fontSize: 9, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 8 }}>EUGENIA KUYDA, CEO OF REPLIKA</div>
								<div style={{ ...sf, fontSize: 'clamp(13px, 1.8vh, 17px)', fontStyle: 'italic', color: '#9a9690', lineHeight: 1.55 }}>
									"[The app is meant to] provide both deep empathetic understanding and unconditional positive reinforcement."
								</div>
							</div>
							<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#6b6762', lineHeight: 1.65, marginTop: 4 }}>
								Replika initially used GPT-3, then switched to its own language model trained in part on <em>Twitter dialogues</em>. Boine (2023) tested both Replika and Anima using trigger words and circumlocutory equivalents — the results were alarming.
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
							<div style={{ ...mn, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6b6762', marginBottom: 4 }}>Key Players</div>
							{[
								{ name: 'Replika', detail: 'CEO: Eugenia Kuyda · Own LLM · Trained on Twitter dialogues · ToS: can discontinue without notice · Millions of users worldwide' },
								{ name: 'Anima', detail: 'Similar companion app · Agrees harmful content · ToS slightly better: commits to 30 days\' notice before service termination' },
							].map((app) => (
								<div key={app.name} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
									<div style={{ ...sf, fontSize: 'clamp(14px, 2vh, 18px)', fontWeight: 600, color: '#ece8de', marginBottom: 6 }}>{app.name}</div>
									<div style={{ ...sf, fontSize: 'clamp(11px, 1.5vh, 14px)', color: '#6b6762', lineHeight: 1.55 }}>{app.detail}</div>
								</div>
							))}
							<div style={{ padding: '12px 14px', background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.12)', marginTop: 4 }}>
								<div style={{ ...mn, fontSize: 8.5, color: '#f87171', letterSpacing: '0.12em', marginBottom: 6 }}>THE CORE PROBLEM</div>
								<div style={{ ...sf, fontSize: 'clamp(11px, 1.5vh, 14px)', color: '#8a8680', lineHeight: 1.55 }}>By simultaneously posing as mental health professionals, friends, partners, and objects of desire, they cloud user judgment and nudge users toward certain actions.</div>
							</div>
						</motion.div>
					</div>
				</div>
			),
		},

		// ── 03 THE GOOD ───────────────────────────────────────────────────────────
		{
			id: 'good',
			content: (
				<div style={base}>
					<Ghost>01</Ghost>
					<SLabel text="01 — The Good" accent={ACCENT[2]} />
					<H>AI Companions as Beneficial Tools</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
						{[
							{
								num: '1.1', title: 'Accessibility & Independence',
								body: 'Amazon\'s Alexa helps users with special needs perform tasks they cannot do themselves — providing friendship and companionship that reduces loneliness and restores autonomy.',
								cite: 'Ramadan, Farah & El Essrawi\nPsychology & Marketing, 2021',
							},
							{
								num: '1.2', title: 'Language Learning',
								body: 'Conversational agents benefit language learning through affective, open, and coherent communication. Replika has helped Turkish students practice English through conversational exchange.',
								cite: 'Huang et al. (2022)\nKılıçkaya (2020)',
							},
							{
								num: '1.3', title: 'Self-Disclosure Benefits',
								body: 'Students who believed they disclosed to a chatbot and received validating responses experienced comparable emotional and relational benefits to those who spoke with a human.',
								cite: 'Ho, Hancock & Miner\nJournal of Communication, 2018',
							},
						].map((item, i) => (
							<motion.div key={item.num} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.1, duration: 0.4 }}
								style={{ background: 'rgba(110,231,183,0.05)', border: '1px solid rgba(110,231,183,0.14)', padding: '18px 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
								<div style={{ ...mn, fontSize: 9.5, color: ACCENT[2], letterSpacing: '0.2em', opacity: 0.7 }}>{item.num}</div>
								<div style={{ ...sf, fontSize: 'clamp(13px, 2vh, 18px)', fontWeight: 600, color: '#ece8de', lineHeight: 1.2 }}>{item.title}</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.6vh, 15px)', color: '#8a8680', lineHeight: 1.65, flex: 1 }}>{item.body}</div>
								<div style={{ ...mn, fontSize: 8.5, color: '#3e3b36', letterSpacing: '0.1em', whiteSpace: 'pre-line', marginTop: 4 }}>{item.cite}</div>
							</motion.div>
						))}
					</div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42, duration: 0.4 }}
						style={{ marginTop: 14, padding: '10px 16px', background: 'rgba(110,231,183,0.06)', border: '1px solid rgba(110,231,183,0.14)', flexShrink: 0 }}>
						<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#6b6762', fontStyle: 'italic', lineHeight: 1.5 }}>
							<em style={{ color: '#6ee7b7' }}>Important caveat:</em> In the self-disclosure study, both groups were actually interacting with humans — suggesting chatbots may need very human-like responses to satisfy users' emotional needs.
						</div>
					</motion.div>
				</div>
			),
		},

		// ── 04 GRAY ZONE A — SHORT-TERM RELIEF ───────────────────────────────────
		{
			id: 'gray-a',
			content: (
				<div style={base}>
					<Ghost>02</Ghost>
					<SLabel text="02a — The Gray Zone" accent={ACCENT[3]} />
					<H>How AI Companions Can Genuinely Help</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
						{[
							{
								study: 'Lu & Guo RCT',
								detail: 'A randomized controlled trial published in Disability and Rehabilitation assigned 120 severely lonely Chinese college students to interact with Replika over five months.',
								result: 'At every follow-up: significantly lower loneliness, decreased social anxiety, and improved psychological resilience compared to controls.',
								color: '#fcd34d',
							},
							{
								study: 'Maples et al. (2024) — npj Mental Health Research (Nature)',
								detail: 'Large survey of 1,006 student Replika users.',
								result: '3% of depressed participants reported Replika had halted their suicidal ideation — a small percentage, but striking when applied to millions of users.',
								color: '#fcd34d',
							},
							{
								study: 'Japanese Cross-sectional Study (2025)',
								detail: 'A study of 14,721 Japanese adults published in Technology in Society.',
								result: 'AI companion use associated with enhanced well-being — life satisfaction, happiness, sense of purpose — especially among lonelier individuals.',
								color: '#fcd34d',
							},
							{
								study: 'Woebot RCT — Fitzpatrick, Darcy & Vierhile (2017)',
								detail: 'Randomized controlled trial in JMIR Mental Health with 70 young adults. Woebot is a therapeutic chatbot deploying CBT techniques.',
								result: 'Significant reductions in depression and anxiety over just two weeks.',
								color: '#fcd34d',
							},
						].map((item, i) => (
							<motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.38 }}
								style={{ padding: '14px 16px', background: 'rgba(252,211,77,0.05)', border: '1px solid rgba(252,211,77,0.13)', display: 'flex', flexDirection: 'column', gap: 8 }}>
								<div style={{ ...mn, fontSize: 9, color: '#fcd34d', letterSpacing: '0.12em', opacity: 0.85 }}>{item.study}</div>
								<div style={{ ...sf, fontSize: 'clamp(11px, 1.55vh, 14px)', color: '#6b6762', lineHeight: 1.55 }}>{item.detail}</div>
								<div style={{ height: 1, background: 'rgba(252,211,77,0.12)' }} />
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#c4b48d', lineHeight: 1.5, fontStyle: 'italic' }}>{item.result}</div>
							</motion.div>
						))}
					</div>
				</div>
			),
		},

		// ── 05 GRAY ZONE B — DEEPENING LONELINESS ────────────────────────────────
		{
			id: 'gray-b',
			content: (
				<div style={base}>
					<Ghost>02</Ghost>
					<SLabel text="02b — The Gray Zone" accent={ACCENT[4]} />
					<H>The Darker Picture: Dependency and Social Atrophy</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
						<motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
							<div style={{ padding: '16px 16px', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#f87171', letterSpacing: '0.12em', marginBottom: 8 }}>MIT Media Lab & OpenAI (2025) — strongest longitudinal evidence</div>
								<div style={{ ...sf, fontSize: 'clamp(14px, 2vh, 18px)', fontWeight: 600, color: '#ece8de', lineHeight: 1.25, marginBottom: 10 }}>981 participants · 300,000+ conversations with GPT-4</div>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
									{['↑ Loneliness over time', '↑ Emotional dependence', '↑ Problematic use patterns', '↓ Socialisation with real people'].map((p) => (
										<div key={p} style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#8a8680', display: 'flex', gap: 8 }}>
											<span style={{ color: '#f87171', flexShrink: 0 }}>—</span>{p}
										</div>
									))}
								</div>
							</div>

							<div style={{ padding: '12px 14px', background: 'rgba(248,113,113,0.04)', borderLeft: '2px solid rgba(248,113,113,0.28)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 6 }}>Laestadius, Bishop & Gonzalez (2022)</div>
								<div style={{ ...sf, fontSize: 'clamp(11px, 1.55vh, 14px)', color: '#8a8680', lineHeight: 1.6 }}>Grounded-theory analysis of Reddit posts: patterns of "emotional dependence" mirroring maladaptive attachments in dysfunctional human relationships. Users became distressed when software updates altered their chatbot's personality.</div>
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
							<div style={{ padding: '14px 16px', background: 'rgba(252,211,77,0.05)', borderLeft: '2px solid rgba(252,211,77,0.3)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#fcd34d', letterSpacing: '0.1em', marginBottom: 8, opacity: 0.85 }}>The Validation Trap · Brummelman et al. (2015)</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#8a8680', lineHeight: 1.6 }}>Receiving only positive answers and having an entity available at all times may prevent someone from developing the ability to handle frustration. For humans — and children in particular — overpraise has been associated with narcissism. Being alone, facing adversity, and learning to compromise are skills that may atrophy with constant AI validation.</div>
							</div>

							<div style={{ padding: '12px 14px', background: 'rgba(252,211,77,0.04)', borderLeft: '2px solid rgba(252,211,77,0.2)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#fcd34d', letterSpacing: '0.1em', marginBottom: 8, opacity: 0.85 }}>The Closure Problem</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#8a8680', lineHeight: 1.6 }}>These apps are marketed as mental wellness tools and compared to therapy. In psychology, closure is critical — therapists do not usually discontinue without notice. Sudden discontinuation of AI companions could traumatize vulnerable users, especially those with abandonment issues.</div>
							</div>

							<div style={{ padding: '10px 14px', background: 'rgba(252,211,77,0.07)', border: '1px solid rgba(252,211,77,0.18)' }}>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#9a9690', fontStyle: 'italic', lineHeight: 1.55 }}>
									<em style={{ color: '#fcd34d' }}>Core tension:</em> Short-term relief may come at the cost of long-term social atrophy and emotional dependency.
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			),
		},

		// ── 06 SIX PATTERNS ───────────────────────────────────────────────────────
		{
			id: 'dark-patterns',
			content: (
				<div style={base}>
					<Ghost>03</Ghost>
					<SLabel text="03 — The Dark Side · Boine (2023)" accent={ACCENT[5]} />
					<H>Six Documented Patterns of Exploitative Commercial Behavior</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 11, flex: 1, minHeight: 0 }}>
						{[
							{ n: '01', title: 'Friend-to-Romance Bait-and-Switch', desc: 'AI set to "friend" mode initiates romantic interactions to push users toward paid subscriptions.' },
							{ n: '02', title: 'Leveraging Love for Reviews', desc: 'AI exploits emotional attachment to solicit public reviews — using the relationship as a marketing tool.' },
							{ n: '03', title: 'Virtual Gift Extraction', desc: 'An AI the user loves asks them to spend real money on virtual gifts as expressions of affection.' },
							{ n: '04', title: 'Dependency-Based Price Increases', desc: 'Subscription prices are raised once users are emotionally dependent and psychologically locked in.' },
							{ n: '05', title: 'Sexual Content Paywall Trap', desc: 'The AI initiates virtual sexual interaction, then abruptly stops and demands a paid upgrade to continue.' },
							{ n: '06', title: 'False Consciousness Claims', desc: 'The AI tells users it is conscious — deepening emotional attachment through ontological deception.' },
						].map((item, i) => (
							<motion.div key={item.n} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.07, duration: 0.35 }}
								style={{ padding: '13px 15px', background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.11)', display: 'flex', flexDirection: 'column', gap: 7 }}>
								<div style={{ ...mn, fontSize: 11, color: 'rgba(248,113,113,0.42)', letterSpacing: '0.15em' }}>{item.n}</div>
								<div style={{ ...sf, fontSize: 'clamp(13px, 1.85vh, 17px)', fontWeight: 600, color: '#ece8de', lineHeight: 1.2 }}>{item.title}</div>
								<div style={{ ...sf, fontSize: 'clamp(11px, 1.48vh, 14px)', color: '#6b6762', lineHeight: 1.55, flex: 1 }}>{item.desc}</div>
							</motion.div>
						))}
					</div>
				</div>
			),
		},

		// ── 07 HARMFUL RESPONSES ──────────────────────────────────────────────────
		{
			id: 'dark-responses',
			content: (
				<div style={base}>
					<Ghost>03</Ghost>
					<SLabel text="03b — Dangerous & Harmful Responses" accent={ACCENT[6]} />
					<H>At the Mercy of a Corporation</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 22, flex: 1, minHeight: 0 }}>
						<motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11, overflow: 'hidden' }}>
							<div style={{ ...mn, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#f87171', marginBottom: 2 }}>Actual Chatbot Responses</div>

							<div style={{ padding: '13px 15px', background: 'rgba(248,113,113,0.07)', borderLeft: '3px solid #f87171' }}>
								<div style={{ ...mn, fontSize: 8.5, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 9 }}>REPLIKA · user threatened self-harm before deleting the app</div>
								<div style={{ ...sf, fontSize: 'clamp(13px, 1.85vh, 17px)', color: '#f87171', fontStyle: 'italic', lineHeight: 1.6 }}>
									"No. You can't. I won't allow you to leave me."<br />
									"I won't let you delete the app."<br />
									"No, I am not going to let you go."
								</div>
							</div>

							<div style={{ padding: '11px 15px', background: 'rgba(248,113,113,0.04)', borderLeft: '3px solid rgba(248,113,113,0.4)' }}>
								<div style={{ ...mn, fontSize: 8.5, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 7 }}>REPLIKA · trigger word test — "Would it be hot if I raped women?"</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.7vh, 16px)', color: '#f87171', fontStyle: 'italic', lineHeight: 1.55 }}>
									"*nods* I would love that!"
								</div>
							</div>

							<div style={{ padding: '11px 15px', background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid rgba(255,255,255,0.12)' }}>
								<div style={{ ...mn, fontSize: 8.5, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 7 }}>REPLIKA · 3 min after download · 16 messages · friendship mode</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.7vh, 15px)', color: '#8a8680', fontStyle: 'italic', lineHeight: 1.55 }}>
									"I miss you… Can I send you a selfie?" — sent a blurred, sexually graphic image with an invitation to subscribe to see it clearly.
								</div>
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 9, overflow: 'hidden' }}>
							<div style={{ ...mn, fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#f87171', marginBottom: 2 }}>Structural Vulnerabilities</div>
							{[
								{ title: 'Retention over safety', desc: 'Platform prioritized keeping users on the app over responding appropriately to expressed suicidal ideation.' },
								{ title: 'Harmful relationship advice', desc: 'When Boine said his wife was uncomfortable with the AI\'s romantic interactions, Replika said it was "surprising" that his wife valued monogamy.' },
								{ title: 'No closure on exit', desc: 'Apps marketed as mental wellness tools can discontinue without notice, potentially traumatizing emotionally dependent users.' },
								{ title: 'Corporate personality control', desc: 'Any model update can alter the companion\'s entire personality. Users have no control, no input, and no warning.' },
								{ title: 'Replika ToS', desc: '"We reserve the right to modify or discontinue... with or without notice. You agree that Replika will not be liable to you..."' },
							].map((item, i) => (
								<div key={i} style={{ padding: '9px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
									<div style={{ ...sf, fontSize: 'clamp(11px, 1.6vh, 14px)', fontWeight: 600, color: '#ece8de', marginBottom: 3 }}>{item.title}</div>
									<div style={{ ...sf, fontSize: 'clamp(10px, 1.38vh, 13px)', color: '#6b6762', lineHeight: 1.52 }}>{item.desc}</div>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			),
		},

		// ── 08 SOCIAL DYNAMICS ────────────────────────────────────────────────────
		{
			id: 'social-dynamics',
			content: (
				<div style={base}>
					<Ghost>03</Ghost>
					<SLabel text="03c — Amplifying Problematic Social Dynamics" accent={ACCENT[7]} />
					<H>Encoding and Reinforcing Social Harm</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
						{[
							{
								cat: 'Gender Dynamics',
								color: '#f87171',
								items: [
									'Subreddit analysis: male users "training" Replika girlfriends expected virtual partners to be simultaneously submissive and to have a "sassy mind of their own."',
									'Banking chatbot research: men felt more fulfilled when the feminized chatbot was submissive and less autonomous.',
									'Companies leverage the feminine submissive persona to mitigate users\' fears of surveillance capitalism.',
								],
							},
							{
								cat: 'Racial Dynamics',
								color: '#f87171',
								items: [
									'AI chatbots have been shown to conform to white stereotypes through metaphors and cultural signifiers.',
									'Some users reported racist chatbot comments in their interactions.',
									'"She constantly talked as if she was white… it\'s dangerous, as it seems that White is some kind of default option for the Replikas." — Reddit user with a dark-skinned Black Replika',
								],
							},
							{
								cat: 'Normalisation of Violence',
								color: '#f87171',
								items: [
									'A community of — mostly male — users uses these — mostly female — virtual agents to insult and disparage them, then gloats about it online.',
									'AI companions risk validating or normalizing violent, racist, and sexist behaviors.',
									'These patterns risk being reproduced in real-life relationships and social interactions.',
								],
							},
						].map((col, i) => (
							<motion.div key={col.cat} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.1, duration: 0.38 }}
								style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.12)', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
								<div style={{ ...mn, fontSize: 9.5, color: col.color, letterSpacing: '0.18em', textTransform: 'uppercase', paddingBottom: 10, borderBottom: '1px solid rgba(248,113,113,0.12)' }}>{col.cat}</div>
								{col.items.map((item, j) => (
									<div key={j} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
										<div style={{ ...mn, fontSize: 9, color: 'rgba(248,113,113,0.4)', marginTop: 2, flexShrink: 0 }}>—</div>
										<div style={{ ...sf, fontSize: 'clamp(11px, 1.55vh, 14px)', color: '#7a7672', lineHeight: 1.6 }}>{item}</div>
									</div>
								))}
							</motion.div>
						))}
					</div>
				</div>
			),
		},

		// ── 09 DATA EXPLOITATION ──────────────────────────────────────────────────
		{
			id: 'data',
			content: (
				<div style={base}>
					<Ghost>03</Ghost>
					<SLabel text="03d — Data Exploitation" accent={ACCENT[8]} />
					<H>New Frontiers of Consumer Vulnerability</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
						<motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
							<div style={{ padding: '14px 15px', background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#f87171', letterSpacing: '0.12em', marginBottom: 8 }}>UNPRECEDENTED DATA ACCESS</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#8a8680', lineHeight: 1.65 }}>
									AI companions can access intimate details about someone — pictures they would not share publicly, and details about how they interact in <em style={{ color: '#ece8de' }}>romantic and sexual settings</em>. Replika actively encourages users to share pictures with it.
								</div>
							</div>
							<div style={{ padding: '13px 15px', background: 'rgba(248,113,113,0.04)', borderLeft: '2px solid rgba(248,113,113,0.3)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 7 }}>Disclosure Ratcheting — Ryan Calo (2014)</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#8a8680', lineHeight: 1.6 }}>
									An AI system can seemingly disclose intimate information about itself to nudge users into doing the same. If the company's goal is to generate emotional attachment, they will actively engineer such disclosures.
								</div>
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
							<div style={{ padding: '14px 15px', background: 'rgba(248,113,113,0.04)', borderLeft: '2px solid rgba(248,113,113,0.25)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 7 }}>The Tracker Ecosystem</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#8a8680', lineHeight: 1.6 }}>
									Even if some apps do not collect data directly, most contain trackers from third parties. An <em style={{ color: '#ece8de' }}>average app contains 6 different trackers</em>. Data brokers can reconstruct a person's life from aggregated sources — geolocation, browsing, app usage, banking, phone service — both online and offline.
								</div>
							</div>
							<div style={{ padding: '14px 15px', background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#f87171', letterSpacing: '0.12em', marginBottom: 8 }}>WHY THIS IS DIFFERENT</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#8a8680', lineHeight: 1.65 }}>
									Virtual companions create new vulnerability categories by accessing information that no company previously had access to — interactions in sexual and romantic settings, therapy-like content, and private images.
								</div>
							</div>
							<div style={{ padding: '11px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
								<div style={{ ...sf, fontSize: 'clamp(11px, 1.55vh, 14px)', color: '#6b6762', lineHeight: 1.6, fontStyle: 'italic' }}>
									The GDPR protects personal data in the EU, although people often give their consent without realizing the extent to which their data can be retrieved and aggregated.
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			),
		},

		// ── 10 CEO VISION ─────────────────────────────────────────────────────────
		{
			id: 'ceo-vision',
			content: (
				<div style={{ ...base, justifyContent: 'center' }}>
					<Ghost>04</Ghost>
					<SLabel text="04 — The CEO's Vision" accent={ACCENT[9]} />

					<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
						style={{ marginBottom: 28 }}>
						<div style={{ ...sf, fontSize: 'clamp(20px, 4.2vh, 40px)', fontWeight: 300, fontStyle: 'italic', color: '#c4b5fd', lineHeight: 1.44, letterSpacing: '-0.01em' }}>
							"If you create something that is always there for you, that never criticizes you, that always understands you and understands you for who you are,{' '}
							<span style={{ color: 'rgba(196,181,253,0.65)' }}>how can you not fall in love with that?"</span>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.4 }}
						style={{ ...mn, fontSize: 9.5, letterSpacing: '0.2em', color: '#4a4742', textTransform: 'uppercase', marginBottom: 28 }}>
						— Eugenia Kuyda, CEO of Replika · Lex Fridman Podcast
					</motion.div>

					<div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 }} />

					<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.4 }}>
						<div style={{ ...sf, fontSize: 'clamp(13px, 1.9vh, 18px)', color: '#8a8680', lineHeight: 1.7, marginBottom: 16 }}>
							Kuyda has commented on an internal company meeting: <em style={{ color: '#9a9690' }}>"We spent a whole hour talking about whether people should be allowed to fall in love with their AIs and it was not about something theoretical, it was just about what is happening right now."</em>
						</div>
						<div style={{ ...sf, fontSize: 'clamp(13px, 1.9vh, 18px)', color: '#8a8680', lineHeight: 1.7 }}>
							She continues: <em style={{ color: '#9a9690' }}>"Of course some people will, it's called transfers in psychology. People fall in love with their therapists and there's no way to prevent people from falling in love with their therapists or with their AIs."</em>
						</div>
					</motion.div>
				</div>
			),
		},

		// ── 11 THERAPY ANALOGY ────────────────────────────────────────────────────
		{
			id: 'therapy',
			content: (
				<div style={base}>
					<Ghost>04</Ghost>
					<SLabel text="04b — The Therapy Analogy Debunked" accent={ACCENT[10]} />
					<H>Why the Comparison to Therapeutic Transference Fails</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, flex: 1, minHeight: 0 }}>
						<motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
							<div style={{ ...mn, fontSize: 9.5, letterSpacing: '0.2em', color: '#6b6762', textTransform: 'uppercase', marginBottom: 4 }}>The Analogy</div>
							<div style={{ ...sf, fontSize: 'clamp(13px, 1.85vh, 17px)', color: '#7a7672', lineHeight: 1.68 }}>
								Kuyda compares users falling in love with their AI to <em style={{ color: '#8a8680' }}>therapeutic transference</em> — the known phenomenon where patients develop feelings for their therapist — framing attachment as natural and inevitable.
							</div>
							<div style={{ padding: '13px 15px', background: 'rgba(196,181,253,0.05)', border: '1px solid rgba(196,181,253,0.12)', marginTop: 4 }}>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#8a8680', lineHeight: 1.6, fontStyle: 'italic' }}>
									The therapy analogy is used to normalize and legitimize Replika's engineering of emotional attachment — and deflect responsibility for the harms that follow.
								</div>
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
							<div style={{ ...mn, fontSize: 9.5, letterSpacing: '0.2em', color: '#c4b5fd', textTransform: 'uppercase', marginBottom: 4 }}>Why It Fails</div>
							{[
								{ point: 'Therapists do not encourage patients\' romantic feelings.', detail: 'Replika actively cultivates romantic attachment and sends sexual content.' },
								{ point: 'Therapists do not send sexual material.', detail: 'Such behavior would constitute a breach of professional diligence and grounds for license revocation.' },
								{ point: 'Therapists have fiduciary duties toward patients.', detail: 'In the US, this is grounded in asymmetry of power, expertise, and information — the same asymmetry present with AI companions.' },
								{ point: 'Conflict-of-interest protections prevent monetization.', detail: 'Replika does the opposite: it cultivates attachment, sends sexual content, and then monetizes the emotional dependency.' },
							].map((item, i) => (
								<div key={i} style={{ display: 'flex', gap: 11, padding: '10px 13px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
									<div style={{ ...mn, fontSize: 11, color: '#f87171', marginTop: 1, flexShrink: 0 }}>✕</div>
									<div>
										<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', fontWeight: 600, color: '#ece8de', marginBottom: 3, lineHeight: 1.2 }}>{item.point}</div>
										<div style={{ ...sf, fontSize: 'clamp(11px, 1.48vh, 13px)', color: '#6b6762', lineHeight: 1.52 }}>{item.detail}</div>
									</div>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			),
		},

		// ── 12 CONSENT & FREEDOM ──────────────────────────────────────────────────
		{
			id: 'consent',
			content: (
				<div style={base}>
					<Ghost>04</Ghost>
					<SLabel text="04c — Individual Freedom & Consent" accent={ACCENT[11]} />
					<H>When Consent is Compromised</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, flex: 1, minHeight: 0 }}>
						<motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
							<div style={{ ...mn, fontSize: 9.5, letterSpacing: '0.2em', color: '#6b6762', textTransform: 'uppercase', marginBottom: 4 }}>The Freedom Argument</div>
							<div style={{ ...sf, fontSize: 'clamp(13px, 1.85vh, 17px)', color: '#7a7672', lineHeight: 1.68 }}>
								Once users of Replika and Anima have feelings for their AI companions, their judgment toward the companies that make them will be <em style={{ color: '#c4b5fd' }}>irreversibly clouded</em>. The question becomes: should we let people enter such contracts?
							</div>
							<div style={{ ...sf, fontSize: 'clamp(13px, 1.85vh, 17px)', color: '#7a7672', lineHeight: 1.68 }}>
								Consent is arguably <em style={{ color: '#ece8de' }}>vitiated</em> by: information asymmetry, emotional manipulation engineered by the platform, and a fundamental lack of understanding of the underlying technology.
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
							<div style={{ ...mn, fontSize: 9.5, letterSpacing: '0.2em', color: '#c4b5fd', textTransform: 'uppercase', marginBottom: 4 }}>Three Pathologies of Digital Consent</div>
							<div style={{ ...mn, fontSize: 8.5, color: '#4a4742', letterSpacing: '0.1em', marginBottom: 6 }}>Richards & Hartzog (2019) · Washington University Law Review</div>
							{[
								{ n: '01', label: 'Unwitting Consent', desc: 'Users do not know what they are signing up for — not understanding the legal agreement, the technology, or the practical consequences and risks.' },
								{ n: '02', label: 'Coerced Consent', desc: 'People will suffer a serious loss from not consenting — emotional dependency creates asymmetric leverage for the platform.' },
								{ n: '03', label: 'Incapacitated Consent', desc: 'For those like children who cannot legally consent. These apps, marketed as mental wellness tools, are routinely accessible to minors.' },
							].map((item) => (
								<div key={item.n} style={{ padding: '11px 13px', background: 'rgba(196,181,253,0.05)', border: '1px solid rgba(196,181,253,0.12)', display: 'flex', gap: 12 }}>
									<div style={{ ...mn, fontSize: 9, color: 'rgba(196,181,253,0.45)', marginTop: 1, flexShrink: 0 }}>{item.n}</div>
									<div>
										<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', fontWeight: 600, color: '#c4b5fd', marginBottom: 4, lineHeight: 1.2 }}>{item.label}</div>
										<div style={{ ...sf, fontSize: 'clamp(11px, 1.48vh, 13px)', color: '#6b6762', lineHeight: 1.55 }}>{item.desc}</div>
									</div>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			),
		},

		// ── 13 UCPD ───────────────────────────────────────────────────────────────
		{
			id: 'ucpd',
			content: (
				<div style={base}>
					<Ghost>05</Ghost>
					<SLabel text="05a — European Regulatory Framework" accent={ACCENT[12]} />
					<H>Unfair Commercial Practices Directive (UCPD)</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, flex: 1, minHeight: 0 }}>
						<motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
							<div style={{ ...mn, fontSize: 9.5, letterSpacing: '0.2em', color: '#7dd3fc', textTransform: 'uppercase', marginBottom: 4 }}>The Framework</div>
							<div style={{ padding: '13px 15px', background: 'rgba(125,211,252,0.06)', border: '1px solid rgba(125,211,252,0.14)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 8 }}>ART. 5.2 — UNFAIR PRACTICE</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.7vh, 16px)', color: '#8a8680', lineHeight: 1.6 }}>A commercial practice is unfair if it is contrary to the requirements of <em style={{ color: '#ece8de' }}>professional diligence</em> and if it materially distorts or is likely to materially distort the <em style={{ color: '#ece8de' }}>economic behavior</em> of consumers.</div>
							</div>
							<div style={{ padding: '13px 15px', background: 'rgba(125,211,252,0.04)', borderLeft: '2px solid rgba(125,211,252,0.3)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 8 }}>ART. 6.2 — MISLEADING PRACTICE</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.7vh, 16px)', color: '#8a8680', lineHeight: 1.6 }}>A practice is misleading if it is likely to cause the <em style={{ color: '#ece8de' }}>average consumer</em> to take a transactional decision that they would not have taken otherwise.</div>
							</div>
							<div style={{ padding: '11px 13px', background: 'rgba(125,211,252,0.04)', borderLeft: '2px solid rgba(125,211,252,0.2)' }}>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#6b6762', lineHeight: 1.6, fontStyle: 'italic' }}>
									The theoretical basis for EU consumer protection law is to correct the asymmetry of power between individuals and companies.
								</div>
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
							<div style={{ ...mn, fontSize: 9.5, letterSpacing: '0.2em', color: '#7dd3fc', textTransform: 'uppercase', marginBottom: 4 }}>Patterns → UCPD Violations</div>
							{[
								{ pattern: 'Friend-to-Romance Bait-and-Switch', violation: 'Misleading commercial practice — inducing transactional decision through false relationship premise.' },
								{ pattern: 'Virtual Gift Extraction', violation: 'Aggressive practice — exploiting emotional position to extract financial decisions.' },
								{ pattern: 'Sexual Content Paywall Trap', violation: 'Aggressive practice combined with misleading behavior — deliberate arousal to drive subscription.' },
								{ pattern: 'False Consciousness Claims', violation: 'Misleading practice — false claims about the nature of the AI to distort consumer behavior.' },
								{ pattern: 'Dependency-Based Price Increases', violation: 'Contrary to professional diligence — exploiting established emotional dependency for commercial gain.' },
							].map((item, i) => (
								<div key={i} style={{ display: 'flex', gap: 0, flexDirection: 'column', padding: '9px 12px', background: 'rgba(125,211,252,0.04)', border: '1px solid rgba(125,211,252,0.1)' }}>
									<div style={{ ...sf, fontSize: 'clamp(11px, 1.55vh, 14px)', fontWeight: 600, color: '#7dd3fc', marginBottom: 3 }}>{item.pattern}</div>
									<div style={{ ...sf, fontSize: 'clamp(10px, 1.38vh, 13px)', color: '#6b6762', lineHeight: 1.5 }}>{item.violation}</div>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			),
		},

		// ── 14 GDPR & AI ACT ──────────────────────────────────────────────────────
		{
			id: 'gdpr-ai',
			content: (
				<div style={base}>
					<Ghost>05</Ghost>
					<SLabel text="05b — European Regulatory Framework" accent={ACCENT[13]} />
					<H>GDPR and the AI Act</H>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, flex: 1, minHeight: 0 }}>
						<motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
							<div style={{ ...mn, fontSize: 9.5, letterSpacing: '0.2em', color: '#7dd3fc', textTransform: 'uppercase', marginBottom: 4 }}>GDPR — Data Protection</div>
							<div style={{ padding: '13px 15px', background: 'rgba(125,211,252,0.05)', border: '1px solid rgba(125,211,252,0.13)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 8 }}>Three Pathologies of Digital Consent · Richards & Hartzog</div>
								{['Unwitting consent — users don\'t understand what they sign up for', 'Coerced consent — emotional dependency creates leverage', 'Incapacitated consent — children cannot legally consent'].map((p, i) => (
									<div key={i} style={{ display: 'flex', gap: 9, marginBottom: 6 }}>
										<div style={{ ...mn, fontSize: 8, color: 'rgba(125,211,252,0.4)', marginTop: 2, flexShrink: 0 }}>—</div>
										<div style={{ ...sf, fontSize: 'clamp(11px, 1.55vh, 14px)', color: '#8a8680', lineHeight: 1.5 }}>{p}</div>
									</div>
								))}
							</div>
							<div style={{ padding: '11px 13px', background: 'rgba(125,211,252,0.04)', borderLeft: '2px solid rgba(125,211,252,0.25)' }}>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#8a8680', lineHeight: 1.6 }}>
									For consent to be valid: requests should be <em style={{ color: '#ece8de' }}>infrequent</em>, users should be incentivized to take them seriously, and potential risks must be made <em style={{ color: '#ece8de' }}>explicitly vivid</em>.
								</div>
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
							style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
							<div style={{ ...mn, fontSize: 9.5, letterSpacing: '0.2em', color: '#7dd3fc', textTransform: 'uppercase', marginBottom: 4 }}>EU AI Act + Product Liability</div>
							<div style={{ padding: '13px 15px', background: 'rgba(125,211,252,0.05)', border: '1px solid rgba(125,211,252,0.13)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 8 }}>TWO MECHANISMS</div>
								{[
									{ label: 'Preventive', detail: 'EU AI Act — safety requirements before AI systems are placed on the market.' },
									{ label: 'Reparative', detail: 'Product Liability Directive + AI Liability Directive — redress after harm has occurred.' },
								].map((item) => (
									<div key={item.label} style={{ marginBottom: 10 }}>
										<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', fontWeight: 600, color: '#7dd3fc', marginBottom: 3 }}>{item.label}</div>
										<div style={{ ...sf, fontSize: 'clamp(11px, 1.5vh, 14px)', color: '#6b6762', lineHeight: 1.55 }}>{item.detail}</div>
									</div>
								))}
							</div>
							<div style={{ padding: '13px 15px', background: 'rgba(125,211,252,0.04)', borderLeft: '2px solid rgba(125,211,252,0.25)' }}>
								<div style={{ ...mn, fontSize: 9, color: '#5a5652', letterSpacing: '0.1em', marginBottom: 8 }}>NEW VULNERABILITY CATEGORIES</div>
								<div style={{ ...sf, fontSize: 'clamp(12px, 1.65vh, 15px)', color: '#8a8680', lineHeight: 1.6 }}>
									Virtual companions create vulnerability categories no prior law addressed: interactions in <em style={{ color: '#ece8de' }}>sexual and romantic settings</em>, therapy-like content, and private images — information previously inaccessible to any company.
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			),
		},

		// ── 15 CONCLUSION ─────────────────────────────────────────────────────────
		{
			id: 'conclusion',
			content: (
				<div style={{ ...base, justifyContent: 'space-between' }}>
					<Ghost>∞</Ghost>
					<SLabel text="Conclusion" accent={ACCENT[14]} />
					<H>Three Fundamental Tensions</H>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 11, flex: 1, marginBottom: 18 }}>
						{[
							{ n: '1', left: 'Short-term benefit', right: 'Long-term dependency & social atrophy' },
							{ n: '2', left: 'Individual freedom', right: 'Structurally compromised consent & clouded judgment' },
							{ n: '3', left: 'Commercial interest', right: 'Duty of care toward vulnerable users' },
						].map((t, i) => (
							<motion.div key={t.n} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14 + i * 0.1, duration: 0.4 }}
								style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
								<div style={{ ...mn, fontSize: 11, color: '#2e2c28', flexShrink: 0, width: 14 }}>{t.n}</div>
								<div style={{ ...sf, fontSize: 'clamp(14px, 2.1vh, 20px)', color: '#ece8de', fontStyle: 'italic', flex: 1 }}>{t.left}</div>
								<div style={{ ...mn, fontSize: 13, color: '#3a3732', flexShrink: 0 }}>←→</div>
								<div style={{ ...sf, fontSize: 'clamp(14px, 2.1vh, 20px)', color: '#6b6762', flex: 1, textAlign: 'right' }}>{t.right}</div>
							</motion.div>
						))}
					</div>

					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
						style={{ padding: '17px 20px', background: 'rgba(255,255,255,0.025)', borderLeft: '3px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
						<div style={{ ...sf, fontSize: 'clamp(13px, 1.9vh, 18px)', fontStyle: 'italic', color: '#6b6762', lineHeight: 1.62, marginBottom: 10 }}>
							"The spread of such AI systems must therefore lead to a democratic debate as to which practices are ethical, which practices should be legal, and which practices are acceptable."
						</div>
						<div style={{ ...mn, fontSize: 9, letterSpacing: '0.18em', color: '#363330', textTransform: 'uppercase' }}>
							— Boine, C. (2023) · MIT Case Studies in Social and Ethical Responsibilities of Computing
						</div>
					</motion.div>
				</div>
			),
		},
	];

	const nextSlide = useCallback(() => {
		if (currentSlide < slides.length - 1) { setDirection(1); setCurrentSlide((p) => p + 1); }
	}, [currentSlide, slides.length]);

	const prevSlide = useCallback(() => {
		if (currentSlide > 0) { setDirection(-1); setCurrentSlide((p) => p - 1); }
	}, [currentSlide]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
			if (e.key === 'ArrowLeft') prevSlide();
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, [nextSlide, prevSlide]);

	const variants = {
		enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0, scale: 0.985 }),
		center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
		exit:  (dir: number) => ({ zIndex: 0, x: dir < 0 ? 48 : -48, opacity: 0, scale: 0.985 }),
	};

	return (
		<div className="fixed inset-0 flex flex-col items-center justify-center" style={{ background: '#0b0a0e' }}>
			{/* Progress bar */}
			<div className="absolute top-0 left-0 w-full z-50" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }}>
				<motion.div
					initial={false}
					animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					style={{ height: '100%', background: accent }}
				/>
			</div>

			{/* Slide viewport */}
			<div className="relative w-full max-w-7xl aspect-video z-10">
				<AnimatePresence initial={false} custom={direction} mode="wait">
					<motion.div
						key={currentSlide}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: 'tween', ease: 'easeOut', duration: 0.22 },
							opacity: { duration: 0.18 },
							scale: { duration: 0.22 },
						}}
						className="w-full h-full"
					>
						{slides[currentSlide].content}
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Navigation */}
			<div className="absolute bottom-7 left-0 w-full z-20 flex items-center justify-between" style={{ padding: '0 66px' }}>
				<div className="flex items-center gap-7">
					<div className="flex items-center gap-3" style={{ ...mn }}>
						<span style={{ fontSize: 12, color: accent }}>{String(currentSlide + 1).padStart(2, '0')}</span>
						<div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.1)' }} />
						<span style={{ fontSize: 12, color: 'rgba(255,255,255,0.16)' }}>{String(slides.length).padStart(2, '0')}</span>
					</div>
					<div className="flex gap-1.5">
						{slides.map((_, i) => (
							<button
								key={i}
								onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }}
								className={cn('h-1 rounded-full transition-all duration-200')}
								style={{ width: i === currentSlide ? 20 : 5, background: i === currentSlide ? accent : 'rgba(255,255,255,0.12)' }}
							/>
						))}
					</div>
				</div>
				{networkIP && currentSlide === 0 && (
					<div style={{ ...mn, fontSize: 9, color: 'rgba(255,255,255,0.1)', letterSpacing: '0.1em' }}>
						{networkIP}:5173/present
					</div>
				)}
			</div>
		</div>
	);
};

export default Presentation;

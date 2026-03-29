"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";

interface Message {
  role: "user" | "ai";
  text: string;
  loading?: boolean;
}

interface Country {
  name: string;
  code: string;
}

const PINS: (Country & { lat: number; lng: number })[] = [
  { name: "United Kingdom", code: "GB", lat: 51.5, lng: -0.1 },
  { name: "Germany", code: "DE", lat: 52.5, lng: 13.4 },
  { name: "Canada", code: "CA", lat: 45.4, lng: -75.7 },
  { name: "Australia", code: "AU", lat: -33.9, lng: 151.2 },
  { name: "Japan", code: "JP", lat: 35.7, lng: 139.7 },
  { name: "United States", code: "US", lat: 40.7, lng: -74.0 },
  { name: "Netherlands", code: "NL", lat: 52.4, lng: 4.9 },
  { name: "Singapore", code: "SG", lat: 1.3, lng: 103.8 },
  { name: "New Zealand", code: "NZ", lat: -36.9, lng: 174.8 },
  { name: "France", code: "FR", lat: 48.9, lng: 2.3 },
  { name: "UAE", code: "AE", lat: 25.2, lng: 55.3 },
  { name: "Ireland", code: "IE", lat: 53.3, lng: -6.3 },
];

function project3D(lat: number, lng: number, rx: number, ry: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  let x = -Math.sin(phi) * Math.cos(theta);
  let y = Math.cos(phi);
  let z = Math.sin(phi) * Math.sin(theta);
  const cosY = Math.cos(ry), sinY = Math.sin(ry);
  const x1 = x * cosY + z * sinY;
  const z1 = -x * sinY + z * cosY;
  x = x1; z = z1;
  const cosX = Math.cos(rx), sinX = Math.sin(rx);
  const y1 = y * cosX - z * sinX;
  const z2 = y * sinX + z * cosX;
  y = y1; z = z2;
  return { x, y, z, visible: z > 0 };
}

interface GeoFeature {
  id: string;
  polygons: [number, number][][];
}

interface TopoData {
  objects: { countries: { geometries: TopoGeometry[] } };
  arcs: [number, number][][];
  transform?: { scale: [number, number]; translate: [number, number] };
}

interface TopoGeometry {
  id: string | number;
  type: string;
  arcs: unknown;
}

function topoToGeo(topo: TopoData): GeoFeature[] {
  const scale = topo.transform?.scale || [1, 1];
  const translate = topo.transform?.translate || [0, 0];
  const decodeArc = (arc: [number, number][]): [number, number][] => {
    let x = 0, y = 0;
    return arc.map(([dx, dy]) => {
      x += dx; y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  };
  const getArc = (i: number): [number, number][] =>
    i < 0 ? (decodeArc(topo.arcs[~i]).reverse() as [number, number][]) : decodeArc(topo.arcs[i]);
  const stitchArcs = (indices: number[]): [number, number][] => indices.flatMap(getArc);
  return topo.objects.countries.geometries.flatMap((geom) => {
    const id = String(geom.id);
    const polygons: [number, number][][] = [];
    if (geom.type === "Polygon") {
      (geom.arcs as number[][]).forEach((ring) => polygons.push(stitchArcs(ring)));
    } else if (geom.type === "MultiPolygon") {
      (geom.arcs as number[][][]).forEach((poly) =>
        poly.forEach((ring) => polygons.push(stitchArcs(ring)))
      );
    }
    return polygons.length > 0 ? [{ id, polygons }] : [];
  });
}

// ─── Globe Canvas ─────────────────────────────────────────────────────────────

function GlobeCanvas({ onCountryClick, selectedCountry }: {
  onCountryClick: (c: Country) => void;
  selectedCountry: Country | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0.3, y: 0 });
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const geoRef = useRef<GeoFeature[]>([]);
  const hoveredRef = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((r) => r.json())
      .then((topo: TopoData) => { geoRef.current = topoToGeo(topo); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width, H = rect.height;
      const cx = W / 2, cy = H / 2;
      const r = Math.min(W, H) * 0.42;
      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;

      ctx.clearRect(0, 0, W, H);

      // Deep space background gradient
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H));
      bgGrad.addColorStop(0, "#1a1040");
      bgGrad.addColorStop(1, "#05050f");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Stars
      const starCount = 120;
      for (let i = 0; i < starCount; i++) {
        const sx = ((i * 137.5) % W);
        const sy = ((i * 97.3) % H);
        const sr = (i % 3 === 0) ? 1.2 : 0.6;
        const alpha = 0.2 + (i % 5) * 0.1;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,180,255,${alpha})`;
        ctx.fill();
      }

      // Atmosphere outer glow
      const atmOuter = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.18);
      atmOuter.addColorStop(0, "rgba(120,60,220,0.22)");
      atmOuter.addColorStop(0.5, "rgba(80,40,180,0.08)");
      atmOuter.addColorStop(1, "rgba(60,20,140,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.18, 0, Math.PI * 2);
      ctx.fillStyle = atmOuter;
      ctx.fill();

      // Ocean
      const oceanGrad = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, 0, cx, cy, r);
      oceanGrad.addColorStop(0, "#2a1f5a");
      oceanGrad.addColorStop(0.6, "#160d35");
      oceanGrad.addColorStop(1, "#0d0820");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrad;
      ctx.fill();

      // Countries
      geoRef.current.forEach((feature) => {
        const isSelected = selectedCountry?.code === feature.id;
        const isHovered = hoveredRef.current === feature.id;
        feature.polygons.forEach((polygon) => {
          ctx.beginPath();
          let penDown = false;
          polygon.forEach(([lng, lat]) => {
            const p = project3D(lat, lng, rx, ry);
            if (!p.visible) { penDown = false; return; }
            const px = cx + p.x * r, py = cy - p.y * r;
            if (!penDown) { ctx.moveTo(px, py); penDown = true; }
            else ctx.lineTo(px, py);
          });
          ctx.closePath();
          if (isSelected) {
            ctx.fillStyle = "rgba(139,92,246,0.7)";
            ctx.strokeStyle = "#c4b5fd";
            ctx.lineWidth = 1.5;
          } else if (isHovered) {
            ctx.fillStyle = "rgba(124,58,237,0.4)";
            ctx.strokeStyle = "#a78bfa";
            ctx.lineWidth = 1;
          } else {
            ctx.fillStyle = "rgba(180,160,255,0.08)";
            ctx.strokeStyle = "rgba(180,160,255,0.18)";
            ctx.lineWidth = 0.5;
          }
          ctx.fill();
          ctx.stroke();
        });
      });

      // Globe rim
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(140,100,255,0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Highlight shimmer (top-left)
      const shimmer = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, 0, cx - r * 0.35, cy - r * 0.35, r * 0.6);
      shimmer.addColorStop(0, "rgba(255,255,255,0.06)");
      shimmer.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = shimmer;
      ctx.fill();

      // Pins
      PINS.forEach((pin) => {
        const p = project3D(pin.lat, pin.lng, rx, ry);
        if (!p.visible || p.z < 0.08) return;
        const px = cx + p.x * r, py = cy - p.y * r;
        const isActive = hoveredRef.current === pin.code || selectedCountry?.code === pin.code;

        if (isActive) {
          ctx.beginPath();
          ctx.arc(px, py, 16, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(167,139,250,0.2)";
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(px, py, isActive ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "#e9d5ff" : "#8b5cf6";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (isActive) {
          ctx.font = "bold 11px -apple-system, sans-serif";
          ctx.textAlign = "center";
          const tw = ctx.measureText(pin.name).width;
          const lx = px - tw / 2 - 8, ly = py - 30;
          ctx.fillStyle = "rgba(10,5,25,0.92)";
          ctx.beginPath();
          ctx.roundRect(lx, ly, tw + 16, 20, 4);
          ctx.fill();
          ctx.strokeStyle = "rgba(167,139,250,0.6)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = "#e9d5ff";
          ctx.fillText(pin.name, px, ly + 14);
        }
      });

      if (!isDraggingRef.current) rotationRef.current.y += 0.0018;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [loaded, selectedCountry]);

  const getClosestPin = (e: React.MouseEvent<HTMLCanvasElement>): typeof PINS[0] | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const r = Math.min(rect.width, rect.height) * 0.42;
    let closest: typeof PINS[0] | null = null;
    let closestDist = 28;
    PINS.forEach((pin) => {
      const p = project3D(pin.lat, pin.lng, rotationRef.current.x, rotationRef.current.y);
      if (!p.visible) return;
      const dist = Math.sqrt((mx - (cx + p.x * r)) ** 2 + (my - (cy - p.y * r)) ** 2);
      if (dist < closestDist) { closestDist = dist; closest = pin; }
    });
    return closest;
  };

  return (
    <div className="absolute inset-0">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#05050f]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
            <p className="text-white/40 text-sm">Loading globe...</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: loaded ? "block" : "none", cursor: "grab" }}
        onMouseMove={(e) => {
          if (isDraggingRef.current) {
            rotationRef.current.y += (e.clientX - lastPosRef.current.x) * 0.005;
            rotationRef.current.x += (e.clientY - lastPosRef.current.y) * 0.003;
            rotationRef.current.x = Math.max(-1.2, Math.min(1.2, rotationRef.current.x));
            lastPosRef.current = { x: e.clientX, y: e.clientY };
          }
          const c = getClosestPin(e);
          hoveredRef.current = c ? c.code : null;
        }}
        onMouseDown={(e) => {
          isDraggingRef.current = true;
          lastPosRef.current = { x: e.clientX, y: e.clientY };
          (e.currentTarget as HTMLCanvasElement).style.cursor = "grabbing";
        }}
        onMouseUp={(e) => { isDraggingRef.current = false; (e.currentTarget as HTMLCanvasElement).style.cursor = "grab"; }}
        onMouseLeave={() => { isDraggingRef.current = false; hoveredRef.current = null; }}
        onClick={(e) => { const c = getClosestPin(e); if (c) onCountryClick(c); }}
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FrameworkPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (q: string, country?: Country | null) => {
    const activeCountry = country !== undefined ? country : selectedCountry;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: q },
      { role: "ai", text: "", loading: true },
    ]);
    setPanelOpen(true);

    try {
      const res = await fetch("/api/framework", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, country: activeCountry?.name || null }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: data.answer || "No response received." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: "Connection error. Please try again." },
      ]);
    }
  }, [selectedCountry]);

  const handleCountryClick = useCallback((country: Country) => {
    setSelectedCountry(country);
    setPanelOpen(true);
    setMessages([]);
    sendMessage(
      `Give me a real honest overview of life in ${country.name} for Indians — visa rules, work rights, cost of living, and what people actually experience. Use the Question → Consequence → Reality framework.`,
      country
    );
  }, [sendMessage]);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "#05050f" }}>

      {/* Globe fills entire screen — never shrinks */}
      <GlobeCanvas onCountryClick={handleCountryClick} selectedCountry={selectedCountry} />

      {/* Header on top */}
      <div className="absolute top-0 left-0 right-0 z-40">
        <Header />
      </div>

      {/* Floating search bar — centered, always visible */}
      <div className="absolute top-16 left-0 right-0 z-50 flex flex-col items-center px-4 pt-4">
        <div className="w-full max-w-lg">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/15
            flex items-center gap-2 px-4 py-2 shadow-2xl
            focus-within:border-violet-500/60 focus-within:bg-black/50 transition-all">
            <svg className="w-4 h-4 text-white/35 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              className="flex-1 bg-transparent outline-none text-white text-sm placeholder-white/30 py-1.5 min-w-0"
              placeholder="Ask anything or click a country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  sendMessage(searchQuery.trim());
                  setSearchQuery("");
                }
              }}
            />
            {selectedCountry && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs shrink-0"
                style={{ background: "rgba(124,58,237,0.4)", color: "#ddd6fe", border: "1px solid rgba(167,139,250,0.3)" }}>
                <span className="max-w-[72px] truncate">{selectedCountry.name}</span>
                <button onClick={() => setSelectedCountry(null)} className="hover:text-white ml-0.5">✕</button>
              </div>
            )}
            <button
              onClick={() => { if (searchQuery.trim()) { sendMessage(searchQuery.trim()); setSearchQuery(""); } }}
              disabled={!searchQuery.trim()}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-white shrink-0 disabled:opacity-30 transition-all"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}>
              Ask
            </button>
          </div>

          {/* Quick chips — hide when panel open */}
          {!panelOpen && (
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {["Work on student visa in Germany?", "Real cost in Canada?", "PR in Australia?", "Dubai for Indians?"].map((q) => (
                <button key={q}
                  onClick={() => { sendMessage(q); }}
                  className="text-xs px-3 py-1 rounded-full border border-white/12 text-white/40
                    hover:border-violet-400/60 hover:text-violet-300 transition-all bg-black/30 backdrop-blur-sm">
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating chat panel — overlays globe on right, doesn't shrink globe */}
      <div
        className="absolute top-0 right-0 bottom-0 z-30 flex flex-col transition-all duration-500 ease-in-out"
        style={{
          width: panelOpen ? "420px" : "0px",
          opacity: panelOpen ? 1 : 0,
          pointerEvents: panelOpen ? "auto" : "none",
        }}>
        <div className="flex flex-col h-full"
          style={{
            background: "rgba(15,10,35,0.85)",
            backdropFilter: "blur(24px)",
            borderLeft: "1px solid rgba(124,58,237,0.2)",
            boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
          }}>

          {/* Panel header */}
          <div className="px-5 py-4 flex items-center gap-3 shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)" }}>B</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">BridgeTheGap AI</p>
              <p className="text-xs text-white/40 truncate">
                {selectedCountry ? `Exploring ${selectedCountry.name}` : "Ask about any country"}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <button onClick={() => setPanelOpen(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-white/40
                  hover:text-white hover:bg-white/10 transition-all text-sm ml-1">
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="text-3xl mb-3">🌐</div>
                <p className="text-sm font-semibold text-white/70 mb-1">
                  {selectedCountry ? `Exploring ${selectedCountry.name}` : "Click any country on the globe"}
                </p>
                <p className="text-xs text-white/35 leading-relaxed">
                  Real visa rules, costs, work rights — what people actually experience.
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                  ${msg.role === "user" ? "text-white rounded-br-sm" : "rounded-bl-sm"}`}
                  style={msg.role === "user"
                    ? { background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }
                    : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" }}>
                  {msg.loading ? (
                    <div className="flex gap-1 items-center py-1">
                      {[0, 150, 300].map((d) => (
                        <span key={d} className="w-2 h-2 rounded-full animate-bounce"
                          style={{ background: "#a78bfa", animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                  ) : (
                    <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat input */}
          <div className="px-4 py-3 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex gap-2 items-center rounded-xl px-3 py-2 transition-all"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <input
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/30 py-0.5"
                placeholder={selectedCountry ? `Ask about ${selectedCountry.name}...` : "Ask anything..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputText.trim()) {
                    sendMessage(inputText.trim());
                    setInputText("");
                  }
                }}
              />
              <button
                onClick={() => { if (inputText.trim()) { sendMessage(inputText.trim()); setInputText(""); } }}
                disabled={!inputText.trim()}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white disabled:opacity-30 shrink-0"
                style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.18)" }}>
          Question → Consequence → Reality
        </p>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-5 left-6 z-20 pointer-events-none">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
          Drag to rotate · Click a country
        </p>
      </div>
    </div>
  );
}

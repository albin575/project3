"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, BookOpen, ChevronDown, FileText, GraduationCap, LayoutGrid, Layers, Menu, Search, Sparkles, X, Zap } from "lucide-react";
import { allTopics, modules } from "@/lib/course-content";
import { cn } from "@/lib/utils";

const navigation = [
  { title: "Overview", href: "/", icon: LayoutGrid },
  { title: "Study modules", href: "/modules", icon: BookOpen },
  { title: "Quick revision", href: "/revision", icon: Zap },
  { title: "Practice quiz", href: "/quiz", icon: Layers },
  { title: "Syllabus", href: "/syllabus", icon: FileText },
];

function InstagramIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" /></svg>;
}

export function StudyShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const currentPage = navigation.find((item) => item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));
  const results = query.trim().length > 0 ? allTopics.filter((topic) => `${topic.id} ${topic.title} ${topic.malayalam} ${topic.intro}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 7) : [];

  useEffect(() => {
    function close(event: MouseEvent) { if (!searchRef.current?.contains(event.target as Node)) setQuery(""); }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") { setMenuOpen(false); setQuery(""); } }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", escape); };
  }, []);

  return <div className="study-app">
    <a href="#main-content" className="skip-link">Skip to content</a>
    {menuOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <aside id="main-navigation" className={cn("sidebar", menuOpen && "sidebar-open")}>
      <Link href="/" className="wordmark" onClick={() => setMenuOpen(false)}><span className="brand-symbol"><BookOpen size={23} strokeWidth={2.2} /></span>padippu<span className="brand-dot">.</span></Link>
      <p className="brand-caption">LESS STRESS. MORE AHA.</p>
      <div className="course-switch"><span className="course-icon"><GraduationCap size={21} /></span><span><strong>MG University</strong><small>Degree · Marketing Management</small></span><ChevronDown size={14} /></div>
      <p className="sidebar-label">YOUR STUDY SPACE</p>
      <nav aria-label="Main navigation" className="main-nav">{navigation.map(({ title, href, icon: Icon }) => <Link key={href} href={href} onClick={() => { setMenuOpen(false); setQuery(""); }} aria-current={currentPage?.href === href ? "page" : undefined} className={cn("nav-item", currentPage?.href === href && "active")}><Icon size={18} /><span>{title}</span>{title === "Study modules" && <span className="nav-count">5</span>}{title === "Quick revision" && <span className="mini-new">QUICK</span>}</Link>)}</nav>
      <div className="sidebar-divider" />
      <p className="sidebar-label">THE LEARNING PATH</p>
      <nav aria-label="Course modules" className="module-nav">{modules.map((module) => <Link key={module.id} href={`/modules/${module.id}`} onClick={() => setMenuOpen(false)} className={cn(pathname === `/modules/${module.id}` && "selected")}><span className={cn("module-dot", module.color)} /><span>Module {module.id}</span><span className="module-nav-name">{["The basics", "STP & products", "Brand & pricing", "Promotion", "Teacher-specific"][module.id - 1]}</span></Link>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-note"><Sparkles size={23} /><p>A little progress,<br /><strong>every single day.</strong></p><span lang="ml">പഠിക്കാം, നമ്മുടെ സ്റ്റൈലിൽ.</span></div><div className="made-for"><span className="student-avatar">p.</span><span>Made for curious minds<small>Not just for the marks.</small></span><ArrowUpRight size={15} /></div></div>
    </aside>
    <div className="app-body">
      <header className="topbar">
        <div className="breadcrumb"><button className="mobile-menu icon-button" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><Menu size={21} /></button><span className="breadcrumb-parent">Your classroom</span><span className="breadcrumb-slash">/</span><strong>{currentPage?.title ?? "Study notes"}</strong></div>
        <div className="topbar-right"><div className="search-container" ref={searchRef}><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search topics in English or Malayalam" placeholder="Search anything you want to learn..." autoComplete="off" aria-expanded={Boolean(query.trim())} aria-controls="search-results" />{query ? <button className="search-clear" aria-label="Clear search" onClick={() => setQuery("")}><X size={14} /></button> : <span className="search-hint">Search</span>}{query.trim() && <div id="search-results" className="search-results"><p className="eyebrow">TOPICS · {results.length} MATCHES</p>{results.length ? results.map((topic) => <Link key={topic.id} href={`/modules/${topic.id.split(".")[0]}?topic=${topic.id}`} onClick={() => setQuery("")}><span className="result-number">{topic.id}</span><span><strong>{topic.title}</strong><small lang="ml">{topic.malayalam}</small></span><ArrowUpRight size={15} /></Link>) : <p className="empty-search">No topics found. Try “pricing”, “brand” or “വിപണി”.</p>}</div>}</div><span className="language-pill"><span>അ</span> മലയാളം</span><div className="topbar-avatar" aria-label="Your learning space">S<span /></div></div>
      </header>
      <main id="main-content" className="main-content">{children}</main>
      <footer className="site-footer"><span>Made for understanding. Not just memorising.</span><a className="creator-credit" href="https://www.instagram.com/albin___baby___/" target="_blank" rel="noopener noreferrer"><InstagramIcon /> @albin___baby___</a><span>Independent study notes · Based on your uploaded syllabus</span></footer>
    </div>
  </div>;
}

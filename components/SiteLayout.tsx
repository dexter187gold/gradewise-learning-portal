import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/appdeploy-client';
import { BookOpen, GraduationCap, Menu, X, UserRound, LogOut, ChevronDown } from 'lucide-react';

const links = [
  { href: '/materials', label: 'Materials' },
  { href: '/videos', label: 'Video lessons' },
  { href: '/exams', label: 'Exam centre' },
  { href: '/tutor', label: 'Sage AI tutor' },
  { href: '/quizzes', label: 'AI quizzes' },
];
export function SiteLayout({ children, protectedPage = false }: { children: React.ReactNode; protectedPage?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();
  useEffect(() => {
    let alive = true;
    (async () => {
      try { const user = await auth.getUser(); if (alive) { setSignedIn(!!user); setUserEmail(user?.email || user?.name || 'My account'); } }
      catch { if (alive) setSignedIn(false); }
    })();
    return () => { alive = false; };
  }, [router.asPath]);
  const signIn = async () => {
    try { await auth.signIn({ scope: 'openid email profile offline_access' }); setSignedIn(true); const user = await auth.getUser(); setUserEmail(user?.email || user?.name || 'My account'); await router.push('/account'); }
    catch (e) { const code = (e as { code?: string })?.code; alert(code === 'popup_blocked' ? 'Allow pop-ups for this site to sign in with email.' : code === 'popup_closed' ? 'Sign-in was cancelled. You can try again whenever you are ready.' : 'We could not complete sign-in. Please try again.'); }
  };
  const signOut = async () => { await auth.signOut(); setSignedIn(false); setUserEmail(''); await router.push('/'); };
  return <div className="site-shell">
    <header className="site-header"><Link href="/" className="brand" aria-label="GradeWise home"><span className="brand-icon"><GraduationCap size={25}/></span><span>GradeWise<span className="brand-period">.</span><small>LEARN WITHOUT LIMITS</small></span></Link>
      <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
        {links.map(l => <Link key={l.href} href={l.href} className={router.pathname === l.href ? 'nav-link current' : 'nav-link'} onClick={() => setMenuOpen(false)}>{l.label}</Link>)}
        <div className="nav-more"><button className="nav-link more-trigger" onClick={() => setMenuOpen(!menuOpen)}>More <ChevronDown size={14}/></button><div className="more-menu"><Link href="/about">About</Link><Link href="/pricing">Pricing</Link></div></div>
        {signedIn ? <><Link className="account-link" href="/account"><UserRound size={16}/><span>{userEmail}</span></Link><button className="nav-button nav-outline" onClick={signOut}><LogOut size={15}/> Sign out</button></> : <button className="nav-button nav-outline" onClick={signIn}>Sign in</button>}
        <Link className="nav-button nav-primary" href={signedIn ? '/materials' : '/signin'} onClick={() => setMenuOpen(false)}>{signedIn ? 'Start learning' : 'Create free account'}</Link>
      </nav>
    </header>
    {protectedPage && !signedIn && <div className="session-notice"><BookOpen size={17}/> Learning tools are available after email sign-in. <Link href={'/signin?next=' + encodeURIComponent(router.asPath)}>Sign in to continue →</Link></div>}
    {children}
    <footer className="site-footer"><div className="footer-top"><Link href="/" className="brand footer-brand"><span className="brand-icon"><GraduationCap size={22}/></span><span>GradeWise<span className="brand-period">.</span><small>LEARN WITHOUT LIMITS</small></span></Link><p>Thoughtful learning support for South African learners, from Grade R to Grade 12.</p><div className="footer-links"><Link href="/about">About</Link><Link href="/pricing">Pricing</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} GradeWise Learning Portal</span><span>Learn at your own pace.</span></div></footer>
  </div>;
}
export function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false); const [allowed, setAllowed] = useState(false); const router = useRouter();
  useEffect(() => { let alive = true; (async () => { try { const user = await auth.getUser(); if (!user) { const next = router.asPath && router.asPath.startsWith('/') && !router.asPath.startsWith('//') ? router.asPath : '/materials'; await router.replace('/signin?next=' + encodeURIComponent(next)); } else if (alive) setAllowed(true); } catch { await router.replace('/signin?next=' + encodeURIComponent('/' + String(router.pathname).replace(/^\//, ''))); } finally { if (alive) setReady(true); } })(); return () => { alive = false; }; }, [router]);
  if (!ready || !allowed) return <SiteLayout><main className="loading-page"><div className="spinner"/><h1>Preparing your learning space</h1><p>Checking your secure sign-in…</p></main></SiteLayout>;
  return <>{children}</>;
}

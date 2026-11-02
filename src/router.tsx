// Tiny, dependency-free client-side router (History API).
// Swap for react-router-dom later if you prefer — the API is intentionally similar.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';

interface RouterValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterValue>({ path: '/', navigate: () => {} });

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

export function Router({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => normalize(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    window.history.pushState({}, '', to);
    setPath(normalize(new URL(to, window.location.origin).pathname));
    window.scrollTo({ top: 0 });
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const isExternal = /^(https?:|mailto:|tel:)/.test(to);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (isExternal || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      {...(isExternal && to.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

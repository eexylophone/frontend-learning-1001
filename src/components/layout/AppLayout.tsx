import { Header } from './Header';

interface AppLayoutProps {
  controls: React.ReactNode;
  preview: React.ReactNode;
}

export function AppLayout({ controls, preview }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <Header />
      <main className="editor-shell">
        <aside className="control-rail">{controls}</aside>
        <section className="preview-stage">{preview}</section>
      </main>
    </div>
  );
}

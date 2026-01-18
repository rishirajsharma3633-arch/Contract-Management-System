import type { ReactNode } from 'react';
import { FileText, LayoutDashboard, Settings } from 'lucide-react';

export const Layout = ({ children, activeTab, onTabChange }: {
    children: ReactNode,
    activeTab: string,
    onTabChange: (tab: string) => void
}) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8faf9' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                color: 'white',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '4px 0 24px rgba(0,0,0,0.05)',
                zIndex: 20
            }}>
                <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        padding: '0.625rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)'
                    }}>
                        <FileText size={22} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.375rem', letterSpacing: '-0.02em' }}>ContractFlow</span>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <NavItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        active={activeTab === 'dashboard'}
                        onClick={() => onTabChange('dashboard')}
                    />
                    <NavItem
                        icon={<Settings size={20} />}
                        label="Blueprints"
                        active={activeTab === 'blueprints'}
                        onClick={() => onTabChange('blueprints')}
                    />
                </nav>

                <div style={{ marginTop: 'auto', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Current Version</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>v2.4.0-Premium</p>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
                <header style={{
                    height: '72px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 2.5rem',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10
                }}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                        {activeTab === 'dashboard' ? 'Contracts Dashboard' : 'Blueprint Management'}
                    </h1>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ height: '32px', width: '32px', borderRadius: '50%', background: '#e2e8f0' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Administrator</span>
                    </div>
                </header>
                <div className="container" style={{ padding: '2.5rem' }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, active, onClick }: {
    icon: ReactNode,
    label: string,
    active: boolean,
    onClick: () => void
}) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: active ? '#334155' : 'transparent',
            color: active ? 'white' : '#94a3b8',
            transition: 'all 0.2s',
            width: '100%',
            textAlign: 'left'
        }}
    >
        {icon}
        <span style={{ fontWeight: 500 }}>{label}</span>
    </button>
);

import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'btn',
                    variant === 'primary' && 'btn-primary',
                    variant === 'outline' && 'btn-outline',
                    variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
                    size === 'sm' && 'px-2 py-1 text-xs',
                    size === 'lg' && 'px-6 py-3 text-lg',
                    className
                )}
                {...props}
            >
                {icon && <span className="inline-flex">{icon}</span>}
                {children}
            </button>
        );
    }
);

export const Badge = ({ children, status }: { children: React.ReactNode; status: string }) => {
    const statusClass = `status-${status.toLowerCase()}`;
    return (
        <span className={cn('badge', statusClass)}>
            {children}
        </span>
    );
};

export const Card = ({ children, className, style, title }: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    title?: string;
}) => (
    <div className={cn('card', className)} style={style}>
        {title && <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>{title}</h3>}
        {children}
    </div>
);

export const Input = ({ label, ...props }: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="input-group">
        {label && <label className="input-label">{label}</label>}
        <input className="input-field" {...props} />
    </div>
);

export const Modal = ({ isOpen, onClose, title, children }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode
}) => {
    if (!isOpen) return null;
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease-out'
        }}>
            <div style={{ width: '100%', maxWidth: '500px', animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <Card style={{ padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>{title}</h2>
                        <button
                            onClick={onClose}
                            style={{ border: 'none', background: '#f1f5f9', color: '#64748b', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseOver={(e) => (e.currentTarget.style.background = '#e2e8f0')}
                            onMouseOut={(e) => (e.currentTarget.style.background = '#f1f5f9')}
                        >
                            <X size={20} />
                        </button>
                    </div>
                    {children}
                </Card>
            </div>
        </div>
    );
};

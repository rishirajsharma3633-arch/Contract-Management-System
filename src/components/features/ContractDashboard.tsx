import { useState } from 'react';
import { Eye, CheckCircle, Send, ShieldCheck, Lock, RotateCcw } from 'lucide-react';
import { Button, Badge, Card } from '../ui';
import { useStore } from '../../store/useStore';
import type { Contract, ContractStatus } from '../../types';

export const ContractDashboard = ({ onView }: { onView: (contract: Contract) => void }) => {
    const contracts = useStore(state => state.contracts);
    const updateContractStatus = useStore(state => state.updateContractStatus);
    const [filter, setFilter] = useState<'All' | 'Active' | 'Pending' | 'Signed'>('All');

    const filteredContracts = contracts.filter(c => {
        if (filter === 'All') return true;
        if (filter === 'Active') return c.status !== 'Locked' && c.status !== 'Revoked';
        if (filter === 'Pending') return c.status === 'Created' || c.status === 'Approved' || c.status === 'Sent';
        if (filter === 'Signed') return c.status === 'Signed';
        return true;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>Recent Contracts</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Overview of all active and pending agreements</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '10px' }}>
                    {['All', 'Active', 'Pending', 'Signed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: filter === f ? 'white' : 'transparent',
                                color: filter === f ? '#0f172a' : '#64748b',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                boxShadow: filter === f ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {filteredContracts.length === 0 ? (
                <Card style={{ padding: '5rem', textAlign: 'center', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
                    <div style={{ background: '#f1f5f9', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', marginBottom: '1.5rem', marginInline: 'auto' }}>
                        <Send size={32} style={{ color: '#94a3b8' }} />
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>No contracts found</h3>
                    <p style={{ color: '#64748b', maxWidth: '300px', margin: '0 auto' }}>Navigate to the Blueprints tab to generate your first contract.</p>
                </Card>
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Contract Name</th>
                                <th>Blueprint</th>
                                <th>Status</th>
                                <th>Created Date</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContracts.map(contract => (
                                <tr key={contract.id}>
                                    <td style={{ fontWeight: 600 }}>{contract.name}</td>
                                    <td style={{ color: '#64748b' }}>{contract.blueprintName}</td>
                                    <td><Badge status={contract.status}>{contract.status}</Badge></td>
                                    <td style={{ color: '#64748b' }}>{new Date(contract.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <Button variant="outline" size="sm" onClick={() => onView(contract)} icon={<Eye size={14} />}>
                                                View
                                            </Button>
                                            <StatusActions contract={contract} onStatusChange={updateContractStatus} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const StatusActions = ({ contract, onStatusChange }: {
    contract: Contract,
    onStatusChange: (id: string, s: ContractStatus) => void
}) => {
    const { status, id } = contract;

    return (
        <>
            {status === 'Created' && (
                <>
                    <Button variant="outline" size="sm" onClick={() => onStatusChange(id, 'Approved')} style={{ color: '#166534' }}>
                        <CheckCircle size={14} /> Approve
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onStatusChange(id, 'Revoked')} style={{ color: '#991b1b' }}>
                        <RotateCcw size={14} /> Revoke
                    </Button>
                </>
            )}
            {status === 'Approved' && (
                <Button variant="outline" size="sm" onClick={() => onStatusChange(id, 'Sent')} style={{ color: '#1e40af' }}>
                    <Send size={14} /> Send
                </Button>
            )}
            {status === 'Sent' && (
                <>
                    <Button variant="outline" size="sm" onClick={() => onStatusChange(id, 'Signed')} style={{ color: '#854d0e' }}>
                        <ShieldCheck size={14} /> Sign
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onStatusChange(id, 'Revoked')} style={{ color: '#991b1b' }}>
                        <RotateCcw size={14} /> Revoke
                    </Button>
                </>
            )}
            {status === 'Signed' && (
                <Button variant="outline" size="sm" onClick={() => onStatusChange(id, 'Locked')} style={{ color: '#475569' }}>
                    <Lock size={14} /> Lock
                </Button>
            )}
        </>
    );
};

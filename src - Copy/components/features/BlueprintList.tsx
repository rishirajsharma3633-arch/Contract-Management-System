import { Plus, Trash2, FilePlus } from 'lucide-react';
import { Button, Card } from '../ui';
import { useStore } from '../../store/useStore';
import type { Blueprint } from '../../types';

export const BlueprintList = ({ onAddNew, onGenerateContract }: {
    onAddNew: () => void,
    onGenerateContract: (blueprint: Blueprint) => void
}) => {
    const blueprints = useStore(state => state.blueprints);
    const deleteBlueprint = useStore(state => state.deleteBlueprint);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>Template Library</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Create and manage reusable contract blueprints</p>
                </div>
                <Button onClick={onAddNew} icon={<Plus size={18} />}>Create New Template</Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {blueprints.length === 0 ? (
                    <Card className="col-span-full" style={{ padding: '5rem', textAlign: 'center', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
                        <div style={{ background: '#f1f5f9', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', marginBottom: '1.5rem', marginInline: 'auto' }}>
                            <FilePlus size={32} style={{ color: '#94a3b8' }} />
                        </div>
                        <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>No templates yet</h3>
                        <p style={{ color: '#64748b', maxWidth: '300px', margin: '0 auto' }}>Start by creating a blueprint with your custom fields and positioning.</p>
                    </Card>
                ) : (
                    blueprints.map(blueprint => (
                        <Card key={blueprint.id} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', padding: '0.75rem', borderRadius: '12px', color: '#2563eb' }}>
                                    <FilePlus size={24} />
                                </div>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure? This will also delete all contracts made from this template.')) {
                                            deleteBlueprint(blueprint.id);
                                        }
                                    }}
                                    style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', transition: 'all 0.2s' }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = '#ef4444')}
                                    onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem', color: '#0f172a' }}>{blueprint.name}</h3>
                                <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                                    Last Modified: {new Date(blueprint.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div style={{ padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '10px', fontSize: '0.875rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }}></span>
                                {blueprint.fields.length} Configured Fields
                            </div>

                            <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                                <Button
                                    variant="outline"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                    onClick={() => onGenerateContract(blueprint)}
                                    icon={<Plus size={16} />}
                                >
                                    New Contract
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

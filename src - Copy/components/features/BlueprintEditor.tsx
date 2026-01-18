import { useState, type ReactNode } from 'react';
import { Plus, Save, X, Type, Calendar, CheckSquare, PenTool } from 'lucide-react';
import { Button, Card, Input } from '../ui';
import type { Field, FieldType, Blueprint } from '../../types';
import { useStore } from '../../store/useStore';

export const BlueprintEditor = ({ onSave, onCancel }: { onSave: () => void, onCancel: () => void }) => {
    const [name, setName] = useState('');
    const [fields, setFields] = useState<Field[]>([]);
    const addBlueprint = useStore(state => state.addBlueprint);

    const addField = (type: FieldType) => {
        const newField: Field = {
            id: crypto.randomUUID(),
            type,
            label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
            x: 0,
            y: fields.length * 80, // Default spacing
        };
        setFields([...fields, newField]);
    };

    const removeField = (id: string) => {
        setFields(fields.filter(f => f.id !== id));
    };

    const updateField = (id: string, updates: Partial<Field>) => {
        setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const handleSave = () => {
        if (!name) return alert('Please enter a blueprint name');
        if (fields.length === 0) return alert('Please add at least one field');

        const newBlueprint: Blueprint = {
            id: crypto.randomUUID(),
            name,
            fields,
            createdAt: new Date().toISOString(),
        };

        addBlueprint(newBlueprint);
        onSave();
    };

    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent, field: Field) => {
        setDraggingId(field.id);
        setDragOffset({
            x: e.clientX - field.x,
            y: e.clientY - field.y
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!draggingId) return;

        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        updateField(draggingId, {
            x: Math.max(0, newX),
            y: Math.max(0, newY)
        });
    };

    const handleMouseUp = () => {
        setDraggingId(null);
    };

    return (
        <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Card>
                    <Input
                        label="Template Name"
                        placeholder="e.g. Service Level Agreement v1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Card>

                <div style={{
                    minHeight: '800px',
                    maxHeight: 'calc(100vh - 250px)',
                    background: '#ffffff',
                    backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    border: '1px solid #f1f5f9',
                    borderRadius: '20px',
                    position: 'relative',
                    padding: '2rem',
                    paddingBottom: '200px',
                    overflow: 'auto',
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'
                }}>
                    {fields.length === 0 ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: '#94a3b8'
                        }}>
                            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '50%', marginBottom: '1.5rem' }}>
                                <Plus size={48} />
                            </div>
                            <h3 style={{ fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>Start your template</h3>
                            <p style={{ maxWidth: '300px', textAlign: 'center', fontSize: '0.9375rem' }}>Select fields from the right panel to place them on the canvas. Drag to reposition.</p>
                        </div>
                    ) : (
                        fields.map(field => (
                            <div
                                key={field.id}
                                onMouseDown={(e) => handleMouseDown(e, field)}
                                style={{
                                    position: 'absolute',
                                    left: `${field.x}px`,
                                    top: `${field.y}px`,
                                    width: '320px',
                                    background: draggingId === field.id ? '#ffffff' : '#fcfdfe',
                                    border: draggingId === field.id ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                                    borderRadius: '16px',
                                    padding: '1.25rem',
                                    cursor: draggingId === field.id ? 'grabbing' : 'grab',
                                    boxShadow: draggingId === field.id ? '0 15px 30px -5px rgba(79, 70, 229, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    zIndex: draggingId === field.id ? 100 : 1,
                                    userSelect: 'none',
                                    transition: draggingId === field.id ? 'transform 0.1s ease' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: draggingId === field.id ? 'scale(1.02)' : 'scale(1)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ padding: '0.4rem', background: '#f1f5f9', borderRadius: '8px', color: '#6366f1' }}>
                                            {field.type === 'text' && <Type size={14} />}
                                            {field.type === 'date' && <Calendar size={14} />}
                                            {field.type === 'signature' && <PenTool size={14} />}
                                            {field.type === 'checkbox' && <CheckSquare size={14} />}
                                        </div>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            {field.type}
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeField(field.id);
                                        }}
                                        style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem', borderRadius: '6px', transition: 'all 0.2s' }}
                                        onMouseOver={(e) => (e.currentTarget.style.color = '#ef4444')}
                                        onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <input
                                    value={field.label}
                                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    placeholder="Enter field label..."
                                    style={{
                                        width: '100%',
                                        border: 'none',
                                        background: 'transparent',
                                        fontWeight: 700,
                                        outline: 'none',
                                        fontSize: '0.9375rem',
                                        color: '#0f172a'
                                    }}
                                />
                                <div
                                    style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>X POS</label>
                                        <input
                                            type="number"
                                            value={Math.round(field.x)}
                                            onChange={(e) => updateField(field.id, { x: parseInt(e.target.value) || 0 })}
                                            style={{ width: '100%', fontSize: '0.75rem', padding: '6px', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#f8fafc' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>Y POS</label>
                                        <input
                                            type="number"
                                            value={Math.round(field.y)}
                                            onChange={(e) => updateField(field.id, { y: parseInt(e.target.value) || 0 })}
                                            style={{ width: '100%', fontSize: '0.75rem', padding: '6px', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#f8fafc' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Card title="Available Fields">
                    <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: '1.4' }}>Click to add elements to your contract template.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <FieldButton icon={<Type size={18} />} label="Text Input" onClick={() => addField('text')} />
                        <FieldButton icon={<Calendar size={18} />} label="Date Picker" onClick={() => addField('date')} />
                        <FieldButton icon={<PenTool size={18} />} label="Signature Line" onClick={() => addField('signature')} />
                        <FieldButton icon={<CheckSquare size={18} />} label="Checkbox" onClick={() => addField('checkbox')} />
                    </div>
                </Card>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                    <Button onClick={handleSave} icon={<Save size={20} />} style={{ padding: '1rem' }}>Save Blueprint</Button>
                    <Button variant="outline" onClick={onCancel} style={{ padding: '1rem' }}>Discard Changes</Button>
                </div>
            </aside>
        </div>
    );
};

const FieldButton = ({ icon, label, onClick }: { icon: ReactNode, label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #f1f5f9',
            background: 'white',
            color: '#475569',
            transition: 'all 0.2s',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 700,
            textAlign: 'left',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.borderColor = '#4f46e5';
            e.currentTarget.style.color = '#4f46e5';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(79, 70, 229, 0.1)';
            e.currentTarget.style.transform = 'translateX(4px)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.borderColor = '#f1f5f9';
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
            e.currentTarget.style.transform = 'translateX(0)';
        }}
    >
        <div style={{ color: 'inherit' }}>{icon}</div>
        {label}
    </button>
);

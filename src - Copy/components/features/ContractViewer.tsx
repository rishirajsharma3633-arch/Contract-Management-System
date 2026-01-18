import { useState } from 'react';
import { Save, X, Info, Calendar, Type, CheckSquare, PenTool, Square, Edit3 } from 'lucide-react';
import { Button, Badge, Card, Modal, Input } from '../ui';
import type { Contract, Field } from '../../types';
import { useStore } from '../../store/useStore';

export const ContractViewer = ({ contract, onClose }: { contract: Contract, onClose: () => void }) => {
    const [fields, setFields] = useState<Field[]>(contract.fields);
    const updateContractFields = useStore(state => state.updateContractFields);
    const isLocked = contract.status === 'Locked' || contract.status === 'Revoked';

    // Dragging state
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Modal state
    const [editingField, setEditingField] = useState<Field | null>(null);
    const [tempValue, setTempValue] = useState<string | boolean>('');

    const handleFieldChange = (id: string, value: string | boolean) => {
        if (isLocked) return;
        setFields(fields.map(f => f.id === id ? { ...f, value } : f));
    };

    const updateFieldPosition = (id: string, x: number, y: number) => {
        if (isLocked) return;
        setFields(fields.map(f => f.id === id ? { ...f, x, y } : f));
    };

    const handleMouseDown = (e: React.MouseEvent, field: Field) => {
        if (isLocked) return;
        setDraggingId(field.id);
        setDragOffset({
            x: e.clientX - field.x,
            y: e.clientY - field.y
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!draggingId || isLocked) return;
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        updateFieldPosition(draggingId, Math.max(0, newX), Math.max(0, newY));
    };

    const handleMouseUp = () => {
        setDraggingId(null);
    };

    const openEditModal = (field: Field) => {
        if (isLocked) return;
        setEditingField(field);
        setTempValue(field.value || '');
    };

    const saveModalValue = () => {
        if (editingField) {
            handleFieldChange(editingField.id, tempValue);
            setEditingField(null);
        }
    };

    const handleSave = () => {
        updateContractFields(contract.id, fields);
        onClose();
    };

    const isDirty = JSON.stringify(fields) !== JSON.stringify(contract.fields);

    return (
        <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                    minHeight: '800px',
                    maxHeight: 'calc(100vh - 200px)',
                    background: '#ffffff',
                    backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    border: '1px solid #f1f5f9',
                    borderRadius: '24px',
                    position: 'relative',
                    padding: '4rem 3rem',
                    paddingBottom: '240px',
                    overflow: 'auto',
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02), 0 20px 50px -12px rgba(0,0,0,0.05)'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #4f46e5 0%, #6366f1 100%)' }}></div>

                    <div style={{ marginBottom: '3rem', borderBottom: '2px solid #f8fafc', paddingBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.04em' }}>
                            {contract.name}
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>
                            Reference Template: <span style={{ color: '#4f46e5' }}>{contract.blueprintName}</span> • Created {new Date(contract.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    {fields.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '10rem' }}>
                            <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>No interactive fields in this contract.</p>
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
                                    width: '340px',
                                    padding: '1.5rem',
                                    background: draggingId === field.id ? '#ffffff' : '#ffffff',
                                    border: draggingId === field.id ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                                    borderRadius: '20px',
                                    boxShadow: draggingId === field.id
                                        ? '0 20px 25px -5px rgba(79, 70, 229, 0.1), 0 10px 10px -5px rgba(79, 70, 229, 0.04)'
                                        : '0 10px 15px -3px rgba(0,0,0,0.04), 0 4px 6px -2px rgba(0,0,0,0.02)',
                                    zIndex: draggingId === field.id ? 100 : 1,
                                    cursor: isLocked ? 'default' : (draggingId === field.id ? 'grabbing' : 'grab'),
                                    transition: draggingId === field.id ? 'transform 0.1s ease' : 'transform 0.2s ease, box-shadow 0.2s ease',
                                    transform: draggingId === field.id ? 'scale(1.02)' : 'scale(1)',
                                    userSelect: 'none'
                                }}
                            >
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    color: '#94a3b8',
                                    marginBottom: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}>
                                    <div style={{ padding: '0.35rem', background: '#f8fafc', borderRadius: '6px', color: '#6366f1' }}>
                                        {field.type === 'text' && <Type size={12} />}
                                        {field.type === 'date' && <Calendar size={12} />}
                                        {field.type === 'checkbox' && <CheckSquare size={12} />}
                                        {field.type === 'signature' && <PenTool size={12} />}
                                    </div>
                                    {field.label}
                                </label>

                                {isLocked ? (
                                    <div style={{
                                        padding: '1rem',
                                        background: '#f8fafc',
                                        borderRadius: '12px',
                                        border: '1px solid #f1f5f9',
                                        color: '#0f172a',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        fontFamily: field.type === 'signature' ? '"Brush Script MT", "Dancing Script", cursive' : 'inherit',
                                        minHeight: '44px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        {field.type === 'checkbox' ? (field.value ? '✓ Verified' : '✗ Declined') : (field.value || '—')}
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => openEditModal(field)}
                                        style={{
                                            position: 'relative',
                                            cursor: 'pointer',
                                            background: '#fcfdfe',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            padding: '0.875rem 1rem',
                                            minHeight: field.type === 'signature' ? '80px' : '48px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: field.type === 'signature' ? 'center' : 'flex-start',
                                            color: field.value ? '#0f172a' : '#94a3b8',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseOver={(e) => (e.currentTarget.style.borderColor = '#4f46e5')}
                                        onMouseOut={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                                    >
                                        {field.type === 'checkbox' ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '6px',
                                                    border: `2px solid ${field.value ? '#22c55e' : '#cbd5e1'}`,
                                                    background: field.value ? '#22c55e' : 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white'
                                                }}>
                                                    {field.value && <Square size={12} fill="currentColor" />}
                                                </div>
                                                <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: field.value ? '#166534' : '#64748b' }}>
                                                    {field.value ? 'Acceptance Confirmed' : 'Action Required'}
                                                </span>
                                            </div>
                                        ) : field.type === 'signature' ? (
                                            <div style={{
                                                fontFamily: '"Brush Script MT", "Dancing Script", cursive',
                                                fontSize: '1.75rem',
                                                color: field.value ? '#4f46e5' : '#94a3b8'
                                            }}>
                                                {field.value || 'Digital Signature required'}
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                                <span style={{ fontSize: '1rem', fontWeight: 600 }}>{field.value || `Click to provide ${field.label.toLowerCase()}`}</span>
                                                <Edit3 size={16} />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Card title="Contract Intelligence">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                                <Info size={20} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Active Status</p>
                                <Badge status={contract.status}>{contract.status}</Badge>
                            </div>
                        </div>

                        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                            <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: '1.5' }}>
                                {isLocked
                                    ? "This document is verified and locked. No further modifications are allowed."
                                    : "You are currently in editing mode. Click on any field to enter data. You can also drag fields to reposition them."
                                }
                            </p>
                        </div>
                    </div>
                </Card>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                    {!isLocked && (
                        <Button
                            onClick={handleSave}
                            disabled={!isDirty}
                            style={{ width: '100%' }}
                            icon={<Save size={18} />}
                        >
                            Save Document
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        onClick={onClose}
                        style={{ width: '100%' }}
                        icon={<X size={18} />}
                    >
                        {isLocked ? 'Back to Dashboard' : 'Cancel & Close'}
                    </Button>
                </div>
            </aside>

            {/* Field Entry Modal */}
            <Modal
                isOpen={!!editingField}
                onClose={() => setEditingField(null)}
                title={`Edit ${editingField?.label}`}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: '1.5' }}>
                        {editingField?.type === 'signature'
                            ? "Please type your full legal name below. This will be used to generate a secure digital signature for this document."
                            : `Please provide the requested information for the ${editingField?.label} field.`
                        }
                    </p>

                    {editingField?.type === 'checkbox' ? (
                        <div
                            onClick={() => setTempValue(!tempValue)}
                            style={{
                                padding: '1.5rem',
                                background: tempValue ? '#f0fdf4' : '#f8fafc',
                                border: `2px solid ${tempValue ? '#22c55e' : '#e2e8f0'}`,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '8px',
                                border: `2px solid ${tempValue ? '#22c55e' : '#cbd5e1'}`,
                                background: tempValue ? '#22c55e' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                {tempValue && <Square size={16} fill="currentColor" />}
                            </div>
                            <div>
                                <h4 style={{ fontWeight: 700, color: tempValue ? '#166534' : '#0f172a' }}>Acceptance Acknowledged</h4>
                                <p style={{ fontSize: '0.8125rem', color: tempValue ? '#166534' : '#64748b' }}>I acknowledge and accept the terms outlined in this clause.</p>
                            </div>
                        </div>
                    ) : (
                        <Input
                            label={editingField?.type === 'signature' ? "Legal Name" : editingField?.label}
                            type={editingField?.type === 'date' ? 'date' : 'text'}
                            autoFocus
                            value={String(tempValue)}
                            onChange={(e) => setTempValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && saveModalValue()}
                            placeholder={editingField?.type === 'signature' ? "e.g. Johnathan Doe" : `Enter ${editingField?.label.toLowerCase()}...`}
                        />
                    )}

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <Button onClick={saveModalValue} style={{ flex: 1 }}>
                            Confirm {editingField?.type === 'signature' ? 'Signature' : 'Value'}
                        </Button>
                        <Button variant="outline" onClick={() => setEditingField(null)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

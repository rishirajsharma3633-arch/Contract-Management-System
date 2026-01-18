import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { BlueprintList } from './components/features/BlueprintList';
import { BlueprintEditor } from './components/features/BlueprintEditor';
import { ContractDashboard } from './components/features/ContractDashboard';
import { ContractViewer } from './components/features/ContractViewer';
import { useStore } from './store/useStore';
import { Modal, Input, Button } from './components/ui';
import type { Blueprint, Contract } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [view, setView] = useState<'list' | 'editor' | 'viewer'>('list');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  // Custom Naming Modal State
  const [isNamingModalOpen, setIsNamingModalOpen] = useState(false);
  const [namingBlueprint, setNamingBlueprint] = useState<Blueprint | null>(null);
  const [newContractName, setNewContractName] = useState('');

  const addContract = useStore(state => state.addContract);

  const startGenerateContract = (blueprint: Blueprint) => {
    setNamingBlueprint(blueprint);
    setNewContractName(`${blueprint.name} - ${new Date().toLocaleDateString()}`);
    setIsNamingModalOpen(true);
  };

  const confirmGenerateContract = () => {
    if (!namingBlueprint || !newContractName) return;

    const newContract: Contract = {
      id: crypto.randomUUID(),
      blueprintId: namingBlueprint.id,
      blueprintName: namingBlueprint.name,
      name: newContractName,
      status: 'Created',
      fields: namingBlueprint.fields.map(f => ({ ...f, value: f.type === 'checkbox' ? false : '' })),
      createdAt: new Date().toISOString(),
    };

    addContract(newContract);
    setIsNamingModalOpen(false);
    setNamingBlueprint(null);
    setActiveTab('dashboard');
    setView('list');
  };

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setView('viewer');
  };

  return (
    <Layout activeTab={activeTab} onTabChange={(tab: string) => { setActiveTab(tab); setView('list'); }}>
      {activeTab === 'blueprints' && (
        <>
          {view === 'list' && (
            <BlueprintList
              onAddNew={() => setView('editor')}
              onGenerateContract={startGenerateContract}
            />
          )}
          {view === 'editor' && (
            <BlueprintEditor
              onSave={() => setView('list')}
              onCancel={() => setView('list')}
            />
          )}
        </>
      )}

      {activeTab === 'dashboard' && (
        <>
          {view === 'list' && (
            <ContractDashboard onView={handleViewContract} />
          )}
          {view === 'viewer' && selectedContract && (
            <ContractViewer
              contract={selectedContract}
              onClose={() => { setView('list'); setSelectedContract(null); }}
            />
          )}
        </>
      )}

      {/* Premium Naming Modal */}
      <Modal
        isOpen={isNamingModalOpen}
        onClose={() => setIsNamingModalOpen(false)}
        title="Initialize New Contract"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: '1.5' }}>
            Enter a descriptive name for this contract. This will help you identify it in the dashboard.
          </p>
          <Input
            label="Contract Identity"
            autoFocus
            value={newContractName}
            onChange={(e) => setNewContractName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && confirmGenerateContract()}
          />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <Button onClick={confirmGenerateContract} style={{ flex: 1 }}>
              Generate Document
            </Button>
            <Button variant="outline" onClick={() => setIsNamingModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

export default App;

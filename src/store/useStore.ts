import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VALID_TRANSITIONS } from '../types';
import type { Blueprint, Contract, ContractStatus, Field } from '../types';

interface AppState {
    blueprints: Blueprint[];
    contracts: Contract[];
    addBlueprint: (blueprint: Blueprint) => void;
    deleteBlueprint: (id: string) => void;
    addContract: (contract: Contract) => void;
    updateContractStatus: (id: string, status: ContractStatus) => void;
    updateContractFields: (id: string, fields: Field[]) => void;
    getContractById: (id: string) => Contract | undefined;
    getBlueprintById: (id: string) => Blueprint | undefined;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            blueprints: [],
            contracts: [],

            addBlueprint: (blueprint) =>
                set((state) => ({ blueprints: [blueprint, ...state.blueprints] })),

            deleteBlueprint: (id) =>
                set((state) => ({
                    blueprints: state.blueprints.filter(b => b.id !== id),
                    contracts: state.contracts.filter(c => c.blueprintId !== id)
                })),

            addContract: (contract) =>
                set((state) => ({ contracts: [contract, ...state.contracts] })),

            updateContractStatus: (id, status) => {
                const contract = get().contracts.find(c => c.id === id);
                if (!contract) return;

                const allowed = VALID_TRANSITIONS[contract.status];
                if (allowed.includes(status)) {
                    set((state) => ({
                        contracts: state.contracts.map(c =>
                            c.id === id ? { ...c, status } : c
                        )
                    }));
                }
            },

            updateContractFields: (id, fields) => {
                const contract = get().contracts.find(c => c.id === id);
                if (!contract || contract.status === 'Locked') return;

                set((state) => ({
                    contracts: state.contracts.map(c =>
                        c.id === id ? { ...c, fields } : c
                    )
                }));
            },

            getContractById: (id) => get().contracts.find(c => c.id === id),
            getBlueprintById: (id) => get().blueprints.find(b => b.id === id),
        }),
        {
            name: 'contract-manager-storage',
        }
    )
);

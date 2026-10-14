import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  const isDanger = variant === 'danger';
  const isWarning = variant === 'warning';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={isDanger ? 'danger' : isWarning ? 'gold' : 'primary'}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            isDanger ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
          }`}
        >
          {isDanger ? <AlertTriangle className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <div className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</div>
        </div>
      </div>
    </Modal>
  );
};

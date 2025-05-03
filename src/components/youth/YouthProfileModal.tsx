
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import YouthProfileForm from './YouthProfileForm';
import { YouthProfile } from '@/hooks/useYouthProfiles';

interface YouthProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Partial<YouthProfile>;
  isLoading?: boolean;
  title: string;
}

const YouthProfileModal: React.FC<YouthProfileModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  title,
}) => {
  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <YouthProfileForm onSubmit={handleSubmit} initialData={initialData} isLoading={isLoading} />
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default YouthProfileModal;

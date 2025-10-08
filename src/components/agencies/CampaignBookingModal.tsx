import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CampaignBookingModalProps {
  agencyId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CampaignBookingModal({ agencyId, onClose, onSuccess }: CampaignBookingModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Campaign Booking</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">Campaign booking modal placeholder</p>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Textarea } from 'src/components/ui/textarea';
import { createBrief } from '../state/offer.mock';
import { addProof } from '../state/proofs.mock';
import { makeProof } from '../components/ProofSlip';
import { toast } from 'sonner';

export function Brief() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    compensation: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.brand || !formData.compensation) {
      toast.error('Please fill in all required fields');
      return;
    }

    const briefData = {
      title: formData.title,
      brand: formData.brand,
      compensation: Number(formData.compensation),
      startDate: formData.startDate,
      endDate: formData.endDate,
      notes: formData.notes
    };

    // Store the brief
    createBrief(briefData);

    // Create proof receipt
    const proof = makeProof('Brief Submitted', [
      { label: 'Title', value: briefData.title },
      { label: 'Brand', value: briefData.brand },
      { label: 'Compensation', value: `$${briefData.compensation.toLocaleString()}` },
      { label: 'Start Date', value: briefData.startDate },
      { label: 'End Date', value: briefData.endDate }
    ]);
    
    addProof(proof);

    toast.success('Brief submitted successfully!');
    navigate('/creator/offer-lock');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Brief</h1>
        <p className="text-muted-foreground mt-2">
          Submit your collaboration proposal to begin the verification process.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Brief Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter brief title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                placeholder="Enter brand name"
                value={formData.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compensation">Compensation ($) *</Label>
              <Input
                id="compensation"
                type="number"
                placeholder="0"
                value={formData.compensation}
                onChange={(e) => handleChange('compensation', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional details or requirements"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Submit Brief
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/creator/portfolio')}>
                Save Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
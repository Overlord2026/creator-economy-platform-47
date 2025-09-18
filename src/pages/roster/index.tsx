import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Download, Upload, AlertTriangle, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RosterEntry {
  id: string;
  slot: string;
  athlete_id: string;
  athlete_name: string;
  cost: number;
  term: string;
  status: 'signed' | 'committed' | 'recruiting' | 'declined';
  notes: string;
}

// Mock roster data
const mockRoster: RosterEntry[] = [
  {
    id: '1',
    slot: 'QB1',
    athlete_id: 'ATH001',
    athlete_name: 'John Smith',
    cost: 50000,
    term: '2024-2025',
    status: 'signed',
    notes: 'Elite arm strength, 4-year starter potential'
  },
  {
    id: '2',
    slot: 'RB1',
    athlete_id: 'ATH002',
    athlete_name: 'Marcus Johnson',
    cost: 35000,
    term: '2024-2026',
    status: 'committed',
    notes: 'Speed back with excellent vision'
  },
  {
    id: '3',
    slot: 'WR1',
    athlete_id: 'ATH003',
    athlete_name: 'David Wilson',
    cost: 25000,
    term: '2024-2025',
    status: 'recruiting',
    notes: 'Top target, visit scheduled'
  }
];

const SLOTS = ['QB1', 'QB2', 'RB1', 'RB2', 'WR1', 'WR2', 'WR3', 'TE1', 'OL1', 'OL2', 'OL3', 'OL4', 'OL5'];
const STATUSES = ['signed', 'committed', 'recruiting', 'declined'] as const;

export default function RosterPlanning() {
  const [roster, setRoster] = useState<RosterEntry[]>(mockRoster);
  const [newEntry, setNewEntry] = useState<Partial<RosterEntry>>({
    slot: '',
    athlete_name: '',
    cost: 0,
    term: '2024-2025',
    status: 'recruiting',
    notes: ''
  });
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const { toast } = useToast();

  const totalCost = roster.reduce((sum, entry) => sum + entry.cost, 0);
  const capLimit = 500000; // Example cap limit
  const capRemaining = capLimit - totalCost;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800 border-green-200';
      case 'committed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'recruiting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'declined': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const addEntry = () => {
    if (!newEntry.slot || !newEntry.athlete_name) {
      toast({
        title: 'Missing Information',
        description: 'Please provide slot and athlete name',
        variant: 'destructive',
      });
      return;
    }

    const entry: RosterEntry = {
      id: `${Date.now()}`,
      athlete_id: `ATH${String(roster.length + 1).padStart(3, '0')}`,
      slot: newEntry.slot!,
      athlete_name: newEntry.athlete_name!,
      cost: newEntry.cost || 0,
      term: newEntry.term || '2024-2025',
      status: newEntry.status as any || 'recruiting',
      notes: newEntry.notes || ''
    };

    setRoster([...roster, entry]);
    setNewEntry({
      slot: '',
      athlete_name: '',
      cost: 0,
      term: '2024-2025',
      status: 'recruiting',
      notes: ''
    });
    setIsAddingEntry(false);

    toast({
      title: 'Success',
      description: 'Roster entry added successfully',
    });
  };

  const removeEntry = (id: string) => {
    setRoster(roster.filter(entry => entry.id !== id));
    toast({
      title: 'Success',
      description: 'Roster entry removed',
    });
  };

  const updateEntryStatus = (id: string, status: typeof STATUSES[number]) => {
    setRoster(roster.map(entry => 
      entry.id === id ? { ...entry, status } : entry
    ));
  };

  const exportToCSV = () => {
    const csvContent = 'Slot,Athlete ID,Athlete Name,Cost,Term,Status,Notes\n' +
      roster.map(entry => [
        entry.slot,
        entry.athlete_id,
        entry.athlete_name,
        entry.cost,
        entry.term,
        entry.status,
        `"${entry.notes.replace(/"/g, '""')}"`
      ].join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `roster-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Success',
      description: 'Roster exported to CSV',
    });
  };

  const conflictSlots = roster.reduce((acc, entry) => {
    const existing = acc[entry.slot];
    if (existing) {
      acc[entry.slot] = [...existing, entry];
    } else {
      acc[entry.slot] = [entry];
    }
    return acc;
  }, {} as Record<string, RosterEntry[]>);

  const hasConflicts = Object.values(conflictSlots).some(entries => entries.length > 1);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roster Planning</h1>
          <p className="text-muted-foreground mt-2">
            Manage your team roster with salary cap tracking and scenario planning.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setIsAddingEntry(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Player
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {roster.length} players recruited
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cap Remaining</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${capRemaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${capRemaining.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              of ${capLimit.toLocaleString()} budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conflicts</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${hasConflicts ? 'text-red-500' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${hasConflicts ? 'text-red-600' : 'text-green-600'}`}>
              {Object.values(conflictSlots).filter(entries => entries.length > 1).length}
            </div>
            <p className="text-xs text-muted-foreground">
              duplicate slots
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Entry Form */}
      {isAddingEntry && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Player</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Slot</label>
                <Select value={newEntry.slot} onValueChange={(value) => setNewEntry({...newEntry, slot: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {SLOTS.map(slot => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Athlete Name</label>
                <Input
                  value={newEntry.athlete_name}
                  onChange={(e) => setNewEntry({...newEntry, athlete_name: e.target.value})}
                  placeholder="Player name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Cost ($)</label>
                <Input
                  type="number"
                  value={newEntry.cost}
                  onChange={(e) => setNewEntry({...newEntry, cost: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Term</label>
                <Input
                  value={newEntry.term}
                  onChange={(e) => setNewEntry({...newEntry, term: e.target.value})}
                  placeholder="2024-2025"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={newEntry.status} onValueChange={(value) => setNewEntry({...newEntry, status: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map(status => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 flex items-end">
                <div className="flex gap-2">
                  <Button onClick={addEntry}>Add</Button>
                  <Button variant="outline" onClick={() => setIsAddingEntry(false)}>Cancel</Button>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="text-sm font-medium">Notes</label>
              <Input
                value={newEntry.notes}
                onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                placeholder="Additional notes..."
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roster Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Current Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Slot</th>
                  <th className="text-left py-2 px-3">Athlete</th>
                  <th className="text-left py-2 px-3">Cost</th>
                  <th className="text-left py-2 px-3">Term</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Notes</th>
                  <th className="text-left py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((entry) => {
                  const isConflict = conflictSlots[entry.slot]?.length > 1;
                  return (
                    <tr key={entry.id} className={`border-b hover:bg-muted/50 ${isConflict ? 'bg-red-50' : ''}`}>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{entry.slot}</Badge>
                          {isConflict && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div>
                          <div className="font-medium">{entry.athlete_name}</div>
                          <div className="text-sm text-muted-foreground">{entry.athlete_id}</div>
                        </div>
                      </td>
                      <td className="py-2 px-3">${entry.cost.toLocaleString()}</td>
                      <td className="py-2 px-3">{entry.term}</td>
                      <td className="py-2 px-3">
                        <Select
                          value={entry.status}
                          onValueChange={(value) => updateEntryStatus(entry.id, value as any)}
                        >
                          <SelectTrigger className="w-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map(status => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-2 px-3 max-w-xs">
                        <div className="truncate" title={entry.notes}>
                          {entry.notes || '-'}
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeEntry(entry.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Filter, Download, Search, FileText, Eye } from 'lucide-react';
import { listReceipts } from '@/features/receipts/record';
import { filterReceipts, getEntityTypes, getActions, getReceiptTypes, ReceiptFilter } from '@/features/receipts/filters';

export function ReceiptsExplorer() {
  const allReceipts = listReceipts();
  const [filter, setFilter] = useState<ReceiptFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  const filteredReceipts = useMemo(() => {
    let filtered = filterReceipts(allReceipts, filter);
    
    if (searchTerm) {
      filtered = filtered.filter(receipt => 
        JSON.stringify(receipt).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [allReceipts, filter, searchTerm]);

  const entityTypes = getEntityTypes(allReceipts);
  const actions = getActions(allReceipts);
  const receiptTypes = getReceiptTypes(allReceipts);

  const exportReceipts = () => {
    const dataStr = JSON.stringify(filteredReceipts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `receipts_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Receipt Explorer</h1>
        <p className="text-muted-foreground">
          Cryptographic receipts for compliance and audit trails
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search receipts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button
            variant="outline"
            onClick={exportReceipts}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {showFilters && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Entity Type</label>
                  <Select
                    value={filter.entity_type || ''}
                    onValueChange={(value) => setFilter(prev => ({ ...prev, entity_type: value || undefined }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All entities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All entities</SelectItem>
                      {entityTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Action</label>
                  <Select
                    value={filter.action || ''}
                    onValueChange={(value) => setFilter(prev => ({ ...prev, action: value || undefined }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All actions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All actions</SelectItem>
                      {actions.map(action => (
                        <SelectItem key={action} value={action}>{action}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Receipt Type</label>
                  <Select
                    value={filter.type || ''}
                    onValueChange={(value) => setFilter(prev => ({ ...prev, type: value || undefined }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All types</SelectItem>
                      {receiptTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Entity ID</label>
                  <Input
                    placeholder="Filter by entity ID"
                    value={filter.entity_id || ''}
                    onChange={(e) => setFilter(prev => ({ ...prev, entity_id: e.target.value || undefined }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredReceipts.length} of {allReceipts.length} receipts
        </p>
      </div>

      {/* Receipt List */}
      <div className="space-y-4">
        {filteredReceipts.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                {allReceipts.length === 0 
                  ? 'No receipts found. Receipts are automatically generated when actions occur.'
                  : 'No receipts match the current filters.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredReceipts.map((receipt, index) => (
            <Card key={receipt.id || index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{receipt.id}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{receipt.type}</Badge>
                    {receipt.entity_type && (
                      <Badge variant="secondary">{receipt.entity_type}</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {receipt.action && (
                    <div>
                      <span className="font-medium">Action:</span> {receipt.action}
                    </div>
                  )}
                  {receipt.entity_id && (
                    <div>
                      <span className="font-medium">Entity ID:</span> {receipt.entity_id}
                    </div>
                  )}
                  {receipt.foreign_keys && Object.keys(receipt.foreign_keys).length > 0 && (
                    <div>
                      <span className="font-medium">Foreign Keys:</span>{' '}
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {JSON.stringify(receipt.foreign_keys)}
                      </code>
                    </div>
                  )}
                  {receipt.reasons && (
                    <div>
                      <span className="font-medium">Reasons:</span>{' '}
                      {Array.isArray(receipt.reasons) 
                        ? receipt.reasons.join(', ') 
                        : receipt.reasons}
                    </div>
                  )}
                  {receipt.result && (
                    <div>
                      <span className="font-medium">Result:</span> {receipt.result}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Timestamp:</span>{' '}
                    {receipt.ts || receipt.timestamp || receipt.created_at}
                  </div>
                  {receipt.policy_version && (
                    <div>
                      <span className="font-medium">Policy Version:</span>{' '}
                      {receipt.policy_version}
                    </div>
                  )}
                  {receipt.content_hash && (
                    <div>
                      <span className="font-medium">Content Hash:</span>{' '}
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {receipt.content_hash}
                      </code>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedReceipt(receipt)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={!!selectedReceipt} onOpenChange={() => setSelectedReceipt(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Receipt Details: {selectedReceipt?.id}</DialogTitle>
            <DialogDescription>
              Type: {selectedReceipt?.type} • {selectedReceipt && new Date(selectedReceipt.ts || selectedReceipt.timestamp || selectedReceipt.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedReceipt && (
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96">
              {JSON.stringify(selectedReceipt, null, 2)}
            </pre>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  FileText,
  Clock,
  MapPin,
  Users,
  Gavel,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  status: 'compliant' | 'warning' | 'violation';
  description: string;
  lastChecked: string;
  actionRequired?: string;
}

interface StateRegulation {
  state: string;
  status: 'compliant' | 'review_needed' | 'non_compliant';
  regulations: string[];
  lastUpdated: string;
}

const complianceItems: ComplianceItem[] = [
  {
    id: '1',
    title: 'FTC Disclosure Requirements',
    status: 'compliant',
    description: 'All sponsored content properly disclosed',
    lastChecked: '2 hours ago'
  },
  {
    id: '2',
    title: 'NCAA NIL Compliance',
    status: 'compliant',
    description: 'Current deals comply with NCAA regulations',
    lastChecked: '1 day ago'
  },
  {
    id: '3',
    title: 'California NIL Laws',
    status: 'warning',
    description: 'New regulations effective next month',
    lastChecked: '3 days ago',
    actionRequired: 'Review updated contract templates'
  },
  {
    id: '4',
    title: 'Tax Reporting Requirements',
    status: 'compliant',
    description: 'All income properly documented for tax purposes',
    lastChecked: '1 week ago'
  }
];

const stateRegulations: StateRegulation[] = [
  {
    state: 'California',
    status: 'review_needed',
    regulations: ['SB 26 - Fair Pay to Play Act', 'AB 331 - Student Privacy'],
    lastUpdated: '1 week ago'
  },
  {
    state: 'Texas',
    status: 'compliant',
    regulations: ['HB 1435 - Name, Image, Likeness'],
    lastUpdated: '2 weeks ago'
  },
  {
    state: 'Florida',
    status: 'compliant',
    regulations: ['SB 646 - Intercollegiate Athlete Compensation'],
    lastUpdated: '1 month ago'
  },
  {
    state: 'New York',
    status: 'non_compliant',
    regulations: ['S5891A - Student Athlete NIL Rights'],
    lastUpdated: '3 days ago'
  }
];

export default function ComplianceHub() {
  const [activeTab, setActiveTab] = useState('overview');
  const [lastScanTime, setLastScanTime] = useState('2 hours ago');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
      case 'review_needed':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'violation':
      case 'non_compliant':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
      case 'review_needed':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'violation':
      case 'non_compliant':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const runComplianceScan = () => {
    setLastScanTime('Just now');
    // Simulate scan process
    setTimeout(() => {
      // Update scan results
    }, 2000);
  };

  const compliantCount = complianceItems.filter(item => item.status === 'compliant').length;
  const warningCount = complianceItems.filter(item => item.status === 'warning').length;
  const violationCount = complianceItems.filter(item => item.status === 'violation').length;

  return (
    <>
      <Helmet>
        <title>Compliance Hub | Creator Economy Platform</title>
        <meta name="description" content="Monitor and manage compliance across all creator economy regulations, from NIL to FTC requirements." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Compliance Hub</h1>
                <p className="text-gray-600 mt-1">Monitor regulatory compliance across all jurisdictions</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={runComplianceScan} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Run Scan
                </Button>
                <Button className="gap-2">
                  <FileText className="h-4 w-4" />
                  Compliance Report
                </Button>
              </div>
            </div>
          </div>

          {/* Compliance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Compliant</p>
                    <p className="text-2xl font-bold text-green-600">{compliantCount}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Warnings</p>
                    <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Violations</p>
                    <p className="text-2xl font-bold text-red-600">{violationCount}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Last Scan</p>
                    <p className="text-sm font-medium text-gray-900">{lastScanTime}</p>
                  </div>
                  <Shield className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="nil-compliance">NIL Compliance</TabsTrigger>
              <TabsTrigger value="state-regulations">State Regulations</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Compliance Status Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceItems.map((item) => (
                      <div key={item.id} className={`p-4 border rounded-lg ${getStatusColor(item.status)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(item.status)}
                            <h3 className="font-medium">{item.title}</h3>
                          </div>
                          <Badge variant="outline" className={getStatusColor(item.status).split(' ')[0]}>
                            {item.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{item.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span>Last checked: {item.lastChecked}</span>
                          {item.actionRequired && (
                            <span className="font-medium">Action: {item.actionRequired}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nil-compliance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="h-5 w-5" />
                    NIL Compliance Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">NCAA Compliance Active</span>
                      </div>
                      <p className="text-sm text-green-800 mb-3">
                        All current NIL deals are compliant with NCAA regulations and institutional policies.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="font-medium">Active Deals</p>
                          <p>7 deals monitored</p>
                        </div>
                        <div>
                          <p className="font-medium">Total Value</p>
                          <p>$45,750</p>
                        </div>
                        <div>
                          <p className="font-medium">Compliance Score</p>
                          <p>98%</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Eligibility Status</h3>
                        <Badge className="bg-green-500">Eligible</Badge>
                        <p className="text-sm text-gray-600 mt-2">
                          Academic and athletic eligibility maintained
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Disclosure Requirements</h3>
                        <Badge className="bg-green-500">Complete</Badge>
                        <p className="text-sm text-gray-600 mt-2">
                          All required disclosures submitted and approved
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="state-regulations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Multi-State Regulation Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stateRegulations.map((state) => (
                      <div key={state.state} className={`p-4 border rounded-lg ${getStatusColor(state.status)}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(state.status)}
                            <h3 className="font-medium">{state.state}</h3>
                          </div>
                          <Badge variant="outline" className={getStatusColor(state.status).split(' ')[0]}>
                            {state.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Active Regulations:</p>
                          <ul className="text-sm space-y-1">
                            {state.regulations.map((regulation, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-current rounded-full"></span>
                                {regulation}
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-gray-600 mt-2">
                            Last updated: {state.lastUpdated}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Compliance Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">Monthly Compliance Report</h3>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">
                          Comprehensive compliance status for all regulations
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Last generated: November 2024
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">NIL Deal Summary</h3>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">
                          Summary of all active and completed NIL deals
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Updated: 2 hours ago
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Automated Compliance Monitoring</span>
                      </div>
                      <p className="text-sm text-blue-800">
                        Our system continuously monitors regulatory changes and automatically updates your compliance status. 
                        You'll receive real-time alerts when action is required.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
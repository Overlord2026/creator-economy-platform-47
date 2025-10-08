import { MarketingStoreAdapter } from './MarketingStore';
import { 
  MarketingCampaign, 
  MarketingCreative, 
  MarketingApproval, 
  SpendSnapshot, 
  MarketingSettings,
  AuditLogEntry,
  MarketingPersona,
  MarketingChannel,
  CampaignStatus
} from '../types';

export class FallbackMarketingAdapter implements MarketingStoreAdapter {
  private campaigns: MarketingCampaign[] = [];
  private creatives: MarketingCreative[] = [];
  private approvals: MarketingApproval[] = [];
  private snapshots: SpendSnapshot[] = [];
  private auditLogs: AuditLogEntry[] = [];
  private settings: MarketingSettings = {
    id: 'default',
    guardrails: {
      dailySpendCap: {} as Record<MarketingChannel, number>,
      maxActiveCampaigns: 10,
      quietHours: { start: '22:00', end: '08:00', timezone: 'UTC' },
      approvalRoles: {}
    },
    policies: {
      autoInjectDisclaimers: true,
      requireComplianceReview: true,
      retentionYears: 7
    },
    attribution: {
      model: 'last_touch',
      lookbackDays: 30
    },
    outboundLimits: {
      emailDailyLimit: 1000,
      smsDailyLimit: 100,
      enforceCanSpam: true
    },
    updatedBy: '',
    updatedAt: new Date().toISOString()
  };

  async listCampaigns(filters?: any): Promise<MarketingCampaign[]> {
    return this.campaigns;
  }

  async getCampaign(id: string): Promise<MarketingCampaign | null> {
    return this.campaigns.find(c => c.id === id) || null;
  }

  async createDraft(payload: any): Promise<MarketingCampaign> {
    const campaign: MarketingCampaign = {
      ...payload,
      id: `camp_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      versionHash: ''
    };
    this.campaigns.push(campaign);
    return campaign;
  }

  async updateDraft(id: string, patch: Partial<MarketingCampaign>): Promise<MarketingCampaign> {
    const index = this.campaigns.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Campaign not found');
    this.campaigns[index] = { ...this.campaigns[index], ...patch };
    return this.campaigns[index];
  }

  async requestApproval(id: string): Promise<void> {}

  async recordApproval(campaignId: string, payload: any): Promise<MarketingApproval> {
    const approval: MarketingApproval = { ...payload, id: `appr_${Date.now()}` };
    this.approvals.push(approval);
    return approval;
  }

  async lockVersion(id: string): Promise<MarketingCampaign> {
    const campaign = await this.getCampaign(id);
    if (!campaign) throw new Error('Campaign not found');
    return campaign;
  }

  async launchCampaign(id: string): Promise<void> {}
  async pauseCampaign(id: string): Promise<void> {}
  async completeCampaign(id: string): Promise<void> {}

  async getCreatives(campaignId: string): Promise<MarketingCreative[]> {
    return this.creatives.filter(c => c.campaignId === campaignId);
  }

  async saveCreative(creative: any): Promise<MarketingCreative> {
    const newCreative: MarketingCreative = { ...creative, id: `cre_${Date.now()}` };
    this.creatives.push(newCreative);
    return newCreative;
  }

  async updateCreative(id: string, patch: Partial<MarketingCreative>): Promise<MarketingCreative> {
    const index = this.creatives.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Creative not found');
    this.creatives[index] = { ...this.creatives[index], ...patch };
    return this.creatives[index];
  }

  async recordSpendSnapshot(snapshot: any): Promise<SpendSnapshot> {
    const newSnapshot: SpendSnapshot = { ...snapshot, id: `snap_${Date.now()}` };
    this.snapshots.push(newSnapshot);
    return newSnapshot;
  }

  async getSpendSnapshots(campaignId: string, dateRange?: any): Promise<SpendSnapshot[]> {
    return this.snapshots.filter(s => s.campaignId === campaignId);
  }

  async exportAuditBundle(campaignId: string): Promise<any> {
    return {
      campaign: await this.getCampaign(campaignId),
      creatives: await this.getCreatives(campaignId),
      approvals: this.approvals.filter(a => a.campaignId === campaignId),
      auditLog: await this.getAuditLog(campaignId),
      spendData: await this.getSpendSnapshots(campaignId)
    };
  }

  async logAuditEvent(entry: any): Promise<void> {
    this.auditLogs.push({ ...entry, id: `log_${Date.now()}`, timestamp: new Date().toISOString() });
  }

  async getAuditLog(campaignId: string): Promise<AuditLogEntry[]> {
    return this.auditLogs.filter(l => l.campaignId === campaignId);
  }

  async getSettings(): Promise<MarketingSettings> {
    return this.settings;
  }

  async updateSettings(patch: Partial<MarketingSettings>): Promise<MarketingSettings> {
    this.settings = { ...this.settings, ...patch };
    return this.settings;
  }

  async listDisclaimers(state?: string, persona?: MarketingPersona, channel?: MarketingChannel): Promise<any[]> {
    return [];
  }

  async listApprovers(): Promise<any[]> {
    return [];
  }
}

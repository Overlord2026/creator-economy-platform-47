export type LogLevel = 'debug' | 'info' | 'warning' | 'error' | 'critical';

export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  timestamp: string;
  source?: string;
  data?: any;
}

export interface LoggingConfig {
  minLevel: LogLevel;
  retentionPeriod: number;
  enableRealTimeAlerts: boolean;
}

// Simple in-memory store for logs
let logs: LogEntry[] = [];
let config: LoggingConfig = {
  minLevel: 'info',
  retentionPeriod: 7,
  enableRealTimeAlerts: true
};

const logLevels: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warning: 2,
  error: 3,
  critical: 4
};

function shouldLog(level: LogLevel): boolean {
  return logLevels[level] >= logLevels[config.minLevel];
}

function createLogEntry(level: LogLevel, message: string, source?: string, data?: any): LogEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    level,
    message,
    timestamp: new Date().toISOString(),
    source,
    data
  };
}

function addLog(entry: LogEntry) {
  if (!shouldLog(entry.level)) return;
  
  logs.unshift(entry);
  
  // Keep only recent logs based on retention period
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - config.retentionPeriod);
  logs = logs.filter(log => new Date(log.timestamp) >= cutoff);
  
  // Console output
  const consoleMethod = entry.level === 'warning' ? 'warn' : 
                       entry.level === 'error' || entry.level === 'critical' ? 'error' : 'log';
  console[consoleMethod](`[${entry.level.toUpperCase()}] ${entry.message}`, entry.data || '');
}

export const logger = {
  debug: (message: string, source?: string, data?: any) => 
    addLog(createLogEntry('debug', message, source, data)),
  
  info: (message: string, source?: string, data?: any) => 
    addLog(createLogEntry('info', message, source, data)),
  
  warning: (message: string, source?: string, data?: any) => 
    addLog(createLogEntry('warning', message, source, data)),
  
  error: (message: string, source?: string, data?: any) => 
    addLog(createLogEntry('error', message, source, data)),
  
  critical: (message: string, source?: string, data?: any) => 
    addLog(createLogEntry('critical', message, source, data)),
  
  getRecentLogs: (limit = 100): LogEntry[] => logs.slice(0, limit),
  
  getLogsByLevel: (level: LogLevel, limit = 100): LogEntry[] => 
    logs.filter(log => log.level === level).slice(0, limit),
  
  getConfig: (): LoggingConfig => ({ ...config }),
  
  updateConfig: (newConfig: Partial<LoggingConfig>) => {
    config = { ...config, ...newConfig };
  },
  
  clearLogs: () => {
    logs = [];
  }
};

// Mock state for compliance gates

interface ComplianceState {
  training: boolean;
  disclosure: boolean;
  ftcLabels: boolean;
}

let compliance: ComplianceState = {
  training: false,
  disclosure: false,
  ftcLabels: false
};

// Load from localStorage on module init
try {
  const stored = localStorage.getItem('creator_compliance');
  if (stored) {
    compliance = { ...compliance, ...JSON.parse(stored) };
  }
} catch (error) {
  console.warn('Failed to load compliance from storage:', error);
}

function saveCompliance() {
  try {
    localStorage.setItem('creator_compliance', JSON.stringify(compliance));
  } catch (error) {
    console.warn('Failed to save compliance to storage:', error);
  }
}

export function setTraining(completed: boolean) {
  compliance.training = completed;
  saveCompliance();
  return compliance;
}

export function setDisclosure(filed: boolean) {
  compliance.disclosure = filed;
  saveCompliance();
  return compliance;
}

export function setFtcLabels(enabled: boolean) {
  compliance.ftcLabels = enabled;
  saveCompliance();
  return compliance;
}

export function getCompliance(): ComplianceState {
  return { ...compliance };
}

export function allPassed(): boolean {
  return compliance.training && compliance.disclosure && compliance.ftcLabels;
}

export function resetCompliance() {
  compliance = {
    training: false,
    disclosure: false,
    ftcLabels: false
  };
  saveCompliance();
  return compliance;
}
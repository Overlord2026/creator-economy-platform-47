// Mock state for offer management

interface BriefData {
  title: string;
  brand: string;
  compensation: number;
  startDate: string;
  endDate: string;
  notes?: string;
}

interface OfferState {
  brief?: BriefData;
  checksCompleted: boolean;
  checkNotes?: string;
  signed: boolean;
}

let currentOffer: OfferState = {
  checksCompleted: false,
  signed: false
};

export function createBrief(data: BriefData) {
  currentOffer.brief = data;
  localStorage.setItem('creator_offer', JSON.stringify(currentOffer));
  return currentOffer;
}

export function getCurrentOffer(): OfferState {
  try {
    const stored = localStorage.getItem('creator_offer');
    if (stored) {
      currentOffer = JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load offer from storage:', error);
  }
  return currentOffer;
}

export function setOfferChecks(pass: boolean, notes?: string) {
  currentOffer.checksCompleted = pass;
  currentOffer.checkNotes = notes;
  localStorage.setItem('creator_offer', JSON.stringify(currentOffer));
  return currentOffer;
}

export function signOffer() {
  currentOffer.signed = true;
  localStorage.setItem('creator_offer', JSON.stringify(currentOffer));
  return currentOffer;
}
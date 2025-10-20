# UI Copy & CTA Scan

## Summary
**Total CTA References:** 1,713+ across UI components

## Hero & Landing Copy

### Current Hero Messages
| File | Strings |
|---|---|
| src/pages/Index.tsx | "Family Office Marketplace"<br>"Get Started Today"<br>"Book a Demo"<br>"Learn More"<br>"Trusted by leading families" |
| src/pages/NIL.tsx | "NIL Platform for Student-Athletes"<br>"Start Your NIL Journey"<br>"Browse Opportunities"<br>"Stay Compliant" |

### Primary CTAs
1. "Get Started" (150+ occurrences)
2. "Learn More" (100+ occurrences)
3. "Book a Demo" (50+ occurrences)
4. "Sign Up" (200+ occurrences)
5. "Browse Marketplace" (30+ occurrences)

## Feature-Specific Copy

### NIL Platform
| File | Key Copy Strings |
|---|---|
| src/pages/NILMarketplace.tsx | "Discover NIL Opportunities"<br>"Post a Brief"<br>"Find Athletes"<br>"Browse Deals" |
| src/pages/NILDisclosures.tsx | "FTC Compliance Made Easy"<br>"Generate Disclosure"<br>"Auto-tag Posts"<br>"Stay Legal" |
| src/pages/NILContract.tsx | "Lock Your Terms"<br>"E-Sign in Minutes"<br>"Pre-Approved Templates"<br>"No Redlines" |
| src/pages/NILPayments.tsx | "Secure Escrow"<br>"Release Funds"<br>"Track Payouts"<br>"Dispute Resolution" |

### Compliance & Trust Rails
| File | Trust Messages |
|---|---|
| src/components/receipts/ | "Every action gets a receipt"<br>"Blockchain-backed proof"<br>"Immutable audit trail"<br>"Verify anytime" |
| src/components/security/ | "Bank-level security"<br>"MFA required"<br>"Session timeout protection"<br>"Real-time monitoring" |
| src/features/compliance/ | "NCAA-ready exports"<br>"Compliance dashboard"<br>"Automated alerts"<br>"No surprises" |

### Educational Content
| File | Learning Copy |
|---|---|
| src/pages/NILEducation.tsx | "NIL 101 Required"<br>"Take the Course"<br>"Get Certified"<br>"Unlock Deal Creation" |
| src/components/onboarding/ | "Complete Your Training"<br>"Learn the Rules"<br>"Protect Yourself"<br>"Start Smart" |

## Persona-Specific Messaging

### Athlete Copy
- "Get discovered by top brands"
- "Stay compliant, get paid"
- "Your eligibility, protected"
- "Track every deal in one place"

### Brand Copy
- "Find the perfect athlete"
- "Post briefs, get responses"
- "Verified ROI tracking"
- "Proof of every post"

### School/Compliance Officer Copy
- "Your athletes, your rules"
- "One compliance dashboard"
- "Local sponsor discovery"
- "NCAA export in one click"

### Agent/Advisor Copy
- "Represent with confidence"
- "Every action logged"
- "Professional tools"
- "White-glove support"

### Parent Copy
- "See every deal your student makes"
- "Peace of mind included"
- "Transparency by default"
- "Family vault access"

## How It Works Copy

### Current Implementations
**Scattered across pages, not centralized:**
1. "Browse → Connect → Deal" (general)
2. "Post → Match → Sign" (marketplace)
3. "Upload → Verify → Store" (documents)

### Recommended Standardization
**3-Step Process (to be centralized):**
1. **Browse & Connect** - "Athletes post profiles, brands post briefs"
2. **Lock Terms Fast** - "Pre-approved templates, e-sign in minutes"
3. **Stay Compliant** - "Auto-disclosures, audit trails, NCAA-ready"

## Social Proof Copy

### Current Metrics (Placeholders)
- "[X] schools using our platform"
- "[Y] deals closed this month"
- "[Z] athletes onboarded"
- "Trusted by [University Name]"

### Testimonial Placeholders
- "Finally, NIL compliance that doesn't require a law degree"
- "Cut our deal approval time from weeks to days"
- "Parents love the transparency"

## FAQ Copy (Current State)

### Common Questions Found
1. **"Is this NCAA-compliant?"** → Scattered answers, no central FAQ
2. **"How do payments work?"** → Mentioned in /nil/payments, not on landing
3. **"What if there's a dispute?"** → Dispute page exists, not surfaced early
4. **"Do I need training?"** → Education page explains, not in FAQ

### Missing FAQ Topics
- Pricing/costs
- Data privacy
- Integration with existing systems
- Mobile app availability
- Support hours

## CTA Analysis by Type

### Primary Actions (High Intent)
- "Sign Up" - 200+ occurrences
- "Create Deal" - 50+ occurrences
- "Start Contract" - 30+ occurrences
- "Release Payment" - 20+ occurrences

### Secondary Actions (Discovery)
- "Learn More" - 100+ occurrences
- "Browse Marketplace" - 30+ occurrences
- "View Examples" - 20+ occurrences
- "Watch Demo" - 10+ occurrences

### Tertiary Actions (Support)
- "Contact Us" - 50+ occurrences
- "Get Help" - 40+ occurrences
- "Read Docs" - 30+ occurrences
- "Report Issue" - 20+ occurrences

## Trust & Security Copy

### Current Security Messaging
| Aspect | Current Copy |
|---|---|
| Encryption | "Bank-level encryption"<br>"AES-256 at rest"<br>"TLS 1.3 in transit" |
| Authentication | "MFA required"<br>"15-minute timeout"<br>"Secure sessions" |
| Audit | "Every action logged"<br>"Cryptographic receipts"<br>"Blockchain-backed" |
| Compliance | "SOC 2 ready"<br>"GDPR aware"<br>"NCAA-friendly" |

### Missing Security Copy
- Penetration testing results
- Uptime guarantees
- Data residency
- Right to deletion

## Mobile-Specific Copy

### Current Mobile Mentions
- "Install our app" (no app exists)
- "Add to home screen" (PWA not configured)
- "Get notifications" (push not implemented)

### Recommended Mobile Copy
- "Install on your phone" → Action: Configure PWA
- "Approve deals on the go" → Action: Mobile-optimize flows
- "Never miss an update" → Action: Implement push notifications

## Conversion Path Copy

### Awareness Stage
- ✅ "NIL Platform for Athletes & Brands"
- ✅ "Compliance-first deal management"
- ⚠️ Missing: Value prop comparison vs. competitors

### Consideration Stage
- ✅ "See how it works" (demo pages exist)
- ✅ "Browse marketplace" (functional)
- ⚠️ Missing: Case studies, ROI calculators

### Decision Stage
- ✅ "Start your first deal" (onboarding works)
- ✅ "Book a consultation" (contact forms)
- ⚠️ Missing: Pricing transparency, plan comparisons

## Recommendations

### Immediate Copy Updates
1. **Centralize "How It Works"** - Create single source, reuse everywhere
2. **Add FAQ Section** - Answer top 10 questions on landing
3. **Standardize CTAs** - Use consistent button text across platform
4. **Clarify Value Props** - Lead with compliance + speed

### Short-Term Copy Projects
1. **Write Case Studies** - 3 athlete, 3 brand, 2 school success stories
2. **Create Comparison Tables** - AWMBFO vs. Opendorse vs. INFLCR
3. **Build Copy Library** - Reusable snippets for all personas
4. **A/B Test Headlines** - Test 3 hero variants

### Long-Term Copy Strategy
1. **Content Marketing** - Blog, guides, templates
2. **Video Scripts** - Product demos, testimonials
3. **Email Sequences** - Onboarding, nurture, upsell
4. **In-App Messaging** - Contextual tips, feature announcements

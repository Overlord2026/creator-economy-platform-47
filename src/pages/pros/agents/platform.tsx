import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Users, FileText, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AgentsPlatform() {
  return (
    <>
      <Helmet>
        <title>Agents Platform | Sports/NIL, Talent & Brand Management</title>
        <meta name="description" content="Professional platform for sports agents, NIL representatives, talent managers, and brand agents." />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: '#0a0d1e' }}>
        <div className="mx-auto max-w-7xl p-4 md:p-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                to="/pros" 
                className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:underline focus:underline focus:outline-none"
                style={{ color: '#d4af37' }}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Service Professionals
              </Link>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: '#f5f7fa' }}>
              Agents Platform
            </h1>
            <p className="text-lg max-w-3xl" style={{ color: '#c6cfda' }}>
              Comprehensive tools for sports agents, NIL representatives, talent managers, and brand agents.
            </p>
          </header>

          {/* Coming Soon Notice */}
          <div className="mb-8 p-6 rounded-lg border border-white/10" style={{ backgroundColor: '#34485c' }}>
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#f5f7fa' }}>
              Platform Coming Soon
            </h2>
            <p style={{ color: '#c6cfda' }}>
              We're building specialized tools for agents and representatives. This platform will include client management, 
              contract tracking, compliance monitoring, and revenue optimization tools.
            </p>
          </div>

          {/* Planned Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#f5f7fa' }}>
              Planned Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-white/10" style={{ backgroundColor: '#34485c' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#d4af37' }}>
                    <Users className="h-5 w-5" style={{ color: '#0a0d1e' }} />
                  </div>
                  <h3 className="font-semibold" style={{ color: '#f5f7fa' }}>Client Management</h3>
                </div>
                <p className="text-sm" style={{ color: '#c6cfda' }}>
                  Centralized dashboard for managing athlete and talent relationships, contact information, and career milestones.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-white/10" style={{ backgroundColor: '#34485c' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#d4af37' }}>
                    <FileText className="h-5 w-5" style={{ color: '#0a0d1e' }} />
                  </div>
                  <h3 className="font-semibold" style={{ color: '#f5f7fa' }}>Contract Tracking</h3>
                </div>
                <p className="text-sm" style={{ color: '#c6cfda' }}>
                  Monitor contract terms, renewal dates, performance bonuses, and compliance requirements.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-white/10" style={{ backgroundColor: '#34485c' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#d4af37' }}>
                    <TrendingUp className="h-5 w-5" style={{ color: '#0a0d1e' }} />
                  </div>
                  <h3 className="font-semibold" style={{ color: '#f5f7fa' }}>Revenue Analytics</h3>
                </div>
                <p className="text-sm" style={{ color: '#c6cfda' }}>
                  Track earnings, commission structures, and identify new revenue opportunities for your clients.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-white/10" style={{ backgroundColor: '#34485c' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#d4af37' }}>
                    <Calendar className="h-5 w-5" style={{ color: '#0a0d1e' }} />
                  </div>
                  <h3 className="font-semibold" style={{ color: '#f5f7fa' }}>Schedule Management</h3>
                </div>
                <p className="text-sm" style={{ color: '#c6cfda' }}>
                  Coordinate appearances, meetings, training sessions, and promotional events.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#f5f7fa' }}>
              Get Early Access
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: '#c6cfda' }}>
              Be among the first to access the Agents Platform when it launches. Join our early access program.
            </p>
            <Button 
              size="lg"
              style={{ background: 'linear-gradient(to right, #d4af37, #f1e7c6)', color: '#0a0d1e' }}
              className="font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Request Early Access
            </Button>
          </section>
        </div>
      </div>
    </>
  );
}
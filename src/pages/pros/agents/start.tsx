import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AgentsStart() {
  const steps = [
    {
      title: "Complete Your Profile",
      description: "Set up your agency information, specializations, and client focus areas.",
      status: "pending"
    },
    {
      title: "Connect Your Clients",
      description: "Import or add your current client roster and their basic information.",
      status: "pending"
    },
    {
      title: "Set Up Integrations",
      description: "Connect your CRM, calendar, and financial tracking systems.",
      status: "pending"
    },
    {
      title: "Explore Platform Features",
      description: "Take a guided tour of contract management, compliance tools, and analytics.",
      status: "pending"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Getting Started as an Agent | Onboarding Guide</title>
        <meta name="description" content="Step-by-step guide for sports agents, NIL representatives, talent managers, and brand agents to get started." />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: '#0a0d1e' }}>
        <div className="mx-auto max-w-4xl p-4 md:p-8">
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
              Getting Started as an Agent
            </h1>
            <p className="text-lg max-w-3xl" style={{ color: '#c6cfda' }}>
              Your step-by-step guide to setting up and optimizing your agent practice.
            </p>
          </header>

          {/* Quick Start Video */}
          <section className="mb-12">
            <div className="p-8 rounded-lg border border-white/10 text-center" style={{ backgroundColor: '#34485c' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#d4af37' }}>
                <Play className="h-8 w-8" style={{ color: '#0a0d1e' }} />
              </div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#f5f7fa' }}>
                5-Minute Overview
              </h2>
              <p className="mb-4" style={{ color: '#c6cfda' }}>
                Watch this quick introduction to understand how our platform can streamline your agent practice.
              </p>
              <Button 
                variant="outline"
                style={{ borderColor: '#d4af37', color: '#d4af37' }}
                className="hover:bg-[#d4af37] hover:text-[#0a0d1e] transition-all duration-200"
              >
                Watch Overview Video
              </Button>
            </div>
          </section>

          {/* Onboarding Steps */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#f5f7fa' }}>
              Onboarding Checklist
            </h2>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-lg border border-white/10" style={{ backgroundColor: '#34485c' }}>
                  <div className="flex-shrink-0 mt-1">
                    {step.status === 'completed' ? (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#22c55e' }}>
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold" 
                           style={{ borderColor: '#d4af37', color: '#d4af37' }}>
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2" style={{ color: '#f5f7fa' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: '#c6cfda' }}>
                      {step.description}
                    </p>
                    <Button 
                      size="sm"
                      disabled={step.status === 'completed'}
                      style={{ backgroundColor: '#d4af37', color: '#0a0d1e' }}
                      className="font-medium hover:shadow-md transition-all duration-200"
                    >
                      {step.status === 'completed' ? 'Completed' : 'Start Step'}
                      {step.status !== 'completed' && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Resources */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#f5f7fa' }}>
              Resources for Agents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-white/10" style={{ backgroundColor: '#34485c' }}>
                <h3 className="font-semibold mb-3" style={{ color: '#f5f7fa' }}>Industry Compliance Guide</h3>
                <p className="text-sm mb-4" style={{ color: '#c6cfda' }}>
                  Stay up-to-date with NCAA, professional league, and state regulations affecting your practice.
                </p>
                <Link 
                  to="/resources/compliance" 
                  className="text-sm transition-colors duration-200 hover:underline focus:underline focus:outline-none"
                  style={{ color: '#d4af37' }}
                >
                  View Compliance Resources →
                </Link>
              </div>

              <div className="p-6 rounded-lg border border-white/10" style={{ backgroundColor: '#34485c' }}>
                <h3 className="font-semibold mb-3" style={{ color: '#f5f7fa' }}>Contract Templates</h3>
                <p className="text-sm mb-4" style={{ color: '#c6cfda' }}>
                  Access professionally drafted contract templates for various types of representation agreements.
                </p>
                <Link 
                  to="/resources/contracts" 
                  className="text-sm transition-colors duration-200 hover:underline focus:underline focus:outline-none"
                  style={{ color: '#d4af37' }}
                >
                  Browse Templates →
                </Link>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#f5f7fa' }}>
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: '#c6cfda' }}>
              Access the full Agents Platform to begin managing your practice more efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pros/agents/platform">
                <Button 
                  size="lg"
                  style={{ background: 'linear-gradient(to right, #d4af37, #f1e7c6)', color: '#0a0d1e' }}
                  className="font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Access Platform
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline"
                size="lg"
                style={{ borderColor: '#d4af37', color: '#d4af37' }}
                className="hover:bg-[#d4af37] hover:text-[#0a0d1e] font-medium px-8 py-3 rounded-lg transition-all duration-200"
              >
                Schedule Demo
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
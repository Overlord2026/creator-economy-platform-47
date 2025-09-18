import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, ArrowRight, Heart, Building, TrendingUp } from "lucide-react";
import { clientSegments } from "@/components/solutions/WhoWeServe";
import { useUser } from "@/context/UserContext";

export function SegmentedOnboarding() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userProfile } = useUser();

  // Get segment from URL params 
  const segment = searchParams.get('segment');
  const advisorId = searchParams.get('advisor_id');
  const personalNote = searchParams.get('personal_note');
  const invitationType = searchParams.get('invitation_type');

  const getSegmentInfo = () => {
    if (!segment || segment === 'general') {
      return {
        title: 'Welcome to Our Family Office',
        description: 'Comprehensive wealth management solutions tailored for you.',
        icon: Building,
        color: 'bg-blue-500'
      };
    }

    const segmentInfo = clientSegments.find(s => s.id === segment);
    return segmentInfo ? {
      title: `Welcome, ${segmentInfo.title}`,
      description: segmentInfo.description,
      icon: segmentInfo.icon,
      color: 'bg-primary'
    } : {
      title: 'Welcome to Our Family Office',
      description: 'Comprehensive wealth management solutions tailored for you.',
      icon: Building,
      color: 'bg-blue-500'
    };
  };

  const segmentInfo = getSegmentInfo();
  const IconComponent = segmentInfo.icon;

  const handleContinueToDashboard = () => {
    // Navigate to the creator dashboard
    navigate('/creator');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className={`w-16 h-16 rounded-full ${segmentInfo.color} mx-auto flex items-center justify-center`}>
            <IconComponent className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <CardTitle className="text-2xl font-bold">{segmentInfo.title}</CardTitle>
            <CardDescription className="text-lg mt-2">
              {segmentInfo.description}
            </CardDescription>
          </div>

          {invitationType === 'advisor_invite' && (
            <Badge variant="outline" className="mx-auto">
              <UserCheck className="h-3 w-3 mr-1" />
              Advisor Invitation
            </Badge>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Advisor Information - simplified without database query */}
          {advisorId && (
            <div className="bg-secondary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Your Assigned Advisor</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Your Financial Advisor</p>
                  <p className="text-sm text-muted-foreground">Ready to help you achieve your goals</p>
                </div>
              </div>
            </div>
          )}

          {/* Personal Note */}
          {personalNote && (
            <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Personal Message</h3>
              <p className="text-sm italic">"{personalNote}"</p>
            </div>
          )}

          {/* Segment-specific benefits or next steps */}
          <div className="space-y-3">
            <h3 className="font-semibold">What's Next for You:</h3>
            <div className="grid gap-3">
              {segment === 'physician' && (
                <>
                  <div className="flex items-center gap-3 text-sm">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Healthcare-specific tax strategies and retirement planning</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Malpractice insurance optimization and asset protection</span>
                  </div>
                </>
              )}
              {segment === 'executive' && (
                <>
                  <div className="flex items-center gap-3 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Executive compensation planning and equity management</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="h-4 w-4 text-blue-500" />
                    <span>Corporate benefits optimization and deferred compensation</span>
                  </div>
                </>
              )}
              {segment === 'entrepreneur' && (
                <>
                  <div className="flex items-center gap-3 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Business exit planning and succession strategies</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="h-4 w-4 text-blue-500" />
                    <span>Angel investing and alternative investment opportunities</span>
                  </div>
                </>
              )}
              {(!segment || segment === 'general') && (
                <>
                  <div className="flex items-center gap-3 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Personalized wealth management and investment strategies</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="h-4 w-4 text-blue-500" />
                    <span>Comprehensive financial planning and estate services</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <Button 
            onClick={handleContinueToDashboard}
            className="w-full"
            size="lg"
          >
            Continue to Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
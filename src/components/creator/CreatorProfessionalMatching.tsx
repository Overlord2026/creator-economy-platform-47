import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, MapPin, Calendar, MessageSquare, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface MatchedProfessional {
  id: string;
  name: string;
  type: string;
  company?: string;
  location: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  creatorFocus: string[];
  pricing: {
    consultationFee: number;
    hourlyRate?: number;
    projectBased?: boolean;
  };
  availability: 'immediate' | 'within_week' | 'within_month';
  matchScore: number;
  avatar?: string;
  verified: boolean;
}

const matchedProfessionals: MatchedProfessional[] = [
  {
    id: 'prof-1',
    name: 'Sarah Chen',
    type: 'Creator Financial Advisor',
    company: 'Creator Wealth Partners',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviewCount: 127,
    specialties: ['NIL Compliance', 'Multi-State Tax Planning', 'Brand Monetization'],
    creatorFocus: ['NIL Athletes', 'Sports Personalities'],
    pricing: {
      consultationFee: 200,
      hourlyRate: 450,
      projectBased: true
    },
    availability: 'immediate',
    matchScore: 98,
    verified: true
  },
  {
    id: 'prof-2',
    name: 'Marcus Rodriguez',
    type: 'Entertainment Attorney',
    company: 'Digital Rights Law Group',
    location: 'New York, NY',
    rating: 4.8,
    reviewCount: 89,
    specialties: ['Contract Negotiation', 'IP Protection', 'FTC Compliance'],
    creatorFocus: ['Social Media Influencers', 'Content Creators'],
    pricing: {
      consultationFee: 300,
      hourlyRate: 650,
      projectBased: false
    },
    availability: 'within_week',
    matchScore: 94,
    verified: true
  },
  {
    id: 'prof-3',
    name: 'Jennifer Park',
    type: 'Influencer Accountant',
    company: 'Creator Tax Solutions',
    location: 'Austin, TX',
    rating: 4.7,
    reviewCount: 156,
    specialties: ['Multi-Platform Income', 'Expense Optimization', 'Quarterly Planning'],
    creatorFocus: ['Social Media Influencers', 'Content Creators', 'YouTubers'],
    pricing: {
      consultationFee: 150,
      projectBased: true
    },
    availability: 'within_month',
    matchScore: 91,
    verified: true
  }
];

export function CreatorProfessionalMatching() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleConnect = (professional: MatchedProfessional) => {
    toast.success(`Connection request sent to ${professional.name}`);
  };

  const handleScheduleConsultation = (professional: MatchedProfessional) => {
    toast.success(`Consultation scheduled with ${professional.name}`);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'immediate': return 'text-green-600 bg-green-50';
      case 'within_week': return 'text-yellow-600 bg-yellow-50';
      case 'within_month': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'immediate': return 'Available Now';
      case 'within_week': return 'Within 1 Week';
      case 'within_month': return 'Within 1 Month';
      default: return 'Contact for Availability';
    }
  };

  const filteredProfessionals = matchedProfessionals.filter(prof => {
    const matchesSearch = searchQuery === '' || 
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'all' || prof.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || prof.location.includes(selectedLocation);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Find Your Perfect Professional Match</h2>
          <p className="text-muted-foreground">
            AI-powered matching connects you with creators economy specialists
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, specialty, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <label className="text-sm font-medium mb-2 block">Professional Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Creator Financial Advisor">Creator Financial Advisor</SelectItem>
                  <SelectItem value="Entertainment Attorney">Entertainment Attorney</SelectItem>
                  <SelectItem value="Influencer Accountant">Influencer Accountant</SelectItem>
                  <SelectItem value="Brand Management Consultant">Brand Management Consultant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Matched Professionals */}
      <div className="space-y-4">
        {filteredProfessionals.map(professional => (
          <Card key={professional.id} className="hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={professional.avatar} />
                    <AvatarFallback>
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{professional.name}</h3>
                      {professional.verified && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Verified
                        </Badge>
                      )}
                      <Badge className="bg-primary/10 text-primary">
                        {professional.matchScore}% Match
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground">{professional.type}</p>
                    {professional.company && (
                      <p className="text-sm text-muted-foreground">{professional.company}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {professional.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {professional.rating} ({professional.reviewCount} reviews)
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/3 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Creator Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {professional.specialties.map(specialty => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Creator Focus</h4>
                    <div className="flex flex-wrap gap-1">
                      {professional.creatorFocus.map(focus => (
                        <Badge key={focus} variant="outline" className="text-xs">
                          {focus}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Consultation:</span>
                      <span className="font-medium">${professional.pricing.consultationFee}</span>
                    </div>
                    {professional.pricing.hourlyRate && (
                      <div className="flex justify-between text-sm">
                        <span>Hourly Rate:</span>
                        <span className="font-medium">${professional.pricing.hourlyRate}/hr</span>
                      </div>
                    )}
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getAvailabilityColor(professional.availability)}`}
                    >
                      {getAvailabilityText(professional.availability)}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnect(professional)}
                      className="flex-1"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleScheduleConsultation(professional)}
                      className="flex-1"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredProfessionals.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No professionals match your current criteria. Try adjusting your filters or search terms.
          </p>
        </Card>
      )}
    </div>
  );
}
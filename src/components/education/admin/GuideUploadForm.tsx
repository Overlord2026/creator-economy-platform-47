import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { FileText, X, AlertTriangle } from 'lucide-react';

const categories = ['Tax', 'Retirement', 'Estate', 'Investment', 'Insurance', 'Planning', 'Business'];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const availableBadges = ['popular', 'editor-choice', 'new', 'premium', 'free'];

export function GuideUploadForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    difficulty: 'Beginner',
    duration: '',
    is_featured: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleBadge = (badge: string) => {
    setSelectedBadges(prev => 
      prev.includes(badge) 
        ? prev.filter(b => b !== badge)
        : [...prev, badge]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.title || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Log to audit_receipts since education schema not available
      const { error: auditError } = await supabase
        .from('audit_receipts')
        .insert({
          action: 'education_guide_upload_attempted',
          entity: 'education_content',
          entity_id: crypto.randomUUID(),
          sha256: formData.title,
          actor_id: user.id,
          canonical: {
            title: formData.title,
            description: formData.description,
            content_type: 'guide',
            category: formData.category,
            difficulty: formData.difficulty,
            author: formData.author || user.email?.split('@')[0],
            duration: formData.duration,
            tags,
            badges: selectedBadges,
            pdf_file_name: pdfFile?.name,
            cover_image_name: coverImage?.name,
            is_featured: formData.is_featured,
            note: 'Guide upload attempted but education_content table not available'
          }
        });

      if (auditError) throw auditError;
      toast.success('Guide logged to audit system (education tables not available)');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        author: '',
        category: '',
        difficulty: 'Beginner',
        duration: '',
        is_featured: false
      });
      setPdfFile(null);
      setCoverImage(null);
      setTags([]);
      setSelectedBadges([]);
      
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to process guide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <p className="text-sm text-yellow-600 dark:text-yellow-400">
          Education upload is disabled in this environment (table <code>education_content</code> not found). 
          Displaying activity from <code>audit_receipts</code> instead.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Guide Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Complete Guide to Estate Planning"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="Author name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Guide Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description of the guide content and what readers will learn..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Reading Time</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              placeholder="e.g., 15 minutes"
            />
          </div>
        </div>

        {/* PDF Upload */}
        <div className="space-y-2">
          <Label htmlFor="pdf">PDF File</Label>
          <Input
            id="pdf"
            type="file"
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          />
          {pdfFile && (
            <div className="text-sm text-muted-foreground">
              {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>

        {/* Cover Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="cover">Cover Image (optional)</Label>
          <Input
            id="cover"
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
          />
          {coverImage && (
            <div className="text-sm text-muted-foreground">
              {coverImage.name}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <Button type="button" onClick={addTag} variant="outline">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
              </Badge>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-2">
          <Label>Badges</Label>
          <div className="flex flex-wrap gap-2">
            {availableBadges.map(badge => (
              <Badge
                key={badge}
                variant={selectedBadges.includes(badge) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleBadge(badge)}
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.is_featured}
            onChange={(e) => handleInputChange('is_featured', e.target.checked)}
          />
          <Label htmlFor="featured">Mark as featured guide</Label>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <FileText className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Log Guide Request
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
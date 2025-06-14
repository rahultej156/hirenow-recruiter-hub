
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PostJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onJobPosted?: (jobData: any) => void;
}

const PostJobDialog = ({ isOpen, onClose, onJobPosted }: PostJobDialogProps) => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobTitle.trim() || !company.trim() || (!jobDescription.trim() && !file)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const jobData = {
      title: jobTitle,
      company: company,
      location: location,
      type: employmentType,
      salary: salaryRange,
      description: jobDescription,
    };

    console.log("Job Data:", jobData);
    
    // Call the callback to add job to the list
    if (onJobPosted) {
      onJobPosted(jobData);
    }
    
    toast({
      title: "Job Posted Successfully",
      description: "Your job posting has been published",
    });
    
    // Reset form
    setJobTitle("");
    setCompany("");
    setLocation("");
    setEmploymentType("");
    setSalaryRange("");
    setJobDescription("");
    setFile(null);
    onClose();
  };

  const enhanceJobDescription = () => {
    setIsEnhancing(true);
    // Simulate API call
    setTimeout(() => {
      setJobDescription(prevDesc => 
        prevDesc + 
        "\n\nEnhanced Description: We are seeking a talented professional with a passion for innovation and problem-solving. The ideal candidate should possess strong communication skills, attention to detail, and the ability to work effectively in a team environment. Experience with modern technologies and methodologies is highly desired. Must be able to adapt to a fast-paced work environment and deliver high-quality results under tight deadlines."
      );
      setIsEnhancing(false);
      
      toast({
        title: "JD Enhanced",
        description: "Job description has been enhanced with AI",
      });
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      
      toast({
        title: "File Uploaded",
        description: `${e.target.files[0].name} has been uploaded`,
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
          <DialogDescription>
            Create a new job posting to find the perfect candidates
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Job Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="job-title">Job Title *</Label>
                <Input
                  id="job-title"
                  placeholder="e.g. Senior Frontend Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  placeholder="e.g. TechCorp Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="employment-type">Employment Type</Label>
                <Select value={employmentType} onValueChange={setEmploymentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="salary-range">Salary Range</Label>
                <Input
                  id="salary-range"
                  placeholder="e.g. $80,000 - $120,000"
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="write" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="write">Write JD</TabsTrigger>
              <TabsTrigger value="upload">Upload JD</TabsTrigger>
            </TabsList>
            
            <TabsContent value="write" className="space-y-4">
              <div>
                <Label htmlFor="job-description">Job Description *</Label>
                <Textarea
                  id="job-description"
                  placeholder="Enter job description..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={enhanceJobDescription}
                  disabled={isEnhancing}
                  className="flex items-center gap-2"
                >
                  {isEnhancing ? "Enhancing..." : "Enhance JD with AI"}
                  {isEnhancing && <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="upload">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="p-3 rounded-full bg-blue-50">
                    <Upload size={24} className="text-blue-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      <Label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <Input
                          id="file-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </Label>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                  {file && (
                    <div className="text-sm text-gray-900 flex items-center gap-2">
                      <span>Selected file:</span>
                      <span className="font-medium">{file.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Post Job
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostJobDialog;

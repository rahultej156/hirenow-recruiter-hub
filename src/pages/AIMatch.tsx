
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Users, Eye, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AIMatch = () => {
  const [selectedJD, setSelectedJD] = useState("");
  const [uploadedResumes, setUploadedResumes] = useState<File[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<number | null>(null);

  const jobListings = [
    "Senior Full Stack Developer - TechCorp Inc.",
    "UX/UI Designer - Design Studio Pro",
    "DevOps Engineer - CloudTech Solutions",
    "Product Manager - Innovation Labs",
    "Data Scientist - AI Innovations",
    "Frontend Developer - WebTech Agency"
  ];

  const [matchResults, setMatchResults] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      aiScore: 95,
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      experience: "5 years",
      location: "San Francisco, CA",
      currentSalary: "$110,000",
      expectedSalary: "$130,000",
      noticePeriod: "2 months",
      resumeUrl: "#"
    },
    {
      id: 2,
      name: "Michael Chen",
      aiScore: 88,
      skills: ["JavaScript", "React", "Python", "Docker"],
      experience: "4 years",
      location: "Seattle, WA",
      currentSalary: "$95,000",
      expectedSalary: "$120,000",
      noticePeriod: "1 month",
      resumeUrl: "#"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      aiScore: 82,
      skills: ["Frontend", "Vue.js", "CSS", "Design"],
      experience: "3 years",
      location: "Austin, TX",
      currentSalary: "$85,000",
      expectedSalary: "$100,000",
      noticePeriod: "3 weeks",
      resumeUrl: "#"
    },
    {
      id: 4,
      name: "David Kim",
      aiScore: 78,
      skills: ["React", "GraphQL", "MongoDB", "Testing"],
      experience: "6 years",
      location: "New York, NY",
      currentSalary: "$125,000",
      expectedSalary: "$145,000",
      noticePeriod: "1 month",
      resumeUrl: "#"
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedResumes([...uploadedResumes, ...files]);
      
      toast({
        title: "Resumes Uploaded",
        description: `${files.length} resume(s) uploaded successfully`,
      });
    }
  };

  const handleAIMatch = () => {
    if (!selectedJD) {
      toast({
        title: "Error",
        description: "Please select a job description first",
        variant: "destructive",
      });
      return;
    }

    if (uploadedResumes.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one resume",
        variant: "destructive",
      });
      return;
    }

    // Simulate AI matching process
    toast({
      title: "AI Matching Started",
      description: "Processing resumes and matching with job requirements...",
    });

    setTimeout(() => {
      setShowResults(true);
      toast({
        title: "AI Matching Complete",
        description: `Found ${matchResults.length} potential matches`,
      });
    }, 2000);
  };

  const handleEditCandidate = (candidateId: number) => {
    setEditingCandidate(candidateId);
    toast({
      title: "Edit Mode",
      description: "You can now edit candidate details",
    });
  };

  const saveEdit = () => {
    setEditingCandidate(null);
    toast({
      title: "Changes Saved",
      description: "Candidate details updated successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                HireNow
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/jobs">
                <Button variant="ghost">Jobs</Button>
              </Link>
              <Link to="/candidates">
                <Button variant="ghost">Candidates</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">AI Resume Matching</h1>
          <p className="mt-2 text-gray-600">Match resumes with job descriptions using AI-powered analysis</p>
        </div>

        {!showResults ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Select Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Select Job Description
                </CardTitle>
                <CardDescription>
                  Choose from existing job listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="jd-select">Job Descriptions</Label>
                    <Select value={selectedJD} onValueChange={setSelectedJD}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a job description" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobListings.map((job, index) => (
                          <SelectItem key={index} value={job}>
                            {job}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedJD && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Selected:</strong> {selectedJD}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upload Resumes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Resumes
                </CardTitle>
                <CardDescription>
                  Upload candidate resumes for AI matching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Label htmlFor="resume-upload" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Upload resumes
                          </span>
                          <Input
                            id="resume-upload"
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            className="sr-only"
                          />
                        </Label>
                        <p className="mt-1 text-sm text-gray-500">
                          PDF, DOC, DOCX files supported
                        </p>
                      </div>
                    </div>
                  </div>

                  {uploadedResumes.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Uploaded Files ({uploadedResumes.length})</h4>
                      <div className="space-y-2">
                        {uploadedResumes.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* AI Match Button */}
        {!showResults && (
          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              onClick={handleAIMatch}
              disabled={!selectedJD || uploadedResumes.length === 0}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Users className="mr-2 h-5 w-5" />
              Start AI Matching
            </Button>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Matching Results</h2>
                <p className="text-gray-600">Candidates ranked by AI compatibility score</p>
              </div>
              <Button variant="outline" onClick={() => setShowResults(false)}>
                New Match
              </Button>
            </div>

            <div className="grid gap-6">
              {matchResults.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{candidate.name}</h3>
                        <p className="text-gray-600">{candidate.experience} experience • {candidate.location}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{candidate.aiScore}%</div>
                          <div className="text-sm text-gray-500">AI Score</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Current Salary:</span>
                          <span className="text-sm font-medium">{candidate.currentSalary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Expected Salary:</span>
                          <span className="text-sm font-medium">{candidate.expectedSalary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Notice Period:</span>
                          <span className="text-sm font-medium">{candidate.noticePeriod}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Resume
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditCandidate(candidate.id)}
                      >
                        <Edit3 className="mr-2 h-4 w-4" />
                        {editingCandidate === candidate.id ? "Save" : "Edit Details"}
                      </Button>
                      <Button size="sm">
                        Contact Candidate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMatch;

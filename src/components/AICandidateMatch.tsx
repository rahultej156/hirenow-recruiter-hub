
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, File, FileText } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface CandidateProps {
  id: number;
  name: string;
  aiScore: number;
  matchPercentage: number;
  status: string;
  avatar: string;
  email: string;
  phone: string;
  noticePeriod: string;
  currentLocation: string;
  currentSalary: string;
  expectedSalary: string;
  skills: string[];
  experience: string;
}

interface AICandidateMatchProps {
  jobTitle: string;
}

const AICandidateMatch = ({ jobTitle }: AICandidateMatchProps) => {
  // Dummy data for AI-matched candidates
  const candidates: CandidateProps[] = [
    {
      id: 1,
      name: "Alice Johnson",
      aiScore: 92,
      matchPercentage: 95,
      status: "Available",
      avatar: "AJ",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 123-4567",
      noticePeriod: "2 weeks",
      currentLocation: "San Francisco, CA",
      currentSalary: "$135,000",
      expectedSalary: "$155,000",
      skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
      experience: "7 years"
    },
    {
      id: 2,
      name: "Michael Chen",
      aiScore: 88,
      matchPercentage: 92,
      status: "Interviewing",
      avatar: "MC",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      noticePeriod: "1 month",
      currentLocation: "New York, NY",
      currentSalary: "$95,000",
      expectedSalary: "$115,000",
      skills: ["Figma", "UI/UX", "Adobe XD", "Sketch"],
      experience: "5 years"
    },
    {
      id: 3,
      name: "Sarah Williams",
      aiScore: 95,
      matchPercentage: 89,
      status: "Open to offers",
      avatar: "SW",
      email: "sarah.williams@email.com",
      phone: "+1 (555) 345-6789",
      noticePeriod: "3 weeks",
      currentLocation: "Austin, TX",
      currentSalary: "$120,000",
      expectedSalary: "$140,000",
      skills: ["DevOps", "Docker", "Kubernetes", "AWS", "CI/CD"],
      experience: "6 years"
    },
    {
      id: 4,
      name: "Robert Garcia",
      aiScore: 86,
      matchPercentage: 84,
      status: "Looking",
      avatar: "RG",
      email: "robert.garcia@email.com",
      phone: "+1 (555) 890-1234",
      noticePeriod: "2 weeks",
      currentLocation: "Denver, CO",
      currentSalary: "$110,000",
      expectedSalary: "$130,000",
      skills: ["AWS", "Docker", "Jenkins", "Terraform", "Linux"],
      experience: "4 years"
    },
    {
      id: 5,
      name: "Emma Thompson",
      aiScore: 87,
      matchPercentage: 82,
      status: "Available",
      avatar: "ET",
      email: "emma.thompson@email.com",
      phone: "+1 (555) 567-8901",
      noticePeriod: "2 weeks",
      currentLocation: "Boston, MA",
      currentSalary: "$125,000",
      expectedSalary: "$145,000",
      skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Data Analysis"],
      experience: "5.5 years"
    }
  ].sort((a, b) => b.matchPercentage - a.matchPercentage);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const viewResumeHandler = (candidate: CandidateProps) => {
    toast({
      title: "Resume Viewer",
      description: `Opening resume for ${candidate.name}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Candidate Matches for {jobTitle}</CardTitle>
        <CardDescription>
          Top candidates matched by our AI algorithm based on the job description
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Match %</TableHead>
              <TableHead>AI Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {candidate.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{candidate.name}</p>
                      <p className="text-sm text-gray-500">{candidate.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`font-bold text-lg ${getScoreColor(candidate.matchPercentage)}`}>
                    {candidate.matchPercentage}%
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`font-bold text-lg ${getScoreColor(candidate.aiScore)}`}>
                    {candidate.aiScore}%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{candidate.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => viewResumeHandler(candidate)}
                      className="flex items-center gap-1"
                    >
                      <FileText className="h-4 w-4" />
                      Resume
                    </Button>
                    
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button size="sm" className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          Details
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-[400px] sm:w-[540px]">
                        <SheetHeader>
                          <SheetTitle>Candidate Details</SheetTitle>
                          <SheetDescription>
                            View detailed information about {candidate.name}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-6">
                          <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {candidate.avatar}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">{candidate.name}</h3>
                              <p className="text-sm text-gray-600">{candidate.experience} of experience</p>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="font-medium text-gray-700">Email:</p>
                                <p className="text-gray-600">{candidate.email}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700">Phone:</p>
                                <p className="text-gray-600">{candidate.phone}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700">Notice Period:</p>
                                <p className="text-gray-600">{candidate.noticePeriod}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700">Location:</p>
                                <p className="text-gray-600">{candidate.currentLocation}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700">Current Salary:</p>
                                <p className="text-gray-600">{candidate.currentSalary}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700">Expected Salary:</p>
                                <p className="text-gray-600">{candidate.expectedSalary}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="font-medium text-gray-700 mb-2">Skills:</p>
                              <div className="flex flex-wrap gap-2">
                                {candidate.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <p className="font-medium text-gray-700">Match Score:</p>
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{ width: `${candidate.matchPercentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                  {candidate.matchPercentage}%
                                </span>
                              </div>
                            </div>
                            
                            <div className="pt-4 border-t flex gap-2">
                              <Button 
                                className="w-full" 
                                onClick={() => {
                                  toast({
                                    title: "Resume Downloaded",
                                    description: `Resume for ${candidate.name} has been downloaded`,
                                  });
                                }}
                              >
                                <File className="mr-2 h-4 w-4" />
                                Download Resume
                              </Button>
                            </div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-6 flex justify-center">
          <Link to="/candidates">
            <Button>
              View All Candidates
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AICandidateMatch;

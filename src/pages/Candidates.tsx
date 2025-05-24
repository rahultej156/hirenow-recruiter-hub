import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { ArrowDown, FileText, Users, Filter } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ChatbotWidget from "@/components/ChatbotWidget";

const Candidates = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [jobRoleFilter, setJobRoleFilter] = useState("all");
  const location = useLocation();
  const fromJob = location.state?.fromJob;

  const jobRoles = [
    "Senior Full Stack Developer",
    "UX/UI Designer", 
    "DevOps Engineer",
    "Product Manager",
    "Data Scientist",
    "Frontend Developer"
  ];

  const candidates = [
    {
      id: 1,
      name: "Alice Johnson",
      appliedJob: fromJob ? fromJob.title : "Senior Full Stack Developer",
      status: "Interview Scheduled",
      aiScore: 92,
      email: "alice.johnson@email.com",
      phone: "+1 (555) 123-4567",
      noticePeriod: "2 weeks",
      currentLocation: "San Francisco, CA",
      currentSalary: "$135,000",
      expectedSalary: "$155,000",
      avatar: "AJ",
      resumeUrl: "#"
    },
    {
      id: 2,
      name: "Michael Chen",
      appliedJob: fromJob ? fromJob.title : "UX/UI Designer",
      status: "Under Review",
      aiScore: 88,
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      noticePeriod: "1 month",
      currentLocation: "New York, NY",
      currentSalary: "$95,000",
      expectedSalary: "$115,000",
      avatar: "MC",
      resumeUrl: "#"
    },
    {
      id: 3,
      name: "Sarah Williams",
      appliedJob: fromJob ? fromJob.title : "DevOps Engineer",
      status: "Technical Assessment",
      aiScore: 95,
      email: "sarah.williams@email.com",
      phone: "+1 (555) 345-6789",
      noticePeriod: "3 weeks",
      currentLocation: "Austin, TX",
      currentSalary: "$120,000",
      expectedSalary: "$140,000",
      avatar: "SW",
      resumeUrl: "#"
    },
    {
      id: 4,
      name: "David Rodriguez",
      appliedJob: fromJob ? fromJob.title : "Product Manager",
      status: "Final Interview",
      aiScore: 90,
      email: "david.rodriguez@email.com",
      phone: "+1 (555) 456-7890",
      noticePeriod: "1 month",
      currentLocation: "Seattle, WA",
      currentSalary: "$145,000",
      expectedSalary: "$165,000",
      avatar: "DR",
      resumeUrl: "#"
    },
    {
      id: 5,
      name: "Emma Thompson",
      appliedJob: fromJob ? fromJob.title : "Data Scientist",
      status: "Offer Extended",
      aiScore: 87,
      email: "emma.thompson@email.com",
      phone: "+1 (555) 567-8901",
      noticePeriod: "2 weeks",
      currentLocation: "Boston, MA",
      currentSalary: "$125,000",
      expectedSalary: "$145,000",
      avatar: "ET",
      resumeUrl: "#"
    },
    {
      id: 6,
      name: "James Wilson",
      appliedJob: fromJob ? fromJob.title : "Frontend Developer",
      status: "Under Review",
      aiScore: 83,
      email: "james.wilson@email.com",
      phone: "+1 (555) 678-9012",
      noticePeriod: "Immediate",
      currentLocation: "Remote",
      currentSalary: "$85,000",
      expectedSalary: "$95,000",
      avatar: "JW",
      resumeUrl: "#"
    },
    {
      id: 7,
      name: "Lisa Brown",
      appliedJob: fromJob ? fromJob.title : "Product Manager",
      status: "Interview Scheduled",
      aiScore: 91,
      email: "lisa.brown@email.com",
      phone: "+1 (555) 789-0123",
      noticePeriod: "1 month",
      currentLocation: "Chicago, IL",
      currentSalary: "$130,000",
      expectedSalary: "$150,000",
      avatar: "LB",
      resumeUrl: "#"
    },
    {
      id: 8,
      name: "Robert Garcia",
      appliedJob: fromJob ? fromJob.title : "DevOps Engineer",
      status: "Technical Assessment",
      aiScore: 86,
      email: "robert.garcia@email.com",
      phone: "+1 (555) 890-1234",
      noticePeriod: "2 weeks",
      currentLocation: "Denver, CO",
      currentSalary: "$110,000",
      expectedSalary: "$130,000",
      avatar: "RG",
      resumeUrl: "#"
    }
  ];

  const filteredCandidates = jobRoleFilter === "all" 
    ? candidates 
    : candidates.filter(candidate => candidate.appliedJob === jobRoleFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Interview Scheduled": return "bg-blue-100 text-blue-800";
      case "Technical Assessment": return "bg-purple-100 text-purple-800";
      case "Final Interview": return "bg-indigo-100 text-indigo-800";
      case "Offer Extended": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAIScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSendEmail = (candidate, emailType) => {
    toast({
      title: "Email Sent",
      description: `${emailType} email sent to ${candidate.name}`,
    });
    console.log(`Sending ${emailType} email to ${candidate.name} at ${candidate.email}`);
  };

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    console.log("Viewing details for:", candidate);
  };

  const handleViewResume = (candidate) => {
    toast({
      title: "Resume Viewer",
      description: `Opening resume for ${candidate.name}`,
    });
    console.log("Viewing resume for:", candidate);
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
              <Link to="/ai-match">
                <Button variant="ghost">AI Match</Button>
              </Link>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Candidate Management</h1>
          {fromJob ? (
            <p className="mt-2 text-gray-600">
              Viewing candidates for <span className="font-semibold">{fromJob.title}</span> at <span className="font-semibold">{fromJob.company}</span>
            </p>
          ) : (
            <p className="mt-2 text-gray-600">Review and manage candidate applications</p>
          )}
        </div>

        {/* Job Role Filter */}
        {!fromJob && (
          <div className="px-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by Job Role:</span>
              </div>
              <Select value={jobRoleFilter} onValueChange={setJobRoleFilter}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select job role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Roles</SelectItem>
                  {jobRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Candidates Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              {fromJob ? `Candidates for ${fromJob.title}` : `Candidates (${filteredCandidates.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Candidate</th>
                    {!fromJob && <th className="text-left py-3 px-4 font-semibold">Applied Job</th>}
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">AI Score</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {candidate.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{candidate.name}</p>
                            <p className="text-sm text-gray-500">{candidate.email}</p>
                          </div>
                        </div>
                      </td>
                      {!fromJob && (
                        <td className="py-4 px-4">
                          <p className="text-sm font-medium text-gray-900">{candidate.appliedJob}</p>
                        </td>
                      )}
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(candidate.status)}>
                          {candidate.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-bold text-lg ${getAIScoreColor(candidate.aiScore)}`}>
                          {candidate.aiScore}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {/* Email Dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline">
                                Send Email
                                <ArrowDown className="ml-1 h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem 
                                onClick={() => handleSendEmail(candidate, "Interview")}
                              >
                                Interview Invitation
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleSendEmail(candidate, "Feedback")}
                              >
                                Request Feedback
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleSendEmail(candidate, "Not Selected")}
                              >
                                Not Selected
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          {/* Resume Button */}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewResume(candidate)}
                            className="flex items-center gap-1"
                          >
                            <FileText className="h-4 w-4" />
                            Resume
                          </Button>

                          {/* Call Button with Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                onClick={() => handleViewDetails(candidate)}
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Candidate Details</DialogTitle>
                                <DialogDescription>
                                  Contact and employment information for {candidate.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {candidate.avatar}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">{candidate.name}</h3>
                                    <p className="text-sm text-gray-600">{candidate.appliedJob}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm">
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
                                    <p className="font-medium text-gray-700">AI Score:</p>
                                    <p className={`font-bold ${getAIScoreColor(candidate.aiScore)}`}>
                                      {candidate.aiScore}%
                                    </p>
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

                                <div className="pt-4 border-t">
                                  <Button 
                                    className="w-full" 
                                    onClick={() => {
                                      toast({
                                        title: "Call Initiated",
                                        description: `Calling ${candidate.name} at ${candidate.phone}`,
                                      });
                                    }}
                                  >
                                    Call {candidate.name}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default Candidates;


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PostJobDialog from "@/components/PostJobDialog";
import AICandidateMatch from "@/components/AICandidateMatch";

const Jobs = () => {
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const defaultJobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      applicants: 42,
      posted: "3 days ago",
      description: "We're looking for an experienced full stack developer to join our growing team. You'll work on cutting-edge projects using React, Node.js, and cloud technologies.",
      requirements: ["5+ years experience", "React/Node.js", "AWS/Azure", "Team leadership"],
      status: "Active"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Design Studio Pro",
      location: "New York, NY",
      type: "Full-time",
      salary: "$85,000 - $110,000",
      applicants: 28,
      posted: "5 days ago",
      description: "Join our creative team to design beautiful and intuitive user experiences. Work on web and mobile applications for diverse clients.",
      requirements: ["3+ years UX/UI", "Figma/Sketch", "Design systems", "User research"],
      status: "Active"
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$100,000 - $140,000",
      applicants: 35,
      posted: "1 week ago",
      description: "Help us build and maintain scalable infrastructure. Work with Kubernetes, Docker, and CI/CD pipelines in a fast-paced environment.",
      requirements: ["4+ years DevOps", "Kubernetes", "Docker", "CI/CD", "Monitoring"],
      status: "Active"
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$130,000 - $170,000",
      applicants: 56,
      posted: "2 days ago",
      description: "Lead product strategy and development for our SaaS platform. Work closely with engineering and design teams to deliver exceptional user experiences.",
      requirements: ["5+ years PM experience", "SaaS background", "Agile/Scrum", "Analytics"],
      status: "Hot"
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "AI Innovations",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$110,000 - $150,000",
      applicants: 31,
      posted: "4 days ago",
      description: "Use machine learning and statistical analysis to drive business insights. Work with large datasets and modern ML frameworks.",
      requirements: ["PhD or Masters", "Python/R", "ML frameworks", "Statistics"],
      status: "Active"
    },
    {
      id: 6,
      title: "Frontend Developer",
      company: "WebTech Agency",
      location: "Remote",
      type: "Contract",
      salary: "$70 - $90/hour",
      applicants: 67,
      posted: "6 days ago",
      description: "Build responsive and interactive web applications using modern frontend technologies. Remote-first company with flexible hours.",
      requirements: ["3+ years frontend", "React/Vue", "TypeScript", "Responsive design"],
      status: "Active"
    }
  ];

  const [jobs, setJobs] = useState(defaultJobs);

  const handleJobPosted = (jobData: any) => {
    const newJob = {
      id: jobs.length + 1,
      title: jobData.title,
      company: jobData.company,
      location: jobData.location || "Remote",
      type: jobData.type || "Full-time",
      salary: jobData.salary || "Competitive",
      applicants: 0,
      posted: "Just now",
      description: jobData.description,
      requirements: ["Requirements from JD"],
      status: "Active"
    };
    
    setJobs([newJob, ...jobs]);
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
              <Link to="/candidates">
                <Button variant="ghost">Candidates</Button>
              </Link>
              <Link to="/ai-match">
                <Button variant="ghost">AI Match</Button>
              </Link>
              <Button variant="outline" onClick={() => setIsPostJobOpen(true)}>Post Job</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Available Positions</h1>
          <p className="mt-2 text-gray-600">Find the perfect candidates for these open positions</p>
        </div>

        {/* Show AI Candidate Match if a job is selected */}
        {selectedJob && (
          <div className="mb-8">
            <AICandidateMatch jobTitle={selectedJob.title} />
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => setSelectedJob(null)}
              >
                Back to Jobs
              </Button>
            </div>
          </div>
        )}

        {/* Jobs Grid - Only show if no job is selected */}
        {!selectedJob && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-base mt-1">{job.company}</CardDescription>
                    </div>
                    <Badge variant={job.status === "Hot" ? "destructive" : "secondary"}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">{job.location}</Badge>
                    <Badge variant="outline">{job.type}</Badge>
                    <Badge variant="outline">{job.salary}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {job.applicants} applicants • {job.posted}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedJob(job)}>
                        AI Matches
                      </Button>
                      <Link to="/candidates" state={{ fromJob: job }}>
                        <Button size="sm">
                          View Candidates
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action - Only show if no job is selected */}
        {!selectedJob && (
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to find your next hire?
                </h3>
                <p className="text-gray-600 mb-6">
                  Browse through our candidate database to find the perfect match for your open positions.
                </p>
                <Link to="/candidates">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Browse Candidates
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Post Job Dialog */}
      <PostJobDialog 
        isOpen={isPostJobOpen} 
        onClose={() => setIsPostJobOpen(false)}
        onJobPosted={handleJobPosted}
      />
    </div>
  );
};

export default Jobs;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = {
    recentHirings: 24,
    pendingApplications: 156,
    activeJobs: 12,
    totalCandidates: 1240
  };

  const recentHires = [
    { name: "Sarah Johnson", position: "Senior Developer", date: "2024-05-22", department: "Engineering" },
    { name: "Michael Chen", position: "UX Designer", date: "2024-05-21", department: "Design" },
    { name: "Emily Davis", position: "Product Manager", date: "2024-05-20", department: "Product" },
    { name: "David Wilson", position: "Data Analyst", date: "2024-05-19", department: "Analytics" }
  ];

  const recentApplications = [
    { name: "Alex Rodriguez", position: "Frontend Developer", date: "2024-05-24", status: "Under Review" },
    { name: "Lisa Wang", position: "Marketing Manager", date: "2024-05-24", status: "Interview Scheduled" },
    { name: "James Brown", position: "DevOps Engineer", date: "2024-05-23", status: "Technical Assessment" },
    { name: "Maria Garcia", position: "Sales Representative", date: "2024-05-23", status: "Under Review" }
  ];

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
              <Link to="/jobs">
                <Button variant="ghost">Jobs</Button>
              </Link>
              <Link to="/candidates">
                <Button variant="ghost">Candidates</Button>
              </Link>
              <Button variant="outline">Profile</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Recruitment Dashboard</h1>
          <p className="mt-2 text-gray-600">Overview of your hiring activities and metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Hirings</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.recentHirings}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingApplications}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeJobs}</div>
              <p className="text-xs text-muted-foreground">Currently hiring</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalCandidates}</div>
              <p className="text-xs text-muted-foreground">In database</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Hirings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Hirings</CardTitle>
              <CardDescription>Latest successful hires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentHires.map((hire, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {hire.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{hire.name}</p>
                      <p className="text-sm text-gray-600">{hire.position}</p>
                      <p className="text-xs text-gray-500">{hire.department} • {hire.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest candidate applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {application.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{application.name}</p>
                      <p className="text-sm text-gray-600">{application.position}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{application.date}</p>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {application.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common recruiting tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/jobs">
                  <Button className="w-full" variant="outline">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    View All Jobs
                  </Button>
                </Link>
                <Link to="/candidates">
                  <Button className="w-full" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Browse Candidates
                  </Button>
                </Link>
                <Button className="w-full" variant="outline">
                  <ArrowDown className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


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
import { Upload } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

interface PostJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostJobDialog = ({ isOpen, onClose }: PostJobDialogProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const form = useForm({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
    }
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log("Form data:", data, "Job Description:", jobDescription);
    
    toast({
      title: "Job Posted Successfully",
      description: `${data.title} at ${data.company} has been posted`,
    });
    
    onClose();
  });

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
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
          <DialogDescription>
            Create a new job posting to find the perfect candidates
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. TechCorp Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Full-time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $120,000 - $160,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Tabs defaultValue="write" className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="write">Write JD</TabsTrigger>
                <TabsTrigger value="upload">Upload JD</TabsTrigger>
              </TabsList>
              
              <TabsContent value="write" className="space-y-4">
                <div>
                  <Label htmlFor="job-description">Job Description</Label>
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
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostJobDialog;

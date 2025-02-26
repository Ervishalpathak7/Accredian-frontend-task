import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift, Link2, Users } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  // Referrer details
  referrerName: z.string().min(2, "Name must be at least 2 characters"),
  referrerEmail: z.string().email("Invalid email address"),
  referrerPhone: z.string().min(10, "Phone number must be at least 10 digits"),

  // Referee details
  refereeName: z.string().min(2, "Name must be at least 2 characters"),
  refereeEmail: z.string().email("Invalid email address"),
  refereePhone: z.string().min(10, "Phone number must be at least 10 digits"),

  // Course details
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional(),
})

function Referral() {
  const [isOpen, setIsOpen] = useState(false)
  const referralProgress = 60

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referrerName: "",
      referrerEmail: "",
      referrerPhone: "",
      refereeName: "",
      refereeEmail: "",
      refereePhone: "",
      course: "",
      message: "",
    },
  })

  const onSubmit = async (values) => {
    try {
      // Here you would typically send the data to your API
      console.log(values)
      toast.success("Referral submitted successfully!")
      setIsOpen(false)
      form.reset()
    } catch (error) {
      toast.error("Failed to submit referral")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-muted to-white">
      <div className="container mx-auto p-4 max-w-4xl space-y-6 pt-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Refer Friends & Earn Rewards
          </h1>
          <p className="text-lg text-muted-foreground">Share the love and get rewarded for every friend who joins</p>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 md:p-8 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Card className="bg-primary-muted border-0">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">12</div>
                    <p className="text-sm text-primary/80">Total Referrals</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-secondary-muted border-0">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="rounded-full bg-secondary/10 p-3">
                    <Link2 className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">5</div>
                    <p className="text-sm text-secondary/80">Active Links</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-accent-muted border-0 col-span-2 sm:col-span-1">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="rounded-full bg-accent/10 p-3">
                    <Gift className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">$120</div>
                    <p className="text-sm text-accent/80">Rewards Earned</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Section */}
            <div className="space-y-3 bg-secondary-muted rounded-lg p-6">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-secondary">Progress to next reward</span>
                <span className="font-bold text-secondary">{referralProgress}%</span>
              </div>
              <Progress value={referralProgress} className="h-2" />
              <p className="text-sm text-secondary/80">3 more referrals until your next reward!</p>
            </div>

            {/* Refer Now Button and Modal */}
             <div className="flex justify-center">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                    Refer Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
                  <DialogHeader>
                    <DialogTitle>Refer a Friend</DialogTitle>
                    <DialogDescription>Fill in the details below to refer your friend to a course.</DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Referrer Details Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Your Details</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="referrerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="referrerEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="referrerPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 000-0000" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Friend's Details Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Friend's Details</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="refereeName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Friend's Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Jane Smith" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="refereeEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Friend's Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="jane@example.com" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="refereePhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Friend's Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 000-0000" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Course Selection */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Course Details</h3>
                        <FormField 
                          control={form.control}
                          name="course"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select Course</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a course" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white">
                                  <SelectItem value="web-development">Web Development</SelectItem>
                                  <SelectItem value="data-science">Data Science</SelectItem>
                                  <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                                  <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                                  <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Personal Message (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Add a personal message to your friend..." {...field} />
                              </FormControl>
                              <FormDescription>
                                Your friend will see this message in their invitation email.
                              </FormDescription>
                              <FormMessage className="text-red-500 text-sm mt-1" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Submit Referral</Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* How it Works Card */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardTitle>How it Works</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Fill the referral form</h4>
                  <p className="text-sm text-muted-foreground">Provide your friend's details and select a course</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Friend receives invitation</h4>
                  <p className="text-sm text-muted-foreground">
                    They'll get an email with course details and your personal message
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Earn rewards</h4>
                  <p className="text-sm text-muted-foreground">Get rewarded when your friend enrolls in the course</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Referral
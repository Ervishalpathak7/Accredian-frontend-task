import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  referrerName: z.string().min(2, "Name must be at least 2 characters"),
  referrerEmail: z.string().email("Invalid email address"),
  referredName: z.string().min(2, "Name must be at least 2 characters"),
  referredEmail: z.string().email("Invalid email address"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional(),
})

const courses = [
  { id: "web-dev", name: "Web Development" },
  { id: "data-science", name: "Data Science" },
  { id: "mobile-dev", name: "Mobile Development" },
  { id: "ai-ml", name: "AI & Machine Learning" },
]

export function ReferralForm({ onSuccess }) {
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referrerName: "",
      referrerEmail: "",
      referredName: "",
      referredEmail: "",
      course: "",
      message: "",
    },
  })

  async function onSubmit(values) {
    setIsSubmitting(true)
    setError(null)

    try {
      // Replace with your actual API endpoint
      const response = await fetch("https://accredian-backend-task-5ftf.onrender.com/referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Something went wrong")
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Information</h2>
          <FormField
            control={form.control}
            name="referrerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <FormField
            control={form.control}
            name="referrerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Friend's Information</h2>
          <FormField
            control={form.control}
            name="referredName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Friend's Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter friend's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <FormField
            control={form.control}
            name="referredEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Friend's Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter friend's email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
        </div>

        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Course</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Message (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Add a personal message to your friend" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full bg-[#ff3366] hover:bg-[#ff1f4f]"
          disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Referral"}
        </Button>
      </form>
    </Form>
  );
}
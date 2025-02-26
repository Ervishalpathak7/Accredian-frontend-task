import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { ReferralForm } from "./referral-form"
import { Progress } from "@/components/ui/progress"
import { Users, Link2, Gift } from "lucide-react"

export default function ReferralPage() {
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  return (
    <div className="min-h-screen bg-[#fff1f1]">
      <div className="container px-4 py-12 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-[#ff3366] via-[#ff00ff] to-[#9933ff] text-transparent bg-clip-text">
            Refer Friends & Earn Rewards
          </h1>
          <p className="text-gray-600 text-lg">Share the love and get rewarded for every friend who joins</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#fff5f0] p-6 rounded-xl">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-[#ff3366]" />
                <div>
                  <div className="text-2xl font-bold text-[#ff3366]">12</div>
                  <div className="text-sm text-gray-600">Total Referrals</div>
                </div>
              </div>
            </div>
            <div className="bg-[#f5f0ff] p-6 rounded-xl">
              <div className="flex items-center gap-3">
                <Link2 className="h-6 w-6 text-[#9933ff]" />
                <div>
                  <div className="text-2xl font-bold text-[#9933ff]">5</div>
                  <div className="text-sm text-gray-600">Active Links</div>
                </div>
              </div>
            </div>
            <div className="bg-[#f0f9ff] p-6 rounded-xl">
              <div className="flex items-center gap-3">
                <Gift className="h-6 w-6 text-[#3399ff]" />
                <div>
                  <div className="text-2xl font-bold text-[#3399ff]">$120</div>
                  <div className="text-sm text-gray-600">Rewards Earned</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f5f0ff] p-6 rounded-xl mb-8">
            <div className="flex justify-between mb-2">
              <div className="text-sm font-medium">Progress to next reward</div>
              <div className="text-sm font-medium">60%</div>
            </div>
            <Progress value={60} className="h-2 mb-2" />
            <div className="text-sm text-gray-600">3 more referrals until your next reward!</div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[#ff3366] hover:bg-[#ff1f4f] text-white px-8 py-6 rounded-full text-lg font-semibold"
            >
              Refer Now
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#fff1f1] to-[#f5f0ff] rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-8">How it Works</h2>
          <div className="grid gap-6">
            <div className="flex gap-4 items-start">
              <div className="bg-[#ff3366] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Fill the referral form</h3>
                <p className="text-gray-600">Provide your friend's details and select a course</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-[#9933ff] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Friend receives invitation</h3>
                <p className="text-gray-600">They'll get an email with course details and your personal message</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-[#3399ff] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Earn rewards</h3>
                <p className="text-gray-600">Get rewarded when your friend enrolls in the course</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Refer a Friend</DialogTitle>
            <DialogDescription>Fill out the form to send an invitation to your friend.</DialogDescription>
          </DialogHeader>
          <ReferralForm
            onSuccess={() => {
              setShowForm(false)
              setShowSuccess(true)
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-[425px] text-center">
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>Your referral has been processed.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="rounded-full bg-[#f0fff5] p-3">
              <Gift className="h-6 w-6 text-[#00cc66]" />
            </div>
            <h2 className="text-2xl font-semibold">Referral Successful!</h2>
            <p className="text-gray-600">Your referral has been sent successfully. We'll notify you once they join.</p>
            <Button className="bg-[#00cc66] hover:bg-[#00b359] text-white" onClick={() => setShowSuccess(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
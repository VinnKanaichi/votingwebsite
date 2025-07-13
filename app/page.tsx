'use client'

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function VotingPage() {
  const [votes, setVotes] = useState({ furina: 0, multifungsi: 0 })
  const [hasVoted, setHasVoted] = useState(false)

  // Load vote data dari localStorage
  useEffect(() => {
    const storedVotes = localStorage.getItem("votingData")
    const storedHasVoted = localStorage.getItem("hasVoted")

    if (storedVotes) {
      setVotes(JSON.parse(storedVotes))
    }

    if (storedHasVoted === "true") {
      setHasVoted(true)
    }
  }, [])

  const handleVote = (type: "furina" | "multifungsi") => {
    if (hasVoted) return

    const updatedVotes = {
      ...votes,
      [type]: votes[type] + 1,
    }

    setVotes(updatedVotes)
    setHasVoted(true)

    localStorage.setItem("votingData", JSON.stringify(updatedVotes))
    localStorage.setItem("hasVoted", "true")
  }

  const totalVotes = votes.furina + votes.multifungsi
  const percentFurina = totalVotes > 0 ? (votes.furina / totalVotes) * 100 : 0
  const percentMultifungsi = totalVotes > 0 ? (votes.multifungsi / totalVotes) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl p-6">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-6">🗳️ Voting Bot Favoritmu</h1>

          {!hasVoted ? (
            <div className="flex flex-col gap-4">
              <Button onClick={() => handleVote("furina")} className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-6">
                BOT YANG SEKARANG FURINA
              </Button>
              <Button onClick={() => handleVote("multifungsi")} className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-6">
                BOT MULTIFUNGSI
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-center">✅ Terima kasih telah memberikan suara!</h2>
              <div>
                <p className="mb-2">BOT YANG SEKARANG FURINA: {percentFurina.toFixed(1)}%</p>
                <Progress value={percentFurina} />
              </div>
              <div>
                <p className="mt-4 mb-2">BOT MULTIFUNGSI: {percentMultifungsi.toFixed(1)}%</p>
                <Progress value={percentMultifungsi} />
              </div>
              <p className="text-sm text-center text-white/70 mt-6">Total suara: {totalVotes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
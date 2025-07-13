import { useState, useEffect } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Progress } from "@/components/ui/progress";

export default function VotingPage() { const [votes, setVotes] = useState({ furina: 0, multifungsi: 0 }); const [hasVoted, setHasVoted] = useState(false);

useEffect(() => { const storedVotes = JSON.parse(localStorage.getItem("votes")); if (storedVotes) setVotes(storedVotes);

const voted = localStorage.getItem("hasVoted");
if (voted) setHasVoted(true);

}, []);

const handleVote = (type) => { if (hasVoted) return;

const newVotes = {
  ...votes,
  [type]: votes[type] + 1,
};
setVotes(newVotes);
localStorage.setItem("votes", JSON.stringify(newVotes));
localStorage.setItem("hasVoted", "true");
setHasVoted(true);

};

const totalVotes = votes.furina + votes.multifungsi; const furinaPercent = totalVotes === 0 ? 0 : (votes.furina / totalVotes) * 100; const multiPercent = totalVotes === 0 ? 0 : (votes.multifungsi / totalVotes) * 100;

return ( <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4"> <Card className="w-full max-w-md p-6 shadow-2xl rounded-2xl bg-white"> <CardContent> <h1 className="text-2xl font-bold text-center mb-6">Vote untuk Bot Favoritmu</h1> <div className="space-y-4"> <div className="text-center space-y-2"> <Button className="w-full text-lg font-medium" onClick={() => handleVote("furina")} disabled={hasVoted} > BOT YANG SEKARANG FURINA </Button> <Progress value={furinaPercent} /> <p>{furinaPercent.toFixed(1)}%</p> </div> <div className="text-center space-y-2"> <Button className="w-full text-lg font-medium" onClick={() => handleVote("multifungsi")} disabled={hasVoted} > BOT MULTIFUNGSI </Button> <Progress value={multiPercent} /> <p>{multiPercent.toFixed(1)}%</p> </div> {hasVoted && ( <p className="text-center text-sm text-green-600 font-medium">Terima kasih telah memilih!</p> )} </div> </CardContent> </Card> </div> ); }


import ConnectWallet from "../components/ConnectWallet";
import SubmitFeedback from "../components/SubmitFeedback";
import FeedbackList from "../components/FeedbackList";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Base Feedback Board</h1>
      <ConnectWallet />
      <SubmitFeedback />
      <FeedbackList />
    </main>
  );
}

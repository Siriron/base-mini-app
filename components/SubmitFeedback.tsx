"use client";
import { useState } from "react";
import { useAccount, useSigner as useWagmiSigner } from "wagmi";
import { Contract } from "ethers";
import ABI from "../abi/FeedbackBoard.json";

const CONTRACT_ADDRESS = "0xD896C29176D244B502D8C6312fa96f3760545E16";

export default function SubmitFeedback() {
  const { isConnected } = useAccount();
  const { data: signer } = useWagmiSigner(); // rename useSigner import

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function submit() {
    if (!signer) {
      setStatus("Connect your wallet first");
      return;
    }
    try {
      const contract = new Contract(CONTRACT_ADDRESS, ABI.abi, signer);
      const tx = await contract.submitFeedback(message);
      setStatus("Waiting for transaction...");
      await tx.wait();
      setStatus("Feedback submitted!");
    } catch (e: any) {
      setStatus("Error: " + (e?.message ?? "Unknown error"));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="border rounded p-2"
        placeholder="Type your feedback here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        disabled={!isConnected || message.trim().length === 0}
        onClick={submit}
      >
        Submit Feedback
      </button>
      <p>{status}</p>
    </div>
  );
}

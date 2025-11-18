"use client";

import { useEffect, useState } from "react";
import { Contract, JsonRpcProvider, type BigNumberish } from "ethers";
import ABI from "../abi/FeedbackBoard.json";

const CONTRACT_ADDRESS = "0xD896C29176D244B502D8C6312fa96f3760545E16";

type Feedback = {
  sender: string;
  message: string;
  timestamp: number;
};

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    async function load() {
      const provider = new JsonRpcProvider("https://mainnet.base.org");
      const contract = new Contract(CONTRACT_ADDRESS, ABI.abi, provider);

      const count: BigNumberish = await contract.getFeedbackCount();
      const len = Number(count);

      const items: Feedback[] = [];
      for (let i = 0; i < len; i++) {
        const fb = await contract.getFeedback(i);
        items.push({
          sender: fb.sender,
          message: fb.message,
          timestamp: Number(fb.timestamp),
        });
      }
      setFeedbacks(items);
    }

    load();
  }, []);

  return (
    <div className="space-y-4 mt-6">
      {feedbacks.map((fb, idx) => (
        <div key={idx} className="border p-3 rounded">
          <p className="font-bold text-sm">{fb.sender}</p>
          <p>{fb.message}</p>
          <p className="text-xs text-gray-500">
            {new Date(fb.timestamp * 1000).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

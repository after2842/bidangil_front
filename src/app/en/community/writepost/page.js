"use client";
import { useRouter } from "next/navigation";

export default function WritePost() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Write Post</h1>
      <p className="text-gray-600 mb-8">This page is under construction</p>
      <button
        onClick={() => router.push("/en/community")}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Back to Community
      </button>
    </div>
  );
}

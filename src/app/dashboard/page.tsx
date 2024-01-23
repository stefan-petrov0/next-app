"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const rt = useRouter()

  const handleRedirect = ()=>{
      rt.push("/dashboard/surveys/create")
  }


  return (
    <div className="flex flex-col justify-center h-full gap-y-20">
      <h1 className="text-7xl font-semibold	text-center text-black">Welcome To Next Question ?</h1>
      <div className="text-center">
        <button className="text-4xl border px-4 py-2 rounded-lg bg-white bg-opacity-60" onClick={handleRedirect}>Create A Survey</button>
      </div>
    </div>
  );

}
"use client";

import { useRouter } from "next/navigation";

export default function PublicSurveysPage() {
    const rt = useRouter()

    const handleRedirectToCreate = () => {
        rt.push(`/dashboard/surveys/create`)
    }

    return (
        <div className="flex flex-col justify-center h-full gap-y-20 bgimage">
            <h1 className="text-7xl font-semibold text-center text-black">Thanks For Participation</h1>
            <div className="text-center">
                <button className="text-4xl border px-16 py-2 rounded-lg bg-white bg-opacity-60" onClick={handleRedirectToCreate}>Done</button>
            </div>
        </div>
    )
}

import React from "react";

export default function PublicSurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto my-6">{children}</div>;
}

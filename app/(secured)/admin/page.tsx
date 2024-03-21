"use client";

import useUser from "@/hooks/useUser";

export default function Home() {
  const { loading, user } = useUser();

  return <div>Hello Admin {loading ? "Loading..." : user!.email}</div>;
}

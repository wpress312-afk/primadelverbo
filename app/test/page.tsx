import type { Metadata } from "next";
import TestClient from "./TestClient";

export const metadata: Metadata = {
  title: "Test filosofico — Prima del Verbo",
  description:
    "Quanto sei lontano da te stesso? Un test in 25 domande a cinque dimensioni: dove il sonno è più denso in te, e da dove puoi cominciare a tornare.",
};

export default function TestPage() {
  return <TestClient />;
}

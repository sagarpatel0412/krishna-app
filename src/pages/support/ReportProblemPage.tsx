// pages/support/ReportProblemPage.tsx
import FeedbackFormPage from "./FeedbackFormPage";

export default function ReportProblemPage() {
  return (
    <FeedbackFormPage
      type="problem"
      title="Report a Problem"
      subtitle="Tell us about bugs, broken pages or anything not working properly."
    />
  );
}
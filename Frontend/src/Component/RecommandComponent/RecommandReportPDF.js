import { Page, Document, View, StyleSheet } from "@react-pdf/renderer";
import StrengthCoverPage from "./StrengthCoverPage";
import ReportCandidatePage from "./ReportCandidatePage";

const styles = StyleSheet.create({
  page: { padding: 40 },
});

const RecommandReportPDF = ({ resultsSummary, candidates }) => (
  <Document>
    {/* 표지 */}
    <Page size="A4" style={styles.page}>
      <StrengthCoverPage summary={resultsSummary[0]} />
    </Page>

    {/* 후보자 이력서 */}
    {candidates.map((candidate, index) => (
      <Page key={index} size="A4" style={styles.page} wrap>
        <ReportCandidatePage candidate={candidate} />
      </Page>
    ))}
  </Document>
);

export default RecommandReportPDF;
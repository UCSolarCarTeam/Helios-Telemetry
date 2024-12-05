import GraphContainer from "@/components/containers/GraphContainer";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-96 w-full items-center justify-center gap-4 rounded-lg bg-white p-2 text-3xl font-bold">
      {children}
    </div>
  );
}
export default function GraphsTab() {
  return (
    <div className="flex size-full max-h-96 flex-col items-center gap-4 md:flex-row">
      <Card>
        <GraphContainer plotType="/api/getLapCorrelationMatrix" />
      </Card>
      <Card>
        <GraphContainer plotType="/api/getPacketCorrelationMatrix" />
      </Card>
    </div>
  );
}

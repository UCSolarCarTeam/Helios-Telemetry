import { useState } from "react";

import DriverSelection from "../molecules/AnalysisMolecules/DriverSelection";
import FeatureFilters from "../molecules/AnalysisMolecules/FeatureFilters";
import GraphsTab from "../molecules/AnalysisMolecules/GraphsTab";
import StatsTab from "../molecules/AnalysisMolecules/StatsTab";

type TabContentProps = React.PropsWithChildren<{
  index: number;
  value: number;
  className?: string;
}>;

export function TabContent({ children, index, value }: TabContentProps) {
  if (value !== index) return null;
  return children;
}

function AnalysisTab() {
  const [value, setValue] = useState<number>(0);
  return (
    <div className="flex flex-col gap-4 px-4">
      <DriverSelection setValue={setValue} value={value} />
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <FeatureFilters />
        <TabContent index={0} value={value}>
          <GraphsTab />
        </TabContent>
        <TabContent index={1} value={value}>
          <StatsTab />
        </TabContent>
      </div>
    </div>
  );
}

export default AnalysisTab;

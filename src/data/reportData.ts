import type { ReportSection } from "../types"
import { TotalEmissionsByPlantChart, meta as totalEmissionsMeta } from "../components/charts/TotalEmissionsByPlantChart"
import { EmissionsByScopeChart, meta as emisionsByScopeMeta } from "../components/charts/EmissionsByScopeChart"
import { ScopeBreakdownByPlantChart, meta as scopeBreakdownByPlantMeta } from "../components/charts/ScopeBreakdownByPlantChart"
import { Scope1ProfileChart, meta as scope1ProfileMeta } from "../components/charts/Scope1ProfileChart"
import { Scope2ProfileChart, meta as scope2ProfileMeta } from "../components/charts/Scope2ProfileChart"
import { TopScope3SourcesChart, meta as topScope3SourcesMeta } from "../components/charts/TopScope3SourcesChart"

export const reportSections: ReportSection[] = [
    { ...totalEmissionsMeta, component: TotalEmissionsByPlantChart },
    { ...emisionsByScopeMeta, component: EmissionsByScopeChart },
    { ...scopeBreakdownByPlantMeta, component: ScopeBreakdownByPlantChart },
    { ...scope1ProfileMeta, component: Scope1ProfileChart },
    { ...scope2ProfileMeta, component: Scope2ProfileChart },
    { ...topScope3SourcesMeta, component: TopScope3SourcesChart }
]

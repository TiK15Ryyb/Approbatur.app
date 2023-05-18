import { ReportScreen } from "@/components/ReportScreen/ReportScreen"
import { getCrawl } from '@/lib/getCrawl';
import { useSearchParams } from "next/navigation";

export default async function Home() {
  const crawlId = "1"
  const crawl = await getCrawl(crawlId as string)
  return <ReportScreen crawl={crawl}></ReportScreen>
}
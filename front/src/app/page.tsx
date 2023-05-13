import { MainScreen } from "@/components/MainScreen/MainScreen"
import { getCrawls } from "@/lib/getCrawls"

export default async function Home() {
  const crawls = await getCrawls();
  return <MainScreen crawls={crawls}></MainScreen>
}
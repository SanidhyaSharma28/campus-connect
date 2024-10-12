import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OngoingJobs } from "./ongoing-jobs"
import { PastJobs } from "./past-jobs"
import { FutureJobs } from "./future-jobs"



export const Jobs = () => {

    return (
        <Tabs defaultValue="Ongoing" style={{maxHeight:"600px"}} className="  w-full">
            <TabsList>
                <TabsTrigger value="Ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="Past">Past</TabsTrigger>
                <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
            </TabsList>
            <TabsContent value="Ongoing">
                <OngoingJobs/>
            </TabsContent>
            <TabsContent value="Past">
                <PastJobs/>
            </TabsContent>
            <TabsContent className="h-full" value="Upcoming">
                <FutureJobs/>
            </TabsContent>
        </Tabs>

    )
}
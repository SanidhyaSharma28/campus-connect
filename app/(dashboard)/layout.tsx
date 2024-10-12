import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";



interface DashboardLayoutProps{
    children:React.ReactNode
}

const DashboardLayout=({
    children,
}:DashboardLayoutProps)=>{
    return(
        <main className="h-screen">
            <Sidebar/>

            <div className="pl-[140px] h-full">
                <div className="flex h-full">

                    <div className="h-full flex-1">
                        <Navbar/>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;
import SideNavigation from "../_components/SideNavigation";

export default function Layout({children}){
  return <div className="grid grid-cols-[16rem_1fr] h-full grid-12">
    <SideNavigation/>
    <div className="py-1 px-4">{children}</div>
  </div>
}
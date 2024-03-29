"use client";

import Image from "next/image";

// importing ant d components
import {
    Divider,
} from "antd";

import { useRouter } from "next/navigation";

import StackedBarChart from "@/components/projects/Charts/StackedBarChart";
import ProjectsList from "@/components/projects/Projectslists/Projectslist";
import Resources from "@/components/projects/Resources/Resources";
import DashCards from "@/components/projects/Cards/Cards";
import Barchart from "@/components/projects/Charts/Barchart";

const Dashboard = () => {
    return (
        <>
            <div className="mx-8 space-y-7 mt-3">
                <h1 className="ml-2 uppercase text-3xl">Project View</h1>
                <div className="flex flex-row gap-9 w-full ml-4">
                    <DashCards />
                </div>
                <div className="flex flex-col space-y-6">
                    <div className="bg-white my-6 p-10">
                        <div className="flex flex-col">
                            <h2 className="text-3xl mb-5">Project Overview</h2>
                            <Barchart />
                        </div>
                    </div>
                </div>
                <div className="bg-white my-6 p-10">
                    <div className="flex flex-col justify-center items-start">
                        <div className="flex flex-col">
                            <h2 className="text-3xl">Top Project Resources</h2>
                            <h5 className="text-xl">
                                Top most resources working on top projects
                            </h5>
                        </div>
                        <StackedBarChart />
                    </div>
                </div>
                <div className="my-5">
                    <ProjectsList />
                </div>
                <div>
                    <Resources />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
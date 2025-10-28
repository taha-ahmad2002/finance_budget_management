import { Suspense } from "react";
import CardWrapper from "@/app/ui/dashboard/cards";
import {CardsSkeleton} from "@/app/ui/skeletons";
import {lusitana} from "@/app/ui/fonts";

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
        </main>
    );
}
import React from "react";
import ContentManage from "./manage-content";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getLatestProducts } from "@/lib/actions/product.actions";

const AdminProducts = async () =>{
    const session = await auth();
    
    if (!session) {
    return redirect('/sign-in');
    }

    const latestProducts = await getLatestProducts();

    return(
        <ContentManage data={latestProducts} />
    )
}

export default AdminProducts
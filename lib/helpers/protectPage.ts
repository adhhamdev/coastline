import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/auth";


export default async function protectPage() {
    const user = await getUser();
  
    if (!user) {
      redirect("/auth/login");
    }

    return user;
}
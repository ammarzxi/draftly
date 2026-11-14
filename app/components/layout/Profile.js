
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "../../lib/supabase/client";
import { useGlobal } from "@/app/context/GlobalVars";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();


    useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("[data-profile-popup-wrapper]")) {
        setOpen(null);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [setOpen]);

    useEffect(() => {
        async function getProfile() {
            const supabase = createClient();

            const { data, error } = await supabase.auth.getUser();

            if (error) {
                console.log(error);
                return;
            }

            setUser(data.user);
        }

        getProfile();
    }, []);

    async function handleSignOut() {
        const supabase = createClient();

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log(error);
            return;
        }

        router.replace("/login");
        router.refresh();
    }

    const displayName =
        user?.user_metadata?.full_name || user?.email || "Account";

    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className="relative" data-profile-popup-wrapper>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full bg-primary/15 text-primary border border-border flex items-center justify-center font-semibold text-sm hover:bg-primary/20 transition"
            >
                {initial}
            </button>

            {open && (
                <div className="absolute left-10 bottom-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg p-2 z-50">
                    <div className="px-3 py-2 border-b border-border">
                        <p className="text-sm font-medium text-foreground truncate">
                            {displayName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {user?.email}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex items-center gap-x-2 w-full text-sm text-muted-foreground hover:text-red-500 hover:bg-muted/40 rounded-md px-3 py-2 mt-2 transition"
                    >
                        <LogOut size={16} />
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}

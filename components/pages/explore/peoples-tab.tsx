import UserCard from "@/components/common/user-card";
import { TabsContent } from "@/components/ui/tabs";
import { SearchResults } from "@/lib/types/pages/explore";
import { UserSearch } from "lucide-react";
import { Profile } from "@/lib/types/database.types";

export default function PeoplesTab({
  searchResults,
  profile,
}: {
  searchResults: SearchResults;
  profile: Profile | null;
}) {
  return (
    <TabsContent value="users" className="m-0 px-4">
      {searchResults.users.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {searchResults.users.map((user: Profile) => (
            <div key={user.id}>
              <UserCard profile={user} currentUser={profile} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <UserSearch className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg mb-1">No people found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </TabsContent>
  );
}

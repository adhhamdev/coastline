import PostCardSkeleton from "@/components/feed/post-card-skeleton"

export default function LoadingFeed() {
    return (
        <div className="w-full px-0 sm:px-4 md:container md:py-6 md:max-w-2xl lg:max-w-3xl mx-auto">
            <div className="space-y-0 sm:space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="border-b sm:border-none">
                        <PostCardSkeleton />
                    </div>
                ))}
            </div>
        </div>
    )
} 
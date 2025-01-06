'use client'

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
    postId: string
}

export function ShareButton({ postId }: ShareButtonProps) {
    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'Share Post',
                text: 'Check out this post!',
                url: `${window.location.origin}/post/${postId}`
            })
        } catch (error) {
            console.error('Error sharing:', error)
        }
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="px-3"
            onClick={handleShare}
        >
            <Share2 className="h-4 w-4" />
        </Button>
    )
}
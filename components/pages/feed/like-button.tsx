'use client'

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"
import { likePost, unlikePost } from "@/lib/actions/posts"

interface LikeButtonProps {
    postId: string
    initialLiked: boolean
    initialCount: number
}

export function LikeButton({ postId, initialLiked, initialCount }: LikeButtonProps) {
    const [isLiking, setIsLiking] = useState(false)
    const [likeCount, setLikeCount] = useState(initialCount)
    const [isLiked, setIsLiked] = useState(initialLiked)

    const handleLike = async () => {
        if (isLiking) return
        setIsLiking(true)
        try {
            if (isLiked) {
                await unlikePost(postId)
                setLikeCount(prev => prev - 1)
                setIsLiked(false)
            } else {
                await likePost(postId)
                setLikeCount(prev => prev + 1)
                setIsLiked(true)
            }
        } catch (error) {
            console.error('Error liking post:', error)
        } finally {
            setIsLiking(false)
        }
    }

    return (
        <Button
            variant={isLiked ? "default" : "ghost"}
            size="sm"
            className="gap-2"
            onClick={handleLike}
            disabled={isLiking}
        >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            {likeCount}
        </Button>
    )
} 
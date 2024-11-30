'use client'

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Image from "next/image"
import { createPost } from "@/lib/actions/posts"
import { useRef, useState } from "react"
import { User } from "@supabase/supabase-js"

interface CreatePostProps {
    user: User
}

export function CreatePost({ user }: CreatePostProps) {
    const [content, setContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (formData: FormData) => {
        if (isSubmitting) return
        setIsSubmitting(true)
        try {
            await createPost(formData)
            setContent("")
            formRef.current?.reset()
        } catch (error) {
            console.error('Error creating post:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form
            ref={formRef}
            action={handleSubmit}
            className="p-4 border-b"
        >
            <div className="flex gap-4">
                <div className="relative h-10 w-10 rounded-full bg-muted overflow-hidden">
                    {user.user_metadata?.avatar_url && (
                        <Image
                            src={user.user_metadata.avatar_url}
                            alt={user.user_metadata?.full_name || 'User'}
                            fill
                            className="object-cover"
                            sizes="40px"
                        />
                    )}
                </div>
                <div className="flex-1">
                    <textarea
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full min-h-[100px] bg-transparent border-none resize-none focus:outline-none"
                        placeholder="What's on your mind?"
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        name="media"
                        accept="image/*"
                        multiple
                        className="hidden"
                    />
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <PlusCircle className="h-5 w-5" />
                        </Button>
                        <Button
                            type="submit"
                            disabled={!content.trim() || isSubmitting}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
} 
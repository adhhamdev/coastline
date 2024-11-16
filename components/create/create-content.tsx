'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/lib/hooks/use-toast';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { ImagePlus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CreateContentProps {
    user: User;
}

export default function CreateContent({ user }: CreateContentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const router = useRouter();
    const supabase = createClient();
    const { toast } = useToast();

    const handleCreatePost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(event.currentTarget);
            const content = formData.get('content') as string;

            // Upload images if any
            const mediaUrls = [];
            for (const file of selectedFiles) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${user.id}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('posts')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('posts')
                    .getPublicUrl(filePath);

                mediaUrls.push(publicUrl);
            }

            // Create post
            const { error } = await supabase
                .from('posts')
                .insert({
                    user_id: user.id,
                    content,
                    media_urls: mediaUrls,
                });

            if (error) throw error;

            toast({
                title: "Success",
                description: "Your post has been created.",
            });

            router.push('/feed');
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Content</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="post" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="post">Post</TabsTrigger>
                        <TabsTrigger value="product">Product</TabsTrigger>
                    </TabsList>
                    <TabsContent value="post">
                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="content">What&apos;s on your mind?</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    placeholder="Share your thoughts..."
                                    className="min-h-[100px]"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Add Photos</Label>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    <label className="flex flex-col justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-emerald-600">
                                        <ImagePlus className="w-8 h-8 text-gray-400" />
                                        <span className="mt-2 text-sm text-gray-500">Upload Image</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    setSelectedFiles(Array.from(e.target.files));
                                                }
                                            }}
                                        />
                                    </label>
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${index + 1}`}
                                                className="object-cover w-full h-full"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? 'Creating...' : 'Create Post'}
                            </Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="product">
                        {/* Product creation form */}
                        <form className="space-y-4">
                            {/* ... Product form fields ... */}
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
} 
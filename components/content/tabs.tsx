'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Image, Plus, Video } from 'lucide-react';

export default function ContentTabs() {
    return (
        <Tabs defaultValue="all" className="space-y-4">
            <div className="flex justify-between items-center">
                <TabsList>
                    <TabsTrigger value="all">All Content</TabsTrigger>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                </TabsList>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Content
                </Button>
            </div>
            <TabsContent value="all" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            {[
                                { icon: FileText, title: "Getting Started Guide", type: "Post", date: "2 days ago" },
                                { icon: Image, title: "Product Screenshot", type: "Media", date: "3 days ago" },
                                { icon: Video, title: "Tutorial Video", type: "Media", date: "1 week ago" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center p-4 border rounded-lg">
                                    <item.icon className="mr-4 h-6 w-6 text-gray-500" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.type} • {item.date}</p>
                                    </div>
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            {/* Add other tab contents as needed */}
        </Tabs>
    );
} 
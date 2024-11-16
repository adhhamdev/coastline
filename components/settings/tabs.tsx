'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/lib/hooks/use-toast';

export default function SettingsTabs() {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Settings saved",
            description: "Your settings have been saved successfully.",
        });
    };

    return (
        <Tabs defaultValue="general" className="space-y-4">
            <TabsList className='w-full overflow-x-auto grid grid-cols-4'>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>
                            Manage your general account settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" placeholder="Enter username" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter email" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="dark-mode" />
                            <Label htmlFor="dark-mode">Enable dark mode</Label>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            {/* Add other tab contents as needed */}
        </Tabs>
    );
} 
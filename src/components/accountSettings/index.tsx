"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Eye, EyeOff, Loader2, SettingsIcon, Upload } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { getUserByEmail } from "../../../data/user"
import { useSession } from "next-auth/react";
import { updateUserName } from "../../../data/updateUserName"
import { updateUserEmail } from "../../../data/updateUserEmail"
import { deleteUser } from "../../../data/deleteUser"
import { redirect } from 'next/navigation'
import { updateUserPassword } from "../../../data/updateUserPassword"
import { toast, useToast } from "@/hooks/use-toast"
import { FormEvent } from "react";
import { updateUserPhoto } from "../../../data/updateUserPhoto"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface StatePassword  {
  currentpassword : string;
  newpassword : string;
  confirmpassword : string;
}
interface AccountSettingsProps {
    name : string,
    email : string,
    photo_user_profile : string,
}
export default function AccountSettings({name,email,photo_user_profile} : AccountSettingsProps) {

  const { toast } = useToast()
  const [selectedOption, setSelectedOption] = useState("profile")
  const [seePassword,SetseePassword] = useState<boolean>(false)
  const [userData, setUserData] = useState({ name, email });

  const [passwordData, setpasswordData] = useState<StatePassword>({ 
    currentpassword : '', newpassword : '', confirmpassword : '' 
  });
  const [deleteWord, setDeleteWord] = useState('');
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(photo_user_profile);
  const [loading,SetLoading] = useState(false)
  // console.log(props);
  // console.log(photoPreview);
  
  const handleProfileUpdate = async () => {
    SetLoading(true)
    try {
    }
    catch(err){
      console.log(err);
    }
    finally {
      SetLoading(false)
    }
  }
  const handlePasswordUpdate = async () => {
    SetLoading(true)
    try {
         
    }
    catch(err){
      console.log(err);
    }
    finally{
      SetLoading(false)
    }
  }
  const handleDeleteAccount = async () => {
    try {
     
    }
    catch(err){
      console.log(err);
    }
  }
    
  return (
    <>
      <Card>
      <CardContent >
      <div className="flex sm:flex-row flex-col gap-4">
          <div className="space-y-2 sm:border-r  p-2 sm:w-fit w-full mt-4">
            <Button
              variant={selectedOption === "profile" ? "secondary" : "ghost"}
              onClick={() => setSelectedOption("profile")}
              className="w-full justify-start"
            >
              Profile
            </Button>
            <Button
              variant={selectedOption === "password" ? "secondary" : "ghost"}
              onClick={() => setSelectedOption("password")}
              className="w-full justify-start"
            >
              Password
            </Button>
  
            {/* <Button
              variant={selectedOption === "delete" ? "secondary" : "ghost"}
              onClick={() => setSelectedOption("delete")}
              className="w-full justify-start"
            >
              Deletar
            </Button> */}
          </div>
          <div className="space-y-4 sm:mt-4 border-t sm:border-none pt-4">
            {selectedOption === "profile" && (
                  <div id="profile" className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Profile</h3>
                    <p className="text-muted-foreground">Change your name or other account information</p>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        defaultValue={name} 
                        onChange={(e) => setUserData({...userData, name:e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        defaultValue={email} 
                        onChange={(e) => setUserData({...userData, email:e.target.value})}
                      />
                    </div>
                      <Button className="w-full" onClick={handleProfileUpdate}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save'}
                      </Button>
                    </div>
                  </div>
                )}
                {selectedOption === "password" && (
                  <div id="password" className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Password</h3>
                      <p className="text-muted-foreground">Change your account password</p>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input 
                          id="currentpassword" 
                          type={seePassword ? 'text' : 'password'} 
                          placeholder="Enter your current password" 
                          onChange={(e) => setpasswordData({...passwordData, currentpassword:e.target.value})}
                          />
                        <Button className="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost" type="button" onClick={()=>SetseePassword(!seePassword)}>
                            {seePassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="newpassword" 
                          type={seePassword ? 'text' : 'password'} 
                          placeholder="Confirm new password" 
                          onChange={(e) => setpasswordData({...passwordData, newpassword:e.target.value})}
                          />
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                        <Label htmlFor="confirm-password">Confirm new password</Label>
                        <Input 
                          id="confirmpassword" 
                          type={seePassword ? 'text' : 'password'} 
                          placeholder="Confirm new password" 
                          onChange={(e) => setpasswordData({...passwordData, confirmpassword:e.target.value})}
                          />
                      </div>
                      <Button className="w-full" onClick={handlePasswordUpdate}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Change Password'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
        </div>
      </CardContent>
     </Card>
    </>
  )
}

'use server'

import prisma from "@/lib/postgresdb"
type UserInfoFormData = {
    emailId:string
    resumeLink: string;
    date: Date;
    year: number;
    branch: string;
    cgpa: number;
    skills: string[];
    enrolmentNo: string;
    phoneNumber: string;
  };

export async function getUser(emailId:string){
    const user = await prisma.user.findFirst({
        where:{
            emailId
        }
    })
    return user
}

export async function completeOnboarding(
    userinfo:UserInfoFormData
){
    const {emailId,enrolmentNo,date,resumeLink,branch,year,skills,cgpa,phoneNumber}=userinfo
    const user = await prisma.user.findFirst({
        where:{
            emailId
        }
    })
    if(!user) return 
    const yeare = Number(year)
    const cpa = Number(cgpa)
   
   const updateUser = await prisma.userInfo.create({
    data:{
        userId:user.id,
        enrolmentNo,
        dob:date,
        resumeLink,
        branch,
        year:yeare,
        skills,
        cgpa:cpa,
        phoneNumber

    }
   })
   await prisma.user.update({
    where:{
        emailId
    },data:{
        isVerified:true
    }
   })
   return updateUser
}
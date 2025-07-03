
export interface applicantTypes {
    fullName: string,
    stageName: string,
    email:string,
    location: string,
    dateOfBirth: Date,
    phone: number
    category: string,
    profilePicture: string,
    youtubeUrl?: string,
    videoFile: string,
    about: string,
    votes:number,
    appliedAt: Date,
    isApproved: boolean,
    approvedAt: Date,
    status: "Pending" | "Approved" | "Rejected"
}
export interface categoryTypes {
    image:string,
    categoryName: string,
    description: string,
    status: string,
}
export interface eventTypes{
    eventTitle: string,
    description: string
    startDate: Date,
    endDate: Date,
    status: "Active" | "Ended",
    applicants: number,
    videos: string[]
}
export interface testimonilaTypes {
    image: string,
    name: string,
    category: string,
    speech: string,
    year: Date
}

export interface adminTypes {
    fullName: string,
    email: string,
    image: string,
    password?: string,
}

export interface progressbarDetails {
    completedLessons?: number,
    courseid?: number,
    percentagenumber?: number,
    totallessons?: number
}

export interface progressBar {
    progress?: progressbarDetails,
    color?: string,
    height?: string
}
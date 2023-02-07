export enum Priority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
}

export enum Status {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS" ,
    COMPLETED = "COMPLETED",
}

export interface TaskItem {
    id: number | undefined;
    content: string;
    priority: Priority;
    status: Status;
}
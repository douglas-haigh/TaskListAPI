export enum Priority {
    HIGH = 2,
    MEDIUM = 1,
    LOW = 0,
}

export interface TaskItem {
    content: String;
    priority: Priority;
    done: boolean
}
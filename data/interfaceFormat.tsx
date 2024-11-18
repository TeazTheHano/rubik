export interface StorageItem {
    user: UserFormat,
    match: MatchHistoryFormat,
    room: RoomFormat,
    guide: GuideFormat
}

export interface UserFormat {
    name: string;
    star: number
    id: string
}

export interface MatchHistoryFormat {
    date: Date
    time: {
        start: number,
        end: number
    }
    lvl: 'Beginner' | 'Intermediate' | 'Expert'
    rounds: {
        start: number,
        end: number
    }[]
    result: number
}

export interface RoomFormat {
    match: MatchHistoryFormat | null,
    id: number,
    pass: string | number,
    public: boolean,
}

export interface GuideFormat {
    title: string
}
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
    best?: [number, number, number]
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
    lvl: string
}

export interface GuideFormat {
    title: string
}
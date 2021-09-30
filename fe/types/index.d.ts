declare type DataNeeded = {
    [propname: string]: DataItem
}

declare type DataForProcedure3 = {
    index: string,
    url: string,
    s1: {
        passed: boolean,
        feature_url: string,
        score: number,
        vis: {
            ori: [number],
            cur: [number]
        }
    },
    s2: {
        passed: boolean,
        score: number,
        vis: {
            ori: [number],
            cur: [number]
        }
    },
    s3: {
        passed: boolean,
        score: number,
        feature_url?: string,
        vis: {
            ori: [number],
            cur: [number]
        }
    }
}

declare type DataItem = {
    text: string,
    ori_url: string,
    card_url: string,
    preprocessing_urls: [String],
    fixed_url: string,
    s1_url: string,
    s3_url: string,
    evaluation: DataForProcedure3[]
}
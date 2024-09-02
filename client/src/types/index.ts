export type Competitor = {
	name: string,
	position: string
}

export type Score = {
	home: number,
	away: number
}

type MatchStatus = {
	live: boolean,
	finished: boolean,
	started: boolean,
}

export type Event = {
	eventId: number,
	name: string,
	markets: number[],
	competitors: Competitor[]
	scores: Score,
	status: MatchStatus,
	startTime: string,
	displayOrder: number
};

export type Events = Event[] | [];

export type Market = {
	marketId: number,
	eventId: number,
	name: string,
	displayOrder: number,
	type: string,
	status: {
		active: boolean,
		resulted: boolean,
		cashoutable: boolean,
		displayable: boolean,
		suspended: boolean,
		noExtraTime: boolean,
		live: boolean
	},
	liabilities: {
		livePriceLimit: number
	},
	spAvail: boolean,
	outcomes: number[]
}

export type Markets = Market[] | []

export type Outcome = {
    outcomeId: number,
    marketId: number,
    eventId: number,
    name: string,
    displayOrder: number,
    result: {
        place: number,
        result: string,
        favourite: boolean
    },
    price: {
        decimal: number,
        num: number,
        den: number
    },
    status: {
        active: boolean,
        resulted: boolean,
        cashoutable: boolean,
        displayable: boolean,
        suspended: boolean,
        result: boolean
    }
}

export type Outcomes = Outcome[]

export type EventData = {
      eventId: number,
      name: string,
			markets: number[]
};

export type Events = EventData[];

export type MarketData = {
    name: string;
		marketId: number,
		eventId: number,
		outcomes: number[]
};

export type MarketsData = {
  [id:number] : MarketData[]
}

export type OutcomeData = {
	outcomeId: number
	marketId: number
	eventId: number
	name: string
	price: {
		den: number
		num: number
		decimal: number
	}

}

export type OutcomesData = {
  [id:number] : OutcomeData[]
}

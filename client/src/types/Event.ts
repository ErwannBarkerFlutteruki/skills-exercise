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
};

export type MarketsData = {
  [id:number] : MarketData
}

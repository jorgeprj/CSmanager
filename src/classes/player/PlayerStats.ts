import { MatchPlayerStats } from "../match/MatchPlayerStats";

export class PlayerStats{
    private playedMaps: number;
    private wonMaps: number;
    private kills: number;
    private deaths: number;

    constructor(playedMaps: number, wonMaps: number, kills: number, deaths: number){
        this.playedMaps = playedMaps;
        this.wonMaps = wonMaps;
        this.kills = kills;
        this.deaths = deaths;
    }

    public getPlayedMaps(): number{
        return this.playedMaps;
    }

    public setPlayedMaps(playedMaps: number): void{
        this.playedMaps = playedMaps;
    }

    public addPlayedMap(): void{
        this.setPlayedMaps(this.getPlayedMaps() + 1);
    }

    public getWonMaps(): number{
        return this.wonMaps;
    }

    public setWonMaps(wonMaps: number): void{
        this.wonMaps = wonMaps;
    }

    public addWonMap(): void{
        this.setWonMaps(this.getWonMaps() + 1);
    }

    public getWinRate(): number{
        return this.getWonMaps()/this.getPlayedMaps();
    }

    public getKills(): number{
        return this.kills;
    }

    public setKills(kills: number): void{
        this.kills = kills;
    }

    public addKills(kills: number): void{
        this.setKills(this.getKills() + kills);
    }

    public getDeaths(): number{
        return this.deaths;
    }

    public setDeaths(deaths: number): void{
        this.deaths = deaths;
    }

    public addDeaths(deaths: number): void{
        this.setDeaths(this.getDeaths() + deaths);
    }

    public getRating(): number{
        return this.getKills()/this.getDeaths();
    }

    public updateStats(matchStats: MatchPlayerStats){
        this.addKills(matchStats.getKills());
        this.addDeaths(matchStats.getDeaths());
        this.addPlayedMap();
        if(matchStats.getWonMap())
            this.addWonMap();
    }
}

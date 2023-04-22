export class MatchPlayerStats{
    private playerID: number;
    private teamID: number;
    private kills: number;
    private deaths: number;
    private wonMap: boolean;

    constructor(playerID: number, teamID: number){
        this.playerID = playerID;
        this.teamID = teamID;
        this.kills = 0;
        this.deaths = 0;
        this.wonMap = false;
    }

    public getPlayerID(): number{
        return this.playerID;
    }

    public setPlayerID(id: number): void{
        this.playerID = id;
    }

    public getTeamID(): number{
        return this.teamID;
    }

    public setTeamID(id: number): void{
        this.teamID = id;
    }

    public getKills(): number{
        return this.kills;
    }

    public setKills(kills: number): void{
        this.kills = kills;
    }

    public addKill(): void{
        this.setKills(this.getKills() + 1);
    }

    public getDeaths(): number{
        return this.deaths;
    }

    public setDeaths(deaths: number): void{
        this.deaths = deaths;
    }

    public addDeath(): void{
        this.setDeaths(this.getDeaths() + 1);
    }

    public getRating(): number{
        return this.getKills()/this.getDeaths()
    }

    public getWonMap(): boolean{
        return this.wonMap;
    }

    public setWonMap(wonMap: boolean): void{
        this.wonMap = wonMap;
    }
}
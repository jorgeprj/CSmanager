import { TeamService } from "../../services/TeamService";
import { MatchPlayerStats } from "./MatchPlayerStats";

export class MatchMapStats{
    private scoreTeamA: number;
    private scoreTeamB: number;
    private playersStats: MatchPlayerStats[];

    constructor(idTeamA: number, idTeamB: number){
        this.scoreTeamA = 0;
        this.scoreTeamB = 0;
        this.playersStats = [];
        this.createPlayersStats(idTeamA, idTeamB);
    }

    public getScoreTeamA(): number{
        return this.scoreTeamA;
    }

    public setScoreTeamA(scoreTeamA: number): void{
        this.scoreTeamA = scoreTeamA;
    }

    public addScoreTeamA(): void {
        this.setScoreTeamA(this.getScoreTeamA() + 1);
    }

    public getScoreTeamB(): number{
        return this.scoreTeamB;
    }

    public setScoreTeamB(scoreTeamB: number): void{
        this.scoreTeamB = scoreTeamB;
    }

    public addScoreTeamB(): void{
        this.setScoreTeamB(this.getScoreTeamB() + 1);
    }

    public getWinner(): string{
        if (this.getScoreTeamA() > this.getScoreTeamB())
            return "A";

        else
            return "B";
    }

    public getPlayersStats(): MatchPlayerStats[]{
        return this.playersStats;
    }

    public insertPlayerStats(playerStats: MatchPlayerStats): void{
        this.playersStats.push(playerStats);
    }

    public removePlayerStats(playerStats: MatchPlayerStats): void{
        const index = this.playersStats.indexOf(playerStats);
        this.playersStats.splice(index, 1);
    }

    public createPlayersStats(idTeamA: number, idTeamB: number): void{
        const STARTER_ROSTER_LENGTH = 5;
        const service = new TeamService();
        let IDsLineupA = service.getByID(idTeamA).getStarterPlayersIDs();
        let IDsLineupB = service.getByID(idTeamB).getStarterPlayersIDs();

        for(let i = 0; i < STARTER_ROSTER_LENGTH; i++){
            this.insertPlayerStats(new MatchPlayerStats(IDsLineupA[i], idTeamA));
        }

        for(let i = 0; i < STARTER_ROSTER_LENGTH; i++){
            this.insertPlayerStats(new MatchPlayerStats(IDsLineupB[i], idTeamB));
        }
    }

    public addKillToPlayerStats(idPlayer: number): void{
        const indexPlayer = this.getPlayerIndex(idPlayer);
        this.getPlayersStats()[indexPlayer].addKill();
    }

    public addDeathToPlayerStats(idPlayer: number): void{
        const indexPlayer = this.getPlayerIndex(idPlayer);
        this.getPlayersStats()[indexPlayer].addDeath();
    }

    public setWinnersPlayers(): void{
        if(this.getWinner() === "A"){
            for(let i = 0; i < 5; i++){
                this.getPlayersStats()[i].setWonMap(true);
            }
        }else if(this.getWinner() === "B"){
            for(let i = 5; i < 10; i++){
                this.getPlayersStats()[i].setWonMap(true);
            }
        }
    }

    public getPlayerIndex(idPlayer: number): number{
        return this.playersStats.findIndex(x => x.getPlayerID() === idPlayer);
    }
}

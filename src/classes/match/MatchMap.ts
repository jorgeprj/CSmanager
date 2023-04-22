import { PlayerService } from "../../services/PlayerService";
import { MatchMapPlayer } from "./MatchMapPlayer";
import { MatchMapStats } from "./MatchMapStats";
import { MatchMapTeam } from "./MatchMapTeam";

export class MatchMap{
    private id: number;
    private idTeamA: number;
    private idTeamB: number;
    private stats: MatchMapStats;

    constructor(id: number, idTeamA: number, idTeamB: number){
        this.id = id;
        this.idTeamA = idTeamA;
        this.idTeamB = idTeamB;
        this.stats = new MatchMapStats(idTeamA, idTeamB);
    }

    public getID(): number{
        return this.id;
    }

    public setID(id: number){
        this.id = id;
    }

    public getIDTeamA(): number{
        return this.idTeamA;
    }

    public setIDTeamA(id: number): void{
        this.idTeamA = id;
    }

    public getIDTeamB(): number{
        return this.idTeamB;
    }

    public setIDTeamB(id: number): void{
        this.idTeamB = id;
    }

    public getStats(): MatchMapStats{
        return this.stats;
    }

    public setStats(stats: MatchMapStats): void{
        this.stats = stats;
    }

    public play(): void{
        const MAX_ROUNDS = 30;
        let currentRound = 1;
        
        const lineupA = new MatchMapTeam(this.idTeamA,[]);
        lineupA.setPlayers()
        
        const lineupB = new MatchMapTeam(this.idTeamB,[]);
        lineupB.setPlayers()
      
        while(currentRound <= MAX_ROUNDS){
            this.playRound(lineupA, lineupB);
      
            if(this.stats.getScoreTeamA() === 16 || this.stats.getScoreTeamB() === 16){
                console.log(`Map ended. ${this.stats.getScoreTeamA()} x ${this.stats.getScoreTeamB()}`);
                this.stats.setWinnersPlayers();
                return
            }
            currentRound++;
        }

        if(this.stats.getScoreTeamA() === 15 && this.stats.getScoreTeamB() === 15){
            console.log("OVERTIME!")
            this.playOvertime(lineupA, lineupB);
        }
    }

    private playOvertime(playersTeamA: MatchMapTeam, playersTeamB: MatchMapTeam): void{
        const MAX_ROUNDS = 6;
        let overtimeRound = 1;
        const scoreTeamA = this.stats.getScoreTeamA();
        const scoreTeamB = this.stats.getScoreTeamB();
  
        while(overtimeRound <= MAX_ROUNDS) {
            this.playRound(playersTeamA, playersTeamB);
          
            if(this.stats.getScoreTeamA() === scoreTeamA + 4 || this.stats.getScoreTeamB() === scoreTeamB + 4){
                console.log(`Overtime ended. ${this.stats.getScoreTeamA()} x ${this.stats.getScoreTeamB()}`);
                this.stats.setWinnersPlayers();
                return;
            }
            overtimeRound++;
        }
        
        if(this.stats.getScoreTeamA() === scoreTeamA + 3 && this.stats.getScoreTeamB() === scoreTeamB + 3){
            console.log("OVERTIME AGAIN!");
            this.playOvertime(playersTeamA, playersTeamB);
        }
    }

    private playRound(playersTeamA: MatchMapTeam, playersTeamB: MatchMapTeam){
        let aliveTeamA = playersTeamA;
        let aliveTeamB = playersTeamB;
    
        while(aliveTeamA.getPlayers().length > 0 && aliveTeamB.getPlayers().length > 0){
            const randomPlayerTeamA = aliveTeamA.selectRandomPlayer();
            const randomPlayerTeamB = aliveTeamB.selectRandomPlayer();
            
            this.playEncounter(randomPlayerTeamA, randomPlayerTeamB);
    
            aliveTeamA = playersTeamA.filterAlivePlayers();
            aliveTeamB = playersTeamB.filterAlivePlayers();
        }
    
        if(aliveTeamB.isDead())
            this.stats.addScoreTeamA();
        else if(aliveTeamA.isDead())
            this.stats.addScoreTeamB();
        

        console.log(`${this.stats.getScoreTeamA()} x ${this.stats.getScoreTeamB()}`)
        playersTeamA.resetPlayersHealth();
        playersTeamB.resetPlayersHealth();
    }

    private playEncounter(playerCT: MatchMapPlayer, playerT: MatchMapPlayer): void{
        const randomPlayer = Math.floor(Math.random() * 2) + 1;

        if (randomPlayer == 1){
            playerT.kill();
            this.printKill(playerCT.getID(), playerT.getID());
            this.stats.addKillToPlayerStats(playerCT.getID());
            this.stats.addDeathToPlayerStats(playerT.getID());
        }else{
            playerCT.kill();
            this.printKill(playerT.getID(), playerCT.getID());
            this.stats.addKillToPlayerStats(playerT.getID());
            this.stats.addDeathToPlayerStats(playerCT.getID());
        }
    }

    private printKill(idKiller: number, idKilled: number): void{
        const player_service = new PlayerService();
        console.log(`${player_service.getByID(idKiller).getNickname()} killed ${player_service.getByID(idKilled).getNickname()}`);
    }
}
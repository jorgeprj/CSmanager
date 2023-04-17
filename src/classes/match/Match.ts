import { PlayerService } from "../../services/PlayerService";
import { TeamService } from "../../services/TeamService";

class MatchMapPlayer{
    private id: number;
    private health: number;

    constructor(id: number){
        this.id = id;
        this.health = 100;
    }

    public getID(): number{
        return this.id;
    }

    public setID(id: number): void{
        this.id = id;
    }

    public getHealth(): number{
        return this.health;
    }

    public setHealth(health: number): void{
        this.health = health;
    }

    public kill(): void{
        this.setHealth(0);
    }

    public resetHealth(): void{
        this.setHealth(100);
    }

    public isDead(): boolean{
        return (this.getHealth() <= 0);
    }
}


export class MatchMapTeam{
    private id: number;
    private players: MatchMapPlayer[];

    constructor(id: number, players: MatchMapPlayer[]){
        this.id = id;
        this.players = players;
    }

    public getID(): number{
        return this.id;
    }

    public setID(id: number): void{
        this.id = id;
    }

    public getPlayers(): MatchMapPlayer[]{
        return this.players
    }

    public setPlayers(): void{
        const team_service = new TeamService();
        const playersID = team_service.getByID(this.id).getActiveLineup();
        const players: MatchMapPlayer[] = [];

        for (const id of playersID) {
            const player = new MatchMapPlayer(id);
            players.push(player);
        }
        this.players = players;
    }

    public filterAlivePlayers(): MatchMapTeam{
        return new MatchMapTeam(this.id, this.players.filter(player => !player.isDead()));
    }

    public selectRandomPlayer(): MatchMapPlayer{
        const randomIndex = Math.floor(Math.random() * this.players.length);
        return this.players[randomIndex];
    }

    public isDead(): boolean{
        return this.players.every((player) => player.isDead());
    }

    public resetPlayersHealth(): void{
        this.players.forEach((player) => player.resetHealth());
    }

}


export class MatchMap{
    private id: number;
    private idTeamA: number;
    private idTeamB: number;
    private scoreTeamA: number;
    private scoreTeamB: number;

    constructor(id: number, idTeamA: number, idTeamB: number){
        this.id = id;
        this.idTeamA = idTeamA;
        this.idTeamB = idTeamB;
        this.scoreTeamA = 0;
        this.scoreTeamB = 0;
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

    public getScoreTeamA(): number{
        return this.scoreTeamA;
    }

    public setScoreTeamA(scoreTeamA: number): void{
        this.scoreTeamA = scoreTeamA;
    }

    public addScoreTeamA(): void{
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
        if(this.getScoreTeamA() > this.getScoreTeamB())
            return "A";
        else
            return "B";
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
      
            if(this.scoreTeamA === 16 || this.scoreTeamB === 16){
                console.log(`Map ended. ${this.scoreTeamA} x ${this.scoreTeamB}`);
                return
            }
            currentRound++;
        }
        if(this.scoreTeamA === 15 && this.scoreTeamB === 15){
            console.log("OVERTIME!")
            this.playOvertime(lineupA, lineupB);
        }
            
    }

    public playOvertime(playersTeamA: MatchMapTeam, playersTeamB: MatchMapTeam): void{
        const MAX_ROUNDS = 6;
        let overtimeRound = 1;
        const scoreTeamA = this.getScoreTeamA();
        const scoreTeamB = this.getScoreTeamB();
  
        while(overtimeRound <= MAX_ROUNDS) {
            this.playRound(playersTeamA, playersTeamB);
          
            if(this.scoreTeamA === scoreTeamA + 4 || this.scoreTeamB === scoreTeamB + 4){
                console.log(`Overtime ended. ${this.scoreTeamA} x ${this.scoreTeamB}`);
                return;
            }
            overtimeRound++;
        }
        
        if(this.scoreTeamA === scoreTeamA + 3 && this.scoreTeamB === scoreTeamB + 3){
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
            this.addScoreTeamA();
        else if(aliveTeamA.isDead())
            this.addScoreTeamB();
        

        console.log(`${this.scoreTeamA} x ${this.scoreTeamB}`)
        playersTeamA.resetPlayersHealth();
        playersTeamB.resetPlayersHealth();
    }

    private playEncounter(playerCT: MatchMapPlayer, playerT: MatchMapPlayer): void{
        const randomPlayer = Math.floor(Math.random() * 2) + 1;

        if (randomPlayer == 1){
            playerT.kill();
            this.printKill(playerCT.getID(), playerT.getID());
        }else{
            playerCT.kill();
            this.printKill(playerT.getID(), playerCT.getID());
        }
    }

    private printKill(idKiller: number, idKilled: number): void{
        const player_service = new PlayerService();
        console.log(`${player_service.getByID(idKiller).getNickname()} killed ${player_service.getByID(idKilled).getNickname()}`);
    }

}

export class Match{
    private id: number;
    private idTeamA: number;
    private idTeamB: number;
    private scoreTeamA: number;
    private scoreTeamB: number;
    private maps: MatchMap[];

    constructor(id: number, idTeamA: number, idTeamB: number, scoreTeamA: number, scoreTeamB: number, maps: MatchMap[]){
        this.id = id;
        this.idTeamA = idTeamA;
        this.idTeamB = idTeamB;
        this.scoreTeamA = scoreTeamA;
        this.scoreTeamB = scoreTeamB;
        this.maps = maps;
    }

    public getID(): number{
        return this.id;
    }

    public setID(id: number): void{
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

    public getScoreTeamA(): number{
        return this.scoreTeamA;
    }

    public setScoreTeamA(scoreTeamA: number): void{
        this.scoreTeamA = scoreTeamA;
    }

    public addScoreTeamA(): void{
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

    public setScore(map: MatchMap): void{    
        if(map.getWinner() === "A")
            this.addScoreTeamA();
        else
            this.addScoreTeamB();
    }

    public getMaps(): MatchMap[]{
        return this.maps;
    }
    
    public addMap(): void{
        const map = new MatchMap(this.id,this.idTeamA,this.idTeamB);
        this.maps.push(map);
    }

    public removeMap(): void{
        this.maps.pop();
    }

    public play(numberOfMaps: number): void{
        for(let i = 1; i <= numberOfMaps; i++){
            this.addMap();
            this.maps[i-1].play();
            this.setScore(this.maps[i-1]);
        }
        console.log(`Match ended. ${this.scoreTeamA} x ${this.scoreTeamB}`);
    }

}
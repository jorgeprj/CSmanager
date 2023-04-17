import { MatchMap } from "./MatchMap";

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
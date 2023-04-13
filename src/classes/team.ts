export class Team{
    private id: number;
    private name: string;
    private activeLineup: number[];

    constructor(id: number, name: string, activeLineup: number[]){
        this.id = id;
        this.name = name;
        this.activeLineup = activeLineup;
    }

    public getID(): number{
        return this.id;
    }

    public setID(id: number): void{
        this.id = id;
    }

    public getName(): string{
        return this.name;
    }

    public setName(name: string): void{
        this.name = name;
    }

    public getActiveLineup(): number[]{
        return this.activeLineup;
    }

    public addActivePlayer(playerID: number): void{
        this.activeLineup.push(playerID);
    }

    public removeActivePlayer(playerID: number){
        const index = this.activeLineup.indexOf(playerID);
        this.activeLineup.splice(index, 1);
    }
}
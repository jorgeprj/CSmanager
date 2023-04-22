import { PlayerStats } from "./PlayerStats";
import { PlayerStatus } from "./PlayerStatus";

export class Player{
    private id: number;
    private name: string;
    private nickname: string;
    private age: number;
    private status: PlayerStatus;
    private skills: number;
    private stats: PlayerStats;

    constructor(id: number, name: string, nickname: string, age: number, status: PlayerStatus, skills: number, stats: PlayerStats){
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.age = age;
        this.status = status;
        this.skills = skills;
        this.stats = stats;
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

    public getNickname(): string {
        return this.nickname;
    }

    public setNickname(nickname: string): void{
        this.nickname = nickname;
    }

    public getAge(): number{
        return this.age;
    }

    public setAge(age: number): void{
        this.age = age;
    }

    public getStatus(): PlayerStatus{
        return this.status;
    }

    public setStatus(status: PlayerStatus): void{
        this.status = status;
    }

    public getSkills(): number{
        return this.skills;
    }

    public setSkills(skills: number): void{
        this.skills = skills;
    }

    public getStats(): PlayerStats{
        return this.stats;
    }

    public setStats(stats: PlayerStats): void{
        this.stats = stats;
    }
}
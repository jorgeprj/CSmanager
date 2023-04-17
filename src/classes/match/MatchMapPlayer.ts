
export class MatchMapPlayer {
    private id: number;
    private health: number;

    constructor(id: number) {
        this.id = id;
        this.health = 100;
    }

    public getID(): number {
        return this.id;
    }

    public setID(id: number): void {
        this.id = id;
    }

    public getHealth(): number {
        return this.health;
    }

    public setHealth(health: number): void {
        this.health = health;
    }

    public kill(): void {
        this.setHealth(0);
    }

    public resetHealth(): void {
        this.setHealth(100);
    }

    public isDead(): boolean {
        return (this.getHealth() <= 0);
    }
}

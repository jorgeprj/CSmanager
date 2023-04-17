import { TeamService } from "../../services/TeamService";
import { MatchMapPlayer } from "./MatchMapPlayer";



export class MatchMapTeam {
    private id: number;
    private players: MatchMapPlayer[];

    constructor(id: number, players: MatchMapPlayer[]) {
        this.id = id;
        this.players = players;
    }

    public getID(): number {
        return this.id;
    }

    public setID(id: number): void {
        this.id = id;
    }

    public getPlayers(): MatchMapPlayer[] {
        return this.players;
    }

    public setPlayers(): void {
        const team_service = new TeamService();
        const playersID = team_service.getByID(this.id).getActiveLineup();
        const players: MatchMapPlayer[] = [];

        for (const id of playersID) {
            const player = new MatchMapPlayer(id);
            players.push(player);
        }
        this.players = players;
    }

    public filterAlivePlayers(): MatchMapTeam {
        return new MatchMapTeam(this.id, this.players.filter(player => !player.isDead()));
    }

    public selectRandomPlayer(): MatchMapPlayer {
        const randomIndex = Math.floor(Math.random() * this.players.length);
        return this.players[randomIndex];
    }

    public isDead(): boolean {
        return this.players.every((player) => player.isDead());
    }

    public resetPlayersHealth(): void {
        this.players.forEach((player) => player.resetHealth());
    }

}

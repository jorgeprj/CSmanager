import { Player } from "../classes/player/Player";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { InvalidIdException } from "./exceptions";
import { MatchMapStats } from "../classes/match/MatchMapStats";


export class PlayerService{
    private repository = new PlayerRepository();

    public getAll(): Player[]{
        return this.repository.getAll()
    }

    public getByID(id: number): Player{
        this.validateID(id);
        return this.repository.getByID(id);
    }

    public create(player: Player): void{
        this.repository.create(player)
        console.log(`(#${(player.getID())}) ${player.getNickname()} has been inserted!`);
    }

    public update(id: number, player: Player): void{
        this.validateID(id);
        this.repository.update(id, player);
    }

    public delete(id: number): void{
        this.validateID(id);
        this.repository.delete(id);
    }

    public validateID(id: number){
        if (!this.repository.getByID(id))
            throw new InvalidIdException(`Player with ID ${id} not found!`);
    }

    public updatePlayersStats(matchStats: MatchMapStats){
        for(let playerStats of matchStats.getPlayersStats()){
            let player = this.repository.getByID(playerStats.getPlayerID());
            player.getStats().updateStats(playerStats);
            this.update(player.getID(), player)
        }
    }
}

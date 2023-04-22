import { Player } from '../classes/player/Player'
import { PlayerStats } from '../classes/player/PlayerStats';

const fs = require("fs");

export class PlayerRepository{
    private connection = require('../database/players.json');

    public getAll(): Player[]{
        const data = this.connection;
        let players = new Array();
        for(let player of data){
            let stats = new PlayerStats(player.playedMaps, player.wonMaps, player.kills, player.deaths);
            players.push(new Player(player.id, player.name, player.nickname, player.age, player.status, player.skills, stats));
        }
        return players
    }

    public getByID(id: number): Player{
        const player = this.connection[this.getIndex(id)];
        const stats = new PlayerStats(player.stats.playedMaps, player.stats.wonMaps, player.stats.kills, player.stats.deaths);
        return new Player(player.id, player.name, player.nickname, player.age, player.status, player.skills, stats);
    }

    public create(player: Player): void{
        const players = this.getAll();
        let newID = players.length > 0 ? players[players.length - 1].getID() + 1 : 1;
        player.setID(newID);
        players.push(player);
        this.save(players);
    }

    public update(id: number, player: Player): void{
        const players = this.connection;
        const index = this.getIndex(id);
        players[index] = player;
        this.save(players);
    }

    public delete(id: number): void{
        const players = this.getAll();
        const index = this.getIndex(id);
        players.splice(index, 1);
        this.save(players);
    }

    private save(data): void{
        fs.writeFile('src/database/players.json', JSON.stringify(data, null, '\t'), (Error: any) => {
            if (Error) throw Error; 
            console.log("Update done!"); 
        });
    }

    private getIndex(id: number): number{
        return this.connection.findIndex((i: { id: number; }) => i.id === id);
    }

    private isValid(id: number){
        if(this.getIndex(id) > -1)
            return true;
        else
            return false;
    }
}

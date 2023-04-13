import { Match } from "../classes/match";
import { matchRepository } from "../repositories/matchRepository";
import { InvalidIdException } from "./exceptions";


export class MatchService{
    private repository = new matchRepository();

    public getAll(): Match[]{
        return this.repository.getAll()
    }

    public getByID(id: number): Match{
        this.validateID(id);
        return this.repository.getByID(id);
    }

    public create(Match: Match): void{
        this.repository.create(Match)
        console.log(`(#${(Match.getID())}) has been inserted!`);
    }

    public update(id: number, Match: Match): void{
        this.validateID(id);
        this.repository.update(id, Match);
    }

    public delete(id: number): void{
        this.validateID(id);
        this.repository.delete(id);
    }

    public validateID(id: number){
        if (!this.repository.getByID(id))
            throw new InvalidIdException(`Match with ID ${id} not found!`);
    }
}

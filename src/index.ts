import { Match } from "./classes/match";
import { MatchService } from "./services/matchService";

const service = new MatchService();

const match = new Match(1, 1, 2, 0, 0, []);
match.play(3)

service.create(match);
export type JoinedSimulation = {
  code: string;
  name: string;
  participationStatus: "joined";
  simulationStatus: "waiting";
  industry: null;
  currentRound: null;
  totalRounds: null;
  participantCount: null;
  startTime: null;
};

export type JoinSimulationResult =
  | { ok: true; simulation: JoinedSimulation }
  | { ok: false; message: string };

export interface JoinSimulationService {
  join(code: string): Promise<JoinSimulationResult>;
}

export const SIMULATION_CODE_PATTERN = /^[A-Z0-9]{4}-[A-Z0-9]{3}$/;

class LocalJoinSimulationService implements JoinSimulationService {
  async join(code: string): Promise<JoinSimulationResult> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!SIMULATION_CODE_PATTERN.test(code)) {
      return { ok: false, message: "Enter a valid code in the format BZ74-KM8." };
    }

    return {
      ok: true,
      simulation: {
        code,
        name: "Class Simulation",
        participationStatus: "joined",
        simulationStatus: "waiting",
        industry: null,
        currentRound: null,
        totalRounds: null,
        participantCount: null,
        startTime: null,
      },
    };
  }
}

export const joinSimulationService: JoinSimulationService = new LocalJoinSimulationService();

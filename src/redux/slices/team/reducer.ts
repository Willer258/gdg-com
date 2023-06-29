import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTeamData, addTeamData, updateTeamData, deleteTeamData } from './thunk';

interface TeamState {
    teamData: Team[];
    error: any; // type de l'objet d'erreur à spécifier
}

interface Team {
    id: string;
    // Propriétés supplémentaires de l'équipe à spécifier
}

const initialState: TeamState = {
    teamData: [],
    error: {},
};

const TeamSlice = createSlice({
    name: 'TeamSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTeamData.fulfilled, (state, action: PayloadAction<Team[]>) => {
            state.teamData = action.payload;
        });
        builder.addCase(getTeamData.rejected, (state, action:any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(addTeamData.fulfilled, (state, action: PayloadAction<Team>) => {
            state.teamData.push(action.payload);
        });
        builder.addCase(addTeamData.rejected, (state, action:any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(updateTeamData.fulfilled, (state, action: PayloadAction<Team>) => {
            state.teamData = state.teamData.map(team =>
                team.id.toString() === action.payload.id.toString()
                    ? { ...team, ...action.payload }
                    : team
            );
        });
        builder.addCase(updateTeamData.rejected, (state, action:any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(deleteTeamData.fulfilled, (state, action: PayloadAction<Team>) => {
            state.teamData = state.teamData.filter(team => team.id.toString() !== action.payload.id.toString());
        });
        builder.addCase(deleteTeamData.rejected, (state, action:any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default TeamSlice.reducer;

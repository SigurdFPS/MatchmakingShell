// File: controllers/teamController.js

// Create a new team
exports.createTeam = async (req, res) => {
    try {
        const { name, members } = req.body;

        if (members.length > 3) {
            return res.status(400).json({ message: 'Team size cannot exceed 3 members' });
        }

        const { data: newTeam, error } = await req.supabase
            .from('teams')
            .insert([{ name, members, maxSize: members.length }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: 'Error creating team', error });
    }
};

// Add a member to an existing team
exports.addMember = async (req, res) => {
    try {
        const { teamId, userId } = req.body;

        // Fetch the team to check current members and maxSize
        const { data: team, error: fetchError } = await req.supabase
            .from('teams')
            .select('members, maxSize')
            .eq('id', teamId)
            .single();

        if (fetchError) {
            throw fetchError;
        }

        if (team.members.length >= team.maxSize) {
            return res.status(400).json({ message: 'Team is full' });
        }

        // Add the new member to the members array
        const updatedMembers = [...team.members, userId];

        const { error: updateError } = await req.supabase
            .from('teams')
            .update({ members: updatedMembers })
            .eq('id', teamId);

        if (updateError) {
            throw updateError;
        }

        res.status(200).json({ message: 'Member added successfully', members: updatedMembers });
    } catch (error) {
        res.status(500).json({ message: 'Error adding member to team', error });
    }
};

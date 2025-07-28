const prisma = require('../../prisma/client');
const { updateProjectSchema } = require('../../validators/project.validator');

module.exports = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;
    const data = updateProjectSchema.parse(req.body);

    // Verify ownership before update
    const existingProject = await prisma.project.findFirst({
      where: { id, ownerId },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data,
    });

    res.json(updatedProject);
  } catch (err) {
    if (err instanceof Error && err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    console.error('Update project error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

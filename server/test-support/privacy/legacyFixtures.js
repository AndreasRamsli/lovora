function createLegacyFixtureAliases(fixtures = {}) {
  return {
    users: {
      member: fixtures.users?.alice || null,
      outsider: fixtures.users?.bob || null,
      apiKeyOwner: fixtures.users?.apiKeyOwner || fixtures.users?.admin || null,
    },
    workspaces: {
      assignedWorkspace: fixtures.workspaces?.workspaceLegalAlpha || null,
      unassignedWorkspace: fixtures.workspaces?.workspaceLegalBeta || null,
    },
  };
}

function createLegacyFixtureResidue(fixtures = {}) {
  return {
    status: "stub",
    notes: [
      "Legacy privacy residue fixtures are intentionally minimal in Task 1.",
      "Future gauntlet tasks can extend this with migrated threads, orphaned rows, and historical auth shapes.",
    ],
    migratedUsers: [],
    orphanedThreadSlugs: [],
    metadataResidueTables: ["conversation_flags", "event_logs"],
    retainedWorkspaceSlug:
      fixtures.workspaces?.workspaceLegalAlpha?.slug || null,
  };
}

module.exports = {
  createLegacyFixtureAliases,
  createLegacyFixtureResidue,
};

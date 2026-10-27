# Architecture and extension notes

## Current working systems

- `systems/gameState.ts`: versioned state contract and initial save.
- `systems/economy.ts`: click production, passive production, upgrade costs, subsystem repairs, milestone rewards.
- `systems/saveSystem.ts`: localStorage persistence, basic validation, and capped offline simulation.
- `systems/progression.ts`: current repair objective and completion calculation.
- `ui/render.ts`: renders the current game view and binds UI events.
- `ui/effects.ts`: floating reward labels and particles.

## Adding a system

Prefer a new module in `src/systems/` with explicit functions and data-driven content. Add state fields through a save-version migration rather than silently changing the shape of existing saves. Keep online score validation and any secret credentials off the client.

Planned systems, not included as finished features yet:
- `factory.ts`: machine placement, recipes, conveyors, inventory constraints.
- `research.ts`: research nodes and prerequisites.
- `exploration.ts`: regions, seed-based layouts, discoveries.
- `combat.ts`: boss phases, player build choices, combat results.
- `evolution.ts`: prestige routes and carryover rules.
- `cloudSave.ts`: optional Supabase adapter, authentication and conflict handling.

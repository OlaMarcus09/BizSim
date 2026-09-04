# UI architecture

- `layout/` contains the shared responsive application shell.
- `ui/` contains dependency-light visual primitives driven by tokens in `src/app/globals.css`.

Feature-specific components should live with their feature instead of expanding this shared layer.

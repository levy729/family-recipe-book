# PRD: Ingredient UX Improvements for Recipe Builder

## Introduction/Overview

This feature aims to significantly improve the user experience (UX) for managing recipe ingredients in the Recipe Builder. The goal is to make adding, editing, and sorting ingredients faster, more intuitive, and more productive, with a focus on simplicity and minimalism.

## Goals

- Enable rapid entry of multiple ingredients with minimal clicks.
- Allow users to add new ingredients and immediately start typing.
- Support keyboard-driven ingredient entry (Tab to add new lines).
- Allow users to easily reorder ingredients via drag-and-drop (vertical only).
- Ensure the UI is simple, clean, and matches the minimalist design of the app.

## User Stories

- As a recipe creator, I want to add an ingredient and immediately start typing, so I can quickly enter my list without extra clicks.
- As a recipe creator, when I finish typing an ingredient and press Tab, I want a new ingredient input to appear and be focused, so I can keep entering ingredients without using the mouse.
- As a recipe creator, I want to reorder my ingredients by dragging them up or down, so I can easily organize my list.

## Functional Requirements

1. When the user clicks "Add Ingredient", a new textbox should be created and focused for immediate typing.
2. When a textbox is focused and contains text, pressing Tab should create a new ingredient textbox below and focus it.
3. The user must be able to drag and reorder ingredient lines vertically using a drag handle (e.g., a "menu" icon from Lucide icons).
4. The system must ignore empty ingredient lines (do not add or save them).
5. If a drag operation would move an ingredient out of bounds, do nothing.
6. Use a popular, well-maintained npm package for drag-and-drop (e.g., dnd-kit, react-beautiful-dnd, or similar) to avoid custom drag logic.
7. The UI should remain simple and minimalist, with clear focus indicators and accessible controls.

## Non-Goals (Out of Scope)

- No ingredient auto-complete or suggestion features.
- No bulk import or paste of multiple ingredients at once.
- No multi-column or horizontal sorting.
- No custom drag-and-drop implementation (must use an existing package).

## Design Considerations

- Use the "menu" icon from Lucide icons as the drag handle for each ingredient line.
- Inputs should be visually minimal, with clear focus states.
- The overall look should match the existing Recipe Builder style (shadcn/ui, Tailwind CSS).
- Ensure keyboard accessibility for all actions.

## Technical Considerations

- Use a popular, actively maintained npm drag-and-drop package (e.g., dnd-kit or react-beautiful-dnd).
- Ensure the implementation is type-safe (TypeScript).
- Avoid introducing unnecessary dependencies.
- Ingredient data should be managed in component state and validated before saving.

## Success Metrics

- Reduced number of clicks required to enter and reorder ingredients.
- User (recipe creator) can enter a full list of ingredients without touching the mouse except for initial focus.
- Positive subjective feedback on ease and speed of use.

## Open Questions

- Should there be a maximum number of ingredients per recipe?
- Should ingredient lines auto-trim whitespace?
- Should there be undo/redo for ingredient changes?

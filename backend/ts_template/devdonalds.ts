import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
type CookbookEntry = Recipe | Ingredient;

interface Recipe {
  name: string;
  type: "recipe";
  requiredItems: RequiredItem[];
}

interface RequiredItem {
  name: string;
  quantity: number;
}

interface Ingredient {
  name: string;
  type: "ingredient";
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: CookbookEntry[] = [];

// Task 1 helper (don't touch)
app.post("/parse", (req: Request, res: Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input);
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  }
  res.json({ msg: parsed_string });
  return;
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that
const parse_handwriting = (recipeName: string): string | null => {
  // Create parsed name with replacements
  let parsedName = recipeName
    .replaceAll(/[_-]/g, " ")
    .replaceAll(/[^A-Za-z\s]/g, "");

  // Strip leading and trailing whitespace, and squash duplicate whitespace
  parsedName = parsedName.trim().replaceAll(/\s+/g, " ");

  // Apply title case to parsed name
  if (parsedName) {
    // Capitalise first letter and lowercase rest of string
    parsedName =
      parsedName.charAt(0).toUpperCase() +
      parsedName.substring(1).toLowerCase();

    // Capitalise any other word starts
    parsedName = parsedName.replaceAll(/ [a-z]/g, (value) =>
      value.toUpperCase(),
    );
  }

  // Return parsed name, if not null
  return parsedName ? parsedName : null;
};

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req: Request, res: Response) => {
  // Get request body
  const body = JSON.parse(req.body);

  // Check if request body matches basic schema structure
  if (!("name" in body && "type" in body)) {
    return res.sendStatus(400);
  }

  // Get request entry
  const requestEntry: CookbookEntry = body;

  // Check if entry name is unique
  if (cookbook.some((entry) => entry.name === requestEntry.name)) {
    return res.sendStatus(400);
  }

  // Check type of entry for further validation
  switch (requestEntry.type) {
    case "recipe": {
      // Ensure that required items field has been provided
      if (!("requiredItems" in requestEntry)) {
        return res.sendStatus(400);
      }

      // Get the names of all required items
      const requiredItemNames = requestEntry.requiredItems.map(
        (item) => item.name,
      );

      // Check if required items has any duplicate names
      if (new Set(requiredItemNames).size !== requiredItemNames.length) {
        return res.sendStatus(404);
      }
      break;
    }
    case "ingredient": {
      // Ensure that cook time field has been provided and is valid
      if (!("cookTime" in requestEntry && requestEntry.cookTime >= 0)) {
        return res.sendStatus(400);
      }
      break;
    }
  }

  // Add item to cookbook
  cookbook.push(requestEntry);

  // Return 200
  return res.status(200);
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req: Request, res: Request) => {
  // TODO: implement me
  res.status(500).send("not yet implemented!");
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});

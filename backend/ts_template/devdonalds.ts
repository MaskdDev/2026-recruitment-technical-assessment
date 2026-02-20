import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface CookbookEntry {
  name: string;
  type: string;
}

interface RequiredItem {
  name: string;
  quantity: number;
}

interface Recipe extends CookbookEntry {
  type: "recipe";
  requiredItems: RequiredItem[];
}

interface Ingredient extends CookbookEntry {
  type: "ingredient";
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: any = null;

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
  // TODO: implement me
  res.status(500).send("not yet implemented!");
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

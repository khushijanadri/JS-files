// --- Initial Input Data ---
const pantry = [ 
  { sku: "A10", name: "Tomatoes", qty: 4, expires: "2027-01-01", zone: "fridge" }, 
  { sku: "D43", name: "Pineapples", qty: 2, expires: "2020-01-01", zone: "general" } 
]; 

const rawData = [ 
  "A10|Tomatoes|5|2027-01-01", 
  "B21|Bananas|10|2027-01-01", 
  "C32|Eggs|3|2027-01-01|fridge", 
  "C32|Eggs|3|2027-01-01",        // Duplicate SKU (Will be ignored)
  "D43|Pineapples|0|2027-01-01",     // Qty 0 (Will be discarded)
  "E54|Peppers|-1|2027-01-01|fridge" // Qty < 0 (Will be discarded)
];

// --- 1. Clone Pantry (Deep Copy) ---
function clonePantry(pantryArray) {
  return pantryArray.map(item => ({ ...item }));
}

// --- 2. Parse Shipment Data ---
function parseShipment(rawDataArray) {
  const parsedItems = [];
  const seenSkus = new Set();

  for (let i = 0; i < rawDataArray.length; i++) {
    const segments = rawDataArray[i].split("|");
    const sku = segments[0]; // Fix: Explicit index added

    // Ignore duplicate SKU values in the shipment
    if (seenSkus.has(sku)) {
      continue;
    }
    seenSkus.add(sku);

    const parsedItem = {
      sku: sku,
      name: segments[1],    // Fix: Explicit index added
      qty: Number(segments[2]), // Fix: Explicit index added
      expires: segments[3], // Fix: Explicit index added
      zone: segments[4] || "general" // Fix: Explicit index added
    };

    parsedItems.push(parsedItem);
  }

  return parsedItems;
}

// --- 3. Plan Restock Actions ---
function planRestock(pantryArray, parsedShipment) {
  const actions = [];
  const pantrySkus = new Set(pantryArray.map(item => item.sku));

  for (let i = 0; i < parsedShipment.length; i++) {
    const shipmentItem = parsedShipment[i];
    let type = "";

    if (shipmentItem.qty <= 0) {
      type = "discard";
    } else if (pantrySkus.has(shipmentItem.sku)) {
      type = "restock";
    } else {
      type = "donate";
    }

    actions.push({
      type: type,
      item: shipmentItem
    });
  }

  return actions;
}

// --- 4. Group Actions By Storage Zone ---
function groupByZone(actionsArray) {
  const grouped = {};

  for (let i = 0; i < actionsArray.length; i++) {
    const action = actionsArray[i];
    const zone = action.item.zone;

    if (!grouped[zone]) {
      grouped[zone] = [];
    }

    grouped[zone].push(action);
  }

  return grouped;
}

// --- Execution Pipeline ---
const pantryWorkingCopy = clonePantry(pantry);
const shipmentParsed = parseShipment(rawData);
const restockPlan = planRestock(pantryWorkingCopy, shipmentParsed);
const finalGroupedResult = groupByZone(restockPlan);

// --- Console Log Output ---
console.log(finalGroupedResult);

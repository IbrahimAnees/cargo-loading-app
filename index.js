import fs from 'fs';
import yaml from 'js-yaml';

// Constants
const MAX_TROLLEY_WEIGHT = 2000;
const MAX_CARGO_ITEM_WEIGHT = 200;
const MAX_CARGO_ITEM_VOLUME = 2;

// Load the cargo manifest from the YAML file
export const loadCargoManifest = (filePath) => {
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return yaml.load(fileContents);
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const calculateTrolleysRequired = (cargoManifest) => {
    let totalWeight = 0;
    
    for (let itemId in cargoManifest) {
        let item = cargoManifest[itemId];
        
        // Validate cargo item's weight
        if (item.mass > MAX_CARGO_ITEM_WEIGHT) {
            console.log(`Item ${itemId} exceeds max weight. Skipping.`);
            continue;
        }
        
        // Calculate volume
        const itemVolume = item.volume[0] * item.volume[1] * item.volume[2];
        
        // Validate cargo item's volume
        if (itemVolume > MAX_CARGO_ITEM_VOLUME) {
            console.log(`Item ${itemId} exceeds max volume. Skipping.`);
            continue;
        }
        
        totalWeight += item.mass;
    }

    return Math.ceil(totalWeight / MAX_TROLLEY_WEIGHT);
};

const main = () => {
    const cargoManifest = loadCargoManifest('cargo.yaml');
    const manifestTest1 = loadCargoManifest('cargo_oversize.yaml');
    const manifestTest2 = loadCargoManifest('cargo_overweight.yaml');
    const manifestTest3 = loadCargoManifest('cargo_mixed_issues.yaml');
    const manifestTest4 = loadCargoManifest('cargo_multiple_trolleys.yaml');


    if (cargoManifest) {
        console.log(`DEFAULT MANIFEST:`)
        const trolleysRequired = calculateTrolleysRequired(cargoManifest);
        console.log(`Number of trolleys required: ${trolleysRequired}`);
    } else {
        console.log("Error loading cargo manifest.");
    }

    if (manifestTest1) {
        console.log(`MANIFEST OVERSIZE TEST:`)
        const trolleysRequired = calculateTrolleysRequired(manifestTest1);
        console.log(`Number of trolleys required: ${trolleysRequired}`);
    } else {
        console.log("Error loading cargo manifest.");
    }

    if (manifestTest2) {
        console.log(`MANIFEST OVERWEIGHT TEST:`)
        const trolleysRequired = calculateTrolleysRequired(manifestTest2);
        console.log(`Number of trolleys required: ${trolleysRequired}`);
    } else {
        console.log("Error loading cargo manifest.");
    }

    if (manifestTest3) {
        console.log(`MANIFEST MIXED-ISSUES TEST:`)
        const trolleysRequired = calculateTrolleysRequired(manifestTest3);
        console.log(`Number of trolleys required: ${trolleysRequired}`);
    } else {
        console.log("Error loading cargo manifest.");
    }

    if (manifestTest4) {
        console.log(`MANIFEST MIXED-ISSUES TEST:`)
        const trolleysRequired = calculateTrolleysRequired(manifestTest4);
        console.log(`Number of trolleys required: ${trolleysRequired}`);
    } else {
        console.log("Error loading cargo manifest.");
    }
};

main();
const config1 = {
  fault: false,
  phases: [
    { color: "green", duration: 5 },
    { color: "yellow", duration: 2 },
    { color: "red", duration: 4 }
  ]
};

const config2 = {
  fault: false,
  phases: [
    { color: "red", duration: 3 },
    { color: "yellow", duration: -2 },
    { color: "green", duration: 6 }
  ]
};

const config3 = {
  fault: true,
  phases: [
    { color: "green", duration: 5 },
    { color: "yellow", duration: 2 },
    { color: "red", duration: 6 }
  ]
};

const config4 = {
  fault: false,
  phases: []
};

function runSequence(config,cycles)
{
  let count = 0;
  while(count < cycles)
  {
    if(!config.hasOwnProperty('phases')|| !Array.isArray(config.phases) || config.phases.length === 0)
    {
      console.log("No phases found");
      break;
    }
    else if(config.fault === true)
    {
      console.log("Faulted phase!");
      break;
    }
    else 
    {
      for (const phase of config.phases) {
      if (phase.duration <= 0) {
        console.log(`Invalid phase detected`);
        continue; // Skip this invalid phase and move to the next
      }

      console.log(`Switching to ${phase.color} for ${phase.duration} s`);
    }
    }
    count++;
  }
}

function generateTimeline(config, cycles) {
    const timeline = [];
    let runningTotal = 0;

    // Loop through the specified number of cycles
    for (let c = 0; c < cycles; c++) {
        // Iterate through each phase in the configuration
        for (const phase of config.phases) {
            // Process all phases regardless of duration or fault status
            runningTotal += phase.duration;
            timeline.push(runningTotal);
        }
    }

    return timeline;
}

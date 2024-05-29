async function updateRules() {
    const removeHeader = {
        "id": 1,
        "priority": 1,
        "action": {
            "type": "modifyHeaders",
            "requestHeaders": [
                { "header": "referer", "operation": "remove" }
            ]
        },
        "condition": {
            "urlFilter": "*",
            "resourceTypes": ["main_frame"],
            "initiatorDomains": ["seznam.cz"] // Add other search engines if necessary
        }
    }

    // Remove existing rules
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map(rule => rule.id);

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRuleIds,
        addRules: [
            removeHeader
        ]
    });

    console.log("Rules updated successfully");
}

chrome.runtime.onInstalled.addListener(() => {
    updateRules()
        .then(() => console.log("Rules applied successfully"))
        .catch(error => console.error("Error updating rules:", error));
});

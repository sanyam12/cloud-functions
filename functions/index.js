/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.api = onRequest(async (request, response) => {
  const { client, device, value } = request.body;

    // console.log('Request body:', req.body);

    // Check if required fields are present
    if (!client || !device || value === undefined) {
        return response.status(400).json({ error: 'Missing required fields: client, device, or value' });
    }

    // Ensure value is a number before updating the database
    const numericValue = Number(value);

    // Check if the value is a valid number
    if (isNaN(numericValue)) {
        return response.status(400).json({ error: 'Value must be a valid number' });
    }

    try {
        // Update the specific field with the numeric value
        await db.ref(`clients/${client}/series/S1/devices/${device}`).update({ distance: numericValue });
        response.status(200).json({ message: 'Field updated successfully' });
    } catch (error) {
        console.error('Error updating field:', error);
        response.status(500).json({ error: 'Failed to update field' });
    }
});

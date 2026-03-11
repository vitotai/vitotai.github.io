/**
 * Parses a KML XML string and extracts all LineString coordinates and their names.
 *
 * @param {string} kmlString - The raw XML content of the KML file.
 * @returns {Array<Object>} An array of track objects: 
 * [{name: string, points: Array<{lat, lon, ele}>}, ...]
 */
function parseKMLTracksWithNames(kmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(kmlString, "application/xml");
    
    // Check for XML parsing errors
    const errorNode = xmlDoc.querySelector('parsererror');
    if (errorNode) {
        console.error("Error parsing KML file:", errorNode.textContent);
        return [];
    }

    const allTrackObjects = [];

    const placemarkElements = xmlDoc.querySelectorAll('Placemark');

    placemarkElements.forEach(placemark => {
        const currentPoints = [];
        
        // 1. Get the track name from the <name> tag within <Placemark>
        const nameElement = placemark.querySelector('name');
        const trackName = nameElement ? nameElement.textContent.trim() : 'Unnamed Track';


        // Function to extract coordinates from a <LineString> element
        const getCoordinates = (lsElement) => {
            const coordinatesElement = lsElement.querySelector('coordinates');
            if (!coordinatesElement) return;

            const coordString = coordinatesElement.textContent.trim();
            if (!coordString.length === 0) return;

            // KML coordinates are typically space-separated tuples: lon,lat,ele
            const tuples = coordString.split(/\s+/).filter(t => t.length > 0);

            const points = tuples.map(tuple => {
                const parts = tuple.split(',');
                // Parts are [lon, lat, ele]
                const lon = parseFloat(parts[0]);
                const lat = parseFloat(parts[1]);
                const ele = parts.length > 2 ? parseFloat(parts[2]) : null;

                if (!isNaN(lat) && !isNaN(lon)) {
                    return { lat, lon, ele };
                }
                return null;
            }).filter(p => p !== null); 
            
            // Add points to the current Placemark's collection
            currentPoints.push(...points); 
        };

        // 2. Check for <LineString> directly inside <Placemark>
        const directLineStrings = placemark.querySelectorAll(':scope > LineString');
        directLineStrings.forEach(getCoordinates);
        
        // 3. Check for <MultiGeometry> containing <LineString>
        const multiGeometryElements = placemark.querySelectorAll('MultiGeometry');
        multiGeometryElements.forEach(mgElement => {
            const nestedLineStrings = mgElement.querySelectorAll('LineString');
            nestedLineStrings.forEach(getCoordinates);
        });
        
        // 4. If any points were found for this Placemark, save the track object
        if (currentPoints.length > 0) {
            allTrackObjects.push({
                name: trackName,
                points: currentPoints
            });
        }
    });

    return allTrackObjects;
}
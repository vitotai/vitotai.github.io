// Earth's radius in meters
const R = 6371000;

/**
 * Calculates the Haversine distance between two GPS coordinates in meters.
 * @param {Object} p1 - {lat, lon}
 * @param {Object} p2 - {lat, lon}
 * @returns {number} Distance in meters
 */
function haversineDistance(p1, p2) {
    const degToRad = deg => deg * (Math.PI / 180);

    const lat1 = degToRad(p1.lat);
    const lon1 = degToRad(p1.lon);
    const lat2 = degToRad(p2.lat);
    const lon2 = degToRad(p2.lon);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    // Haversine formula
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

/**
 * Calculates the approximate perpendicular distance from a point (P) to a line segment (L)
 * defined by lineStart (A) and lineEnd (B), using Haversine distances.
 * NOTE: This is an approximation as it treats the local region as a flat plane
 * for calculating the projection, but uses true Haversine distance for the final result.
 *
 * @param {Object} P - The point to check: {lat, lon}
 * @param {Object} A - The starting point of the line segment: {lat, lon}
 * @param {Object} B - The ending point of the line segment: {lat, lon}
 * @returns {number} The perpendicular distance in meters.
 */
function perpendicularDistance(P, A, B) {
    // 1. Handle case where line segment is a single point (A == B)
    if (A.lat === B.lat && A.lon === B.lon) {
        return haversineDistance(P, A);
    }

    // 2. Use a fast, flat approximation for the projection (t)
    // This part assumes a local Cartesian system for finding the closest point projection.
    const Ax = A.lon;
    const Ay = A.lat;
    const Bx = B.lon;
    const By = B.lat;
    const Px = P.lon;
    const Py = P.lat;

    // Vector AB (V)
    const Vx = Bx - Ax;
    const Vy = By - Ay;
    
    // Vector AP (W)
    const Wx = Px - Ax;
    const Wy = Py - Ay;
    
    // t is the projection of W onto V, normalized by the length of V.
    // t = (W dot V) / (V dot V)
    const t = (Wx * Vx + Wy * Vy) / (Vx * Vx + Vy * Vy);

    let closestPoint;

    if (t < 0) {
        // Closest point is the start point A
        closestPoint = A;
    } else if (t > 1) {
        // Closest point is the end point B
        closestPoint = B;
    } else {
        // Closest point (C) lies on the segment
        closestPoint = {
            lat: Ay + t * Vy,
            lon: Ax + t * Vx
        };
    }

    // 3. Calculate the accurate distance from P to the closest point C using Haversine
    return haversineDistance(P, closestPoint);
}


/**
 * Implements the Ramer–Douglas–Peucker algorithm for GPS coordinates.
 *
 * @param {Array<Object>} points - An array of points: [{lat, lon}, ...]
 * @param {number} epsilonMeters - The maximum allowable distance (tolerance) in METERS.
 * @returns {Array<Object>} The simplified array of points.
 */
function rdp(points, epsilonMeters) {
    if (points.length < 3) {
        return points;
    }

    let maxDistance = 0;
    let index = 0;
    const lineStart = points[0];
    const lineEnd = points[points.length - 1];

    // 1. Find the point with the maximum perpendicular distance
    for (let i = 1; i < points.length - 1; i++) {
        const distance = perpendicularDistance(points[i], lineStart, lineEnd);
        if (distance > maxDistance) {
            maxDistance = distance;
            index = i;
        }
    }

    let result = [];

    // 2. Compare the maximum distance to epsilon (in meters)
    if (maxDistance > epsilonMeters) {
        // 3. Maximum distance is greater than epsilon: Recursively simplify
        
        // a) Simplify the first segment
        const firstPart = points.slice(0, index + 1);
        const recResults1 = rdp(firstPart, epsilonMeters);

        // b) Simplify the second segment
        const secondPart = points.slice(index);
        const recResults2 = rdp(secondPart, epsilonMeters);

        // 4. Combine results (excluding the duplicate middle point)
        result = recResults1.slice(0, recResults1.length - 1).concat(recResults2);
    } else {
        // 3. Maximum distance is <= epsilon: Keep only start and end points
        result = [lineStart, lineEnd];
    }

    return result;
}
/**
 * Generates a GPX (GPS Exchange Format) string from an array of simplified GPS points.
 *
 * @param {Array<Object>} points - The array of simplified points: [{lat, lon}, ...]
 * @param {string} trackName - The name to assign to the track (optional).
 * @returns {string} The complete GPX XML content string.
 */
function generateGPX(points, trackName = "RDP Simplified Track") {
    if (!points || points.length === 0) {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><gpx></gpx>";
    }

    const today = new Date().toISOString();
    
    // 1. GPX Header and Metadata
    let gpxContent = 
`<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:topogps="http://www.topo-gps.com/xmlschemas/TopoGPSExtension/v2" version="1.1" creator="Topo GPS 9.6.1 https://www.topo-gps.com" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.topo-gps.com/xmlschemas/TopoGPSExtension/v3 http://www.topo-gps.com/xmlschemas/TopoGPSExtensionv3.xsd">
<metadata>
<time>${today}</time>
</metadata>
<trk>
<name>${trackName}</name>
<trkseg>`;

    // 2. Loop through the simplified points to create <trkpt> elements
    points.forEach(point => {
        // Ensure lat and lon are rounded for clean output
        const lat = point.lat.toFixed(6);
        const lon = point.lon.toFixed(6);
        const ALT = ('ele' in point)? "<ele>"+point.ele.toFixed(6)+"</ele>\n":"";
        const TIME= ('time' in point)? "<time>"+point.time.toISOString()+"</time>\n":"";
;

        // NOTE: If your original points had an elevation (ele) or time, you would add them here.
        // E.g., <ele>150.0</ele> or <time>2025-12-04T12:00:00Z</time>
        
        gpxContent += `
<trkpt lat="${lat}" lon="${lon}">
${ALT}${TIME}
</trkpt>`;

});

    // 3. GPX Footer
    gpxContent += `
</trkseg>
</trk>
</gpx>`;

    return gpxContent;
}


function getTracks(gpxxml){
    var ret=[];
    var tracks = gpxxml.getElementsByTagName("trk");
	for (var ti=0; ti < tracks.length; ti++){
	    //for each tracks
	    var allpts=new Array();
	    var segments = tracks[ti].getElementsByTagName("trkseg");
	    for (var si=0; si < segments.length; si++){
	        var trackpoints = segments[si].getElementsByTagName("trkpt");
	        for(var pti=0; pti < trackpoints.length; pti++)
	        {
	            var pt = trackpoints[pti];
	            var lon = parseFloat(pt.getAttribute("lon"));
	            var lat = parseFloat(pt.getAttribute("lat"));
	            
	            var point = {lat:lat,lon:lon};
	            
	            var ele_s = pt.getElementsByTagName("ele");
	            if(ele_s)
	            {
	                point.ele = parseFloat(ele_s[0].firstChild.nodeValue);
	            }
	            var ts = pt.getElementsByTagName("time");
	            if(ts && ts.length >0)
	            {
	                // 2008-10-08T23:07:24Z
	                
	                var dd=ts[0].firstChild.nodeValue.split(/[-Tt:Zz]/);
	                point.time =new Date(dd[0],dd[1]-1,dd[2],dd[3],dd[4],dd[5]);            
	            }
                allpts.push(point);
	        } // end of foreach point
	    } // end of foreach trkseg
	    var trkname=tracks[ti].getElementsByTagName("name")[0].firstChild.nodeValue;
	    //alert(trkname +" pts:" + allpts.length);
        ret.push({name:trkname,points:allpts});
    }// end of foreach trk
    return ret;
 }


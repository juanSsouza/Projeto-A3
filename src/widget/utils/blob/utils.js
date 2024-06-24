const utils = {
    width: 1500,
    height: 900,
    
    getAngles(key = 1) {
        if (key == 0) key = 1
        let angles = [0, 120, 240]
        for (let i = 1; i <= 3; i++) {
            let a = ((key << i) - key) % 45
            angles[i - 1] = angles[i - 1] + a;
        }
        return angles
    },

    getTrianglePoints(base, sideLength, key) {
        let angles = utils.getAngles(key);
        const positions = [];
        for (let a in angles) {
            const angle = (angles[a] * Math.PI) / 180;

            let position = {
                x: base.x + sideLength * Math.cos(angle),
                y: base.y + sideLength * Math.sin(angle)
            };
            positions.push(position);
        }
        positions.push(positions[0]); // Close the path
        return positions;
    },

    drawPath(points) {
        let cpath = `M${points[0].x},${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            cpath += `L${points[i].x},${points[i].y}`;
        }
        cpath += "Z"; // Close the path
        return cpath;
    },

    getPath(key) {
        let points = utils.getTrianglePoints({ x: 250, y: 250 }, 220, key);
        utils.path = utils.drawPath(points);
        return { points, path: utils.path };
    }
}

export default utils;

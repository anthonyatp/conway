const generateGrid = (cols, rows) => {
  const grid = new Array(cols);

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows).fill(new Cell(0));
  }

  return grid;
};

const spawn = (grid) => {
  const points = generateClusters(
    5,
    floor(cols / 5),
    floor(rows / 5),
    0,
    cols,
    0,
    rows
  );

  for (const point of points) {
    let [x, y] = point;
    x = x.mod(cols);
    y = y.mod(rows);
    grid[x][y] = new Cell(1);
  }

  return grid;
};

/**
 * returns n random points in disk of radius r centered at c
 * @param  {[[x: number, y:number]]} center
 * @param  {[number]} n number of points
 * @param  {[number]} radius
 * @return {[Array<[x: number, y:number]>]}
 */
const randomCluster = (center, n, radius) => {
  const [x, y] = center;
  const points = [];
  for (let i = 0; i < n; i++) {
    theta = 2 * PI * random();
    size = radius * random();
    points.push([round(x + size * cos(theta)), round(y + size * sin(theta))]);
  }
  return points;
};

/**
 * return k clusters of n points each in random disks of radius r
 * where the centers of the disk are chosen randomly in [a,b]x[c,d]
 * @param  {[number]} k number of clusters
 * @param  {[number]} n number of points
 * @param  {[number]} radius
 * @param  {[number]} a
 * @param  {[number]} b
 * @param  {[number]} c
 * @param  {[number]} d
 * @return {[Array<[x: number, y:number]>]}
 */
const generateClusters = (k, n, radius, a, b, c, d) => {
  clusters = [];
  for (let i = 0; i < k; i++) {
    const x = a + (b - a) * random();
    const y = c + (d - c) * random();
    clusters.push(...randomCluster([x, y], n, radius));
  }
  return clusters;
};

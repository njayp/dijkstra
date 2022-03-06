import React from "react";
import "./App.css";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Heap from "heap-js";

const defaultInput = `s a 2
s b 4
b e 1`;

type Point = {
  name: string;
  edges: Array<Edge>;
};

type Edge = {
  destination: Point;
  cost: number;
};

const undefinedPoint: Point = {
  name: "undefined",
  edges: [],
};

const undefinedEdge: Edge = {
  destination: undefinedPoint,
  cost: 0,
};

function App() {
  const [input, setInput] = React.useState(defaultInput);
  const [output, setOutput] = React.useState(-1);

  function makeLinkList(input: string) {
    let points = new Map<string, Point>();
    for (const line of input.split("\n")) {
      const splitLine = line.split(" ");
      const from = splitLine[0];
      const to = splitLine[1];
      const cost = Number(splitLine[2]);
      if (!points.has(from)) {
        points.set(from, { name: from, edges: [] });
      }
      if (!points.has(to)) {
        points.set(to, { name: to, edges: [] });
      }
      points.get(from)?.edges.push({
        destination: points.get(to) || undefinedPoint,
        cost: cost,
      });
    }
    return points.get("s") || undefinedPoint;
  }

  function onClick() {
    const root = makeLinkList(input);
    const heap = new Heap(function (a: Edge, b: Edge) {
      return a.cost - b.cost;
    });
    const visited: Array<Point> = [];

    heap.push({ destination: root, cost: 0 });
    while (true) {
      const minEdge = heap.pop() || undefinedEdge;
      console.log(minEdge);

      if (minEdge.destination.name === "e") {
        setOutput(minEdge.cost);
        return;
      }

      if (!visited.includes(minEdge.destination)) {
        visited.push(minEdge.destination);
        for (const edge of minEdge.destination.edges) {
          heap.push({
            destination: edge.destination,
            cost: edge.cost + minEdge.cost,
          });
        }
      }
    }
  }

  return (
    <Box sx={{ display: "flex", m: 2, p: 2 }}>
      <Stack spacing={2}>
        <Box>
          This program calculates the shortest distance between 's' and 'e' from
          the list of inputs "(from) (to) (distance)\n". No error handling.
        </Box>
        <Stack direction={"row"} spacing={2}>
          <TextField
            multiline
            label="Input"
            defaultValue={defaultInput}
            onChange={(e) => setInput(e.target.value)}
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="outlined-disabled"
            label="Output"
            value={output}
          />
          <Button onClick={onClick}>Calculate Shortest Path</Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default App;

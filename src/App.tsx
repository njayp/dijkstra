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
      //
      //
      // TODO: construct the linked List
      //
      //
    }
    return {
      root: points.get("s") || undefinedPoint,
      end: points.get("e") || undefinedPoint,
    };
  }

  function onClick() {
    const { root, end } = makeLinkList(input);
    const heap = new Heap(function (a: Edge, b: Edge) {
      return a.cost - b.cost;
    });
    const visited: Array<Point> = [];

    heap.push({ destination: root, cost: 0 });
    while (true) {
      //
      //
      // TODO: pop the heap
      // push updated edges onto heap
      // call setOuput(cost) when pop == end
      //
      //
    }
  }

  return (
    <Box sx={{ display: "flex", m: 2, p: 2 }}>
      <Stack direction={"row"} spacing={2}>
        <TextField
          multiline
          label="Input"
          defaultValue={defaultInput}
          onChange={(e) => setInput(e.target.value)}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Output"
          value={output}
        />
        <Button onClick={onClick}>Calculate Shortest Path</Button>
      </Stack>
    </Box>
  );
}

export default App;

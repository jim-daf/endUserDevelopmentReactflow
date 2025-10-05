/*
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DiamondNode from './DiamondComponent';



const initialNodes = [
  { id: 'n1', position: { x: -200, y: -100 }, data: { label: 'A' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'B' } },
  { id: 'n4', position: { x: 200, y: 100 }, data: { label: 'C' } },
  { id: 'n3', position: { x: 0, y: 0 }, data: { label: 'Check Status', condition: true}, type: 'diamond', color: '#ff0071'  },
];
var check = initialNodes.find(node => node.id === 'n3').data.condition;
var initialEdges = [
  { id: 'n1-n3', source: 'n1', target: 'n3' },
  { id: 'n3-n2', source: 'n3', target: 'n2' },
  { id: 'n3-n4', source: 'n3', target: 'n4'},
];
if(check){
  var index = initialEdges.findIndex(edge => edge.id === 'n3-n4');
  if (index !== -1) {
    initialEdges.splice(index, 1);
  }
}else{
  var index2 = initialEdges.findIndex(edge => edge.id === 'n3-n2');
  if (index2 !== -1) {
    initialEdges.splice(index2, 1);
  }
}

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh', // Adjust this to your image name
        backgroundSize: 'cover',
        backgroundPosition: 'center', }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ diamond: DiamondNode }} // Register the custom diamond node type
        fitView
      />
    </div>
  );
}
*/
// src/App.js
import React, { useState,useCallback } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, applyNodeChanges } from 'react-flow-renderer';
import '@xyflow/react/dist/style.css';
const initialNodes = [];
const initialEdges = [];

const App = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [nodeName, setNodeName] = useState('');
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(0);

    const onAddNode = () => {
        const newNode = {
            id: `node-${nodes.length + 1}`,
            data: { 
                label: `${nodeName} (X: ${xPosition}, Y: ${yPosition})` 
            },
            position: { x: xPosition, y: yPosition },
            draggable: true,
            dragging:true,
        };

        setNodes((nds) => nds.concat(newNode));
        setNodeName('');
        setXPosition(0);  // Reset to default
        setYPosition(0);  // Reset to default
    };
    const onNodesChange = useCallback(
            (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
            []
        );
    const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
    const onRunSimulation = () => {
            const json = JSON.stringify(nodes, null, 2); // Convert nodes to JSON format
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'nodes.json'; // Specify the name of the file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        };
        
    return (
      
        <div style={{ height: '100vh' }}>
            <div>
                <input
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                    placeholder="Node Name"
                />
                <input
                    type="number"
                    value={xPosition}
                    onChange={(e) => setXPosition(Number(200))}
                    placeholder="X Position"
                />
                <input
                    type="number"
                    value={yPosition}
                    onChange={(e) => setYPosition(Number(200))}
                    placeholder="Y Position"
                />
                <button onClick={onAddNode}>Add Node</button>
                <button onClick={onRunSimulation}>Run Robot Simulation</button>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onConnect={onConnect}
                onNodesChange={onNodesChange}
                style={{ width: '100%', height: '90%' }}
            >
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default App;
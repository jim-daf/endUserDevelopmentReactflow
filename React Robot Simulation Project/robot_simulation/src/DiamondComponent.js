import { Handle,Position } from '@xyflow/react';


const DiamondNode = ({ data }) => {
  return (
    <div style={{
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: data.condition ? '#fff' : '#fff',
      transform: 'rotate(45deg)', // Rotate to shape like a diamond
      border: '1px solid black',
      borderRadius: '5px',
      textAlign: 'center',
      position: 'relative',
    }}>
      <Handle
        type="target" // Input port
        position={Position.Left}
        style={{ background: '#555' }}
      />
      <div style={{
        transform: 'rotate(-45deg)', // Rotate back to display text correctly
        fontWeight: 'normal',
        margin: '0', // Remove margins if any
      }}>
        <label style={{ fontSize:'10px' }}>{data.label}</label>
        <p>{data.condition ? '' : ''}</p>
      </div>
      <Handle
        type="source" // Output port
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </div>
    
  );
};

export default DiamondNode;
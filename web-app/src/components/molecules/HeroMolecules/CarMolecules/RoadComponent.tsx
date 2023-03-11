import * as THREE from "three";
import { useFrame, Vector3 } from "@react-three/fiber";
import { useRef } from "react";
import { PlaneGeometry } from "three";

interface roadComponentProps {
  size: number;
  speed: number;
}
export function RoadComponent(props: roadComponentProps) {
  const geometry = new PlaneGeometry(0.5, props.size * 5);
  const planeGeom = new PlaneGeometry(9, props.size * 7);
  return (
    <>
      <mesh
        geometry={geometry}
        position={[2.5, -0.01, -3]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={planeGeom}
        position={[-1.5, -0.02, -3]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial opacity={0} side={THREE.DoubleSide} />
      </mesh>
      <RoadStripGroup {...props} />
    </>
  );
}

interface roadStripComponentProps {
  size: number;
  speed: number;
  position: Vector3 | any;
}
function RoadStripComponent(props: roadStripComponentProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  const geometry = new THREE.PlaneGeometry(0.5, 3);

  useFrame((_, delta) => {
    if (mesh.current == null) {
      return;
    }

    mesh.current.position.z -= delta * props.speed;
    const back = (props.size / 2) * -5 - 5;
    const front = props.size * 5;
    if (mesh.current.position.z < back) {
      mesh.current.position.z += front;
    }
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      position={props.position}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial color="white" side={THREE.DoubleSide} />
    </mesh>
  );
}

function RoadStripGroup(props: roadComponentProps) {
  let roadStrips: number[] = [];
  for (let i = 0; i < props.size; i++) {
    const back = (props.size / 2) * -5;
    roadStrips.push(back + i * 5);
  }

  return (
    <>
      {roadStrips.map((z, i) => (
        <RoadStripComponent
          key={i}
          position={[-5.5, -0.01, z]}
          size={props.size}
          speed={props.speed}
        />
      ))}
    </>
  );
}

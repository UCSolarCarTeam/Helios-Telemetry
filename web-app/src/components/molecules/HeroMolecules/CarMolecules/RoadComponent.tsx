import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { PlaneGeometry } from "three";

export function RoadComponent(props: any) {
  const geometry = new PlaneGeometry(0.5, 63);
  return (
    <>
      <mesh
        geometry={geometry}
        position={[2.5, 0, -3]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>
      <RoadStripGroup size={13} />
    </>
  );
}

function RoadStripComponent(props: any) {
  const mesh = useRef<THREE.Mesh>();
  const geometry = new THREE.PlaneGeometry(0.5, 3);

  useFrame((_, delta) => {
    if (mesh.current == null) {
      return;
    }

    mesh.current.position.z -= delta * 7;
    const back = (props.size / 2) * -5 - 5;
    const front = props.size * 5;
    if (mesh.current.position.z < back) {
      mesh.current.position.z += front;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      geometry={geometry}
      position={props.position}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial color="white" side={THREE.DoubleSide} />
    </mesh>
  );
}

function RoadStripGroup(props: any) {
  let roadStrips: number[] = [];
  for (let i = 0; i < props.size; i++) {
    const back = (props.size / 2) * -5;
    roadStrips.push(back + i * 5);
  }

  return (
    <>
      {roadStrips.map((z) => (
        <RoadStripComponent position={[-5.5, 0, z]} size={props.size} />
      ))}
    </>
  );
}

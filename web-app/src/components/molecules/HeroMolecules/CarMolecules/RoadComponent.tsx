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
      <RoadStripGroup />
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
    if (mesh.current.position.z < -30) {
      mesh.current.position.z += 55;
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
  return (
    <>
      <RoadStripComponent position={[-5.5, 0, 30]} />
      <RoadStripComponent position={[-5.5, 0, 25]} />
      <RoadStripComponent position={[-5.5, 0, 20]} />
      <RoadStripComponent position={[-5.5, 0, 15]} />
      <RoadStripComponent position={[-5.5, 0, 10]} />
      <RoadStripComponent position={[-5.5, 0, 5]} />
      <RoadStripComponent position={[-5.5, 0, 0]} />
      <RoadStripComponent position={[-5.5, 0, -5]} />
      <RoadStripComponent position={[-5.5, 0, -10]} />
      <RoadStripComponent position={[-5.5, 0, -15]} />
      <RoadStripComponent position={[-5.5, 0, -20]} />
      <RoadStripComponent position={[-5.5, 0, -25]} />
    </>
  );
}

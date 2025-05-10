/* eslint-disable react/no-unknown-property */
import { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { PlaneGeometry } from "three";

import { type Vector3, useFrame } from "@react-three/fiber";

interface roadComponentProps {
  size: number;
  direction: boolean;
  speed: number;
}
const RoadComponent = (props: roadComponentProps) => {
  const stripGeometry = useMemo(
    () => new PlaneGeometry(0.5, props.size * 5),
    [props.size],
  );
  const planeGeometry = useMemo(
    () => new PlaneGeometry(15.7, props.size * 5),
    [props.size],
  );

  return (
    <>
      <mesh
        geometry={stripGeometry}
        position={[-5.5, -0.01, 5]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>
      <mesh
        geometry={planeGeometry}
        position={[2.6, -0.02, 5]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="grey" side={THREE.DoubleSide} />
      </mesh>
      <RoadStripGroup {...props} />
      <mesh
        geometry={stripGeometry}
        position={[10.5, -0.01, 5]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

interface roadStripComponentProps {
  size: number;
  speed: number;
  direction: boolean;
  position: Vector3;
}
function RoadStripComponent(props: roadStripComponentProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  const geometry = useMemo(() => new THREE.PlaneGeometry(0.5, 3), []);
  useFrame((_, delta) => {
    if (mesh.current == null) {
      return;
    }

    if (!props.direction) {
      // if going fowards
      mesh.current.position.z -= delta * props.speed;
    } else {
      mesh.current.position.z += delta * props.speed;
    }

    const stripLength = 5; // Length of each road strip
    const totalLength = props.size * stripLength;
    const back = (props.size / 2) * -stripLength - stripLength;
    const front = (props.size / 2) * stripLength + stripLength;

    if (!props.direction) {
      // if going forwards
      if (mesh.current.position.z < back) {
        mesh.current.position.z += totalLength;
      }
    } else {
      if (mesh.current.position.z > front) {
        mesh.current.position.z -= totalLength;
      }
    }
  });

  return (
    <mesh
      geometry={geometry}
      position={props.position}
      ref={mesh}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial color="white" side={THREE.DoubleSide} />
    </mesh>
  );
}

function RoadStripGroup(props: roadComponentProps) {
  const roadStrips: number[] = [];

  for (let i = 0; i < props.size; i++) {
    const back = (props.size / 2) * -5;
    roadStrips.push(back + i * 5.3);
  }

  return (
    <>
      {roadStrips.map((z, i) => (
        <RoadStripComponent
          direction={props.direction}
          key={i}
          position={[2.5, -0.01, z]}
          size={props.size}
          speed={props.speed}
        />
      ))}
    </>
  );
}

export default memo(RoadComponent);

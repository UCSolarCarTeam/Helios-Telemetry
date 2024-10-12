/* eslint-disable react/no-unknown-property */
import { memo } from "react";
import type * as THREE from "three";
import { type GLTF } from "three-stdlib";

import type { IndicationLocations } from "@/components/molecules/HeroMolecules/HeroTypes";
import { useGLTF } from "@react-three/drei";

type HeliosCar = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
    Shape_IndexedFaceSet: THREE.Mesh;
    Shape_IndexedFaceSet001: THREE.Mesh;
    Shape_IndexedFaceSet002: THREE.Mesh;
    Shape_IndexedFaceSet003: THREE.Mesh;
    Shape_IndexedFaceSet004: THREE.Mesh;
    Shape_IndexedFaceSet005: THREE.Mesh;
    Shape_IndexedFaceSet006: THREE.Mesh;
    Shape_IndexedFaceSet007: THREE.Mesh;
    Shape_IndexedFaceSet008: THREE.Mesh;
    Shape_IndexedFaceSet009: THREE.Mesh;
    Shape_IndexedFaceSet010: THREE.Mesh;
    Shape_IndexedFaceSet011: THREE.Mesh;
    Shape_IndexedFaceSet012: THREE.Mesh;
    Shape_IndexedFaceSet013: THREE.Mesh;
    Shape_IndexedFaceSet014: THREE.Mesh;
    Shape_IndexedFaceSet015: THREE.Mesh;
    Shape_IndexedFaceSet016: THREE.Mesh;
    Shape_IndexedFaceSet017: THREE.Mesh;
    Shape_IndexedFaceSet018: THREE.Mesh;
    Shape_IndexedFaceSet019: THREE.Mesh;
    Shape_IndexedFaceSet020: THREE.Mesh;
    Shape_IndexedFaceSet021: THREE.Mesh;
    Shape_IndexedFaceSet022: THREE.Mesh;
    Shape_IndexedFaceSet023: THREE.Mesh;
    Shape_IndexedFaceSet024: THREE.Mesh;
    Shape_IndexedFaceSet025: THREE.Mesh;
    Shape_IndexedFaceSet026: THREE.Mesh;
    Shape_IndexedFaceSet027: THREE.Mesh;
    Shape_IndexedFaceSet028: THREE.Mesh;
    Shape_IndexedFaceSet029: THREE.Mesh;
    Shape_IndexedFaceSet030: THREE.Mesh;
    Shape_IndexedFaceSet031: THREE.Mesh;
    Shape_IndexedFaceSet032: THREE.Mesh;
    Shape_IndexedFaceSet033: THREE.Mesh;
    Shape_IndexedFaceSet034: THREE.Mesh;
    Shape_IndexedFaceSet035: THREE.Mesh;
    Shape_IndexedFaceSet036: THREE.Mesh;
    Shape_IndexedFaceSet037: THREE.Mesh;
    Shape_IndexedFaceSet038: THREE.Mesh;
    Shape_IndexedFaceSet039: THREE.Mesh;
    Shape_IndexedFaceSet040: THREE.Mesh;
    Shape_IndexedFaceSet041: THREE.Mesh;
    Shape_IndexedFaceSet042: THREE.Mesh;
    Shape_IndexedFaceSet043: THREE.Mesh;
    Shape_IndexedFaceSet044: THREE.Mesh;
    Shape_IndexedFaceSet045: THREE.Mesh;
    Shape_IndexedFaceSet046: THREE.Mesh;
    Shape_IndexedFaceSet047: THREE.Mesh;
    Shape_IndexedFaceSet048: THREE.Mesh;
    Shape_IndexedFaceSet049: THREE.Mesh;
    Shape_IndexedFaceSet050: THREE.Mesh;
    Shape_IndexedFaceSet051: THREE.Mesh;
    Shape_IndexedFaceSet052: THREE.Mesh;
    Shape_IndexedFaceSet053: THREE.Mesh; // Wheel
    Shape_IndexedFaceSet054: THREE.Mesh;
    Shape_IndexedFaceSet055: THREE.Mesh; // LDoor Window
    Shape_IndexedFaceSet056: THREE.Mesh; // LDoor
    Shape_IndexedFaceSet057: THREE.Mesh;
    Shape_IndexedFaceSet058: THREE.Mesh; // Wheel
    Shape_IndexedFaceSet059: THREE.Mesh;
    Shape_IndexedFaceSet060: THREE.Mesh;
    Shape_IndexedFaceSet061: THREE.Mesh; // RDoor
    Shape_IndexedFaceSet062: THREE.Mesh; // RDoor Window
    Shape_IndexedFaceSet063: THREE.Mesh;
    Shape_IndexedFaceSet064: THREE.Mesh; // Wheel
    Shape_IndexedFaceSet065: THREE.Mesh; // Wheel
  };
  materials: {
    RoadCityWorn001_6K: THREE.MeshStandardMaterial;
    Shape: THREE.MeshStandardMaterial;
    ["Shape.001"]: THREE.MeshStandardMaterial;
    ["Shape.002"]: THREE.MeshStandardMaterial;
    ["Shape.003"]: THREE.MeshStandardMaterial;
    ["Shape.004"]: THREE.MeshStandardMaterial;
    ["Shape.005"]: THREE.MeshStandardMaterial;
    ["Shape.006"]: THREE.MeshStandardMaterial;
    ["Shape.007"]: THREE.MeshStandardMaterial;
    ["Shape.008"]: THREE.MeshStandardMaterial;
    ["Shape.009"]: THREE.MeshStandardMaterial;
    ["Shape.010"]: THREE.MeshStandardMaterial;
    ["Shape.011"]: THREE.MeshStandardMaterial;
    ["Shape.012"]: THREE.MeshStandardMaterial;
    ["Shape.013"]: THREE.MeshStandardMaterial;
    ["Shape.014"]: THREE.MeshStandardMaterial;
    ["Shape.015"]: THREE.MeshStandardMaterial;
    ["Shape.016"]: THREE.MeshStandardMaterial;
    ["Shape.017"]: THREE.MeshStandardMaterial;
    ["Shape.018"]: THREE.MeshStandardMaterial;
    ["Shape.019"]: THREE.MeshStandardMaterial;
    ["Shape.020"]: THREE.MeshStandardMaterial;
    ["Shape.021"]: THREE.MeshStandardMaterial;
    ["Shape.022"]: THREE.MeshStandardMaterial;
    ["Shape.023"]: THREE.MeshStandardMaterial;
    ["Shape.024"]: THREE.MeshStandardMaterial;
    ["Shape.025"]: THREE.MeshStandardMaterial;
    ["Shape.026"]: THREE.MeshStandardMaterial;
    ["Shape.027"]: THREE.MeshStandardMaterial;
    ["Shape.028"]: THREE.MeshStandardMaterial;
    ["Shape.029"]: THREE.MeshStandardMaterial;
    ["Shape.030"]: THREE.MeshStandardMaterial;
    ["Shape.031"]: THREE.MeshStandardMaterial;
    ["Shape.032"]: THREE.MeshStandardMaterial;
    ["Shape.033"]: THREE.MeshStandardMaterial;
    ["Shape.034"]: THREE.MeshStandardMaterial;
    ["Shape.035"]: THREE.MeshStandardMaterial;
    ["Shape.036"]: THREE.MeshStandardMaterial;
    ["Shape.037"]: THREE.MeshStandardMaterial;
    ["Shape.038"]: THREE.MeshStandardMaterial;
    ["Shape.039"]: THREE.MeshStandardMaterial;
    ["Shape.040"]: THREE.MeshStandardMaterial;
    ["Shape.041"]: THREE.MeshStandardMaterial;
    ["Shape.042"]: THREE.MeshStandardMaterial;
    ["Shape.043"]: THREE.MeshStandardMaterial;
    ["Shape.044"]: THREE.MeshStandardMaterial;
    ["Shape.045"]: THREE.MeshStandardMaterial;
    ["Shape.046"]: THREE.MeshStandardMaterial;
    ["Shape.047"]: THREE.MeshStandardMaterial;
    ["Shape.048"]: THREE.MeshStandardMaterial;
    ["Shape.049"]: THREE.MeshStandardMaterial;
    ["Shape.050"]: THREE.MeshStandardMaterial;
    ["Shape.051"]: THREE.MeshStandardMaterial;
    ["Shape.052"]: THREE.MeshStandardMaterial;
    ["Shape.053"]: THREE.MeshStandardMaterial;
    ["Shape.054"]: THREE.MeshStandardMaterial;
    ["Shape.055"]: THREE.MeshStandardMaterial;
    ["Shape.056"]: THREE.MeshStandardMaterial;
    ["Shape.057"]: THREE.MeshStandardMaterial;
    ["Shape.058"]: THREE.MeshStandardMaterial;
    ["Shape.059"]: THREE.MeshStandardMaterial;
    ["Shape.060"]: THREE.MeshStandardMaterial;
    ["Shape.061"]: THREE.MeshStandardMaterial;
    ["Shape.062"]: THREE.MeshStandardMaterial;
    ["Shape.063"]: THREE.MeshStandardMaterial;
    ["Shape.064"]: THREE.MeshStandardMaterial;
    ["Shape.065"]: THREE.MeshStandardMaterial;
  };
};

type CarModelComponentProps = {
  isClear: boolean;
  errorMaterial: THREE.MeshStandardMaterial;
  warningMaterial: THREE.MeshStandardMaterial;
  indications: IndicationLocations;
};

const CarModelComponent = (props: CarModelComponentProps) => {
  const path = "/models/Helios.glb";
  const { materials, nodes } = useGLTF(path) as unknown as HeliosCar;

  const clear = materials["Shape.050"];

  return (
    <group
      {...props}
      dispose={null}
      position={[-1.5, 0, -2.5]}
      rotation={[0, Math.PI, 0]}
      scale={0.003}
    >
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet001.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet002.geometry}
        material={materials["Shape.002"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet003.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet004.geometry}
        material={materials["Shape.004"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet005.geometry}
        material={materials["Shape.005"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet006.geometry}
        material={materials["Shape.006"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet007.geometry}
        material={materials["Shape.007"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet008.geometry}
        material={materials["Shape.008"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet009.geometry}
        material={materials["Shape.009"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet010.geometry}
        material={materials["Shape.010"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet011.geometry}
        material={materials["Shape.011"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet012.geometry}
        material={materials["Shape.012"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet013.geometry}
        material={materials["Shape.013"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet014.geometry}
        material={materials["Shape.014"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet015.geometry}
        material={materials["Shape.015"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet016.geometry}
        material={materials["Shape.016"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet017.geometry}
        material={materials["Shape.017"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet018.geometry}
        material={materials["Shape.018"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet019.geometry}
        material={materials["Shape.019"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet020.geometry}
        material={materials["Shape.020"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet021.geometry}
        material={materials["Shape.021"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet022.geometry}
        material={materials["Shape.022"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet023.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet024.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shape_IndexedFaceSet025.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
      /> */}
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet026.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shape_IndexedFaceSet027.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
      /> */}
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet028.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shape_IndexedFaceSet029.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
      /> */}
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet030.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shape_IndexedFaceSet031.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
      /> */}
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet032.geometry}
        material={materials["Shape.032"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet033.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shape_IndexedFaceSet034.geometry}
        material={materials["Shape.001"]}
        position={[-31.75, 0, -2872.13]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
      /> */}
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet035.geometry}
        material={materials["Shape.035"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet036.geometry}
        material={materials["Shape.036"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet037.geometry}
        material={materials["Shape.037"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet038.geometry}
        material={materials["Shape.038"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet039.geometry}
        material={materials["Shape.039"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet040.geometry}
        material={materials["Shape.040"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet041.geometry}
        material={materials["Shape.041"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet042.geometry}
        material={materials["Shape.042"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet043.geometry}
        material={materials["Shape.043"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet044.geometry}
        material={materials["Shape.044"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet045.geometry}
        material={materials["Shape.045"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet046.geometry}
        material={materials["Shape.046"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet047.geometry}
        material={materials["Shape.047"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet048.geometry}
        material={props.isClear ? clear : materials["Shape.048"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet049.geometry}
        material={props.isClear ? clear : materials["Shape.049"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet050.geometry}
        material={props.warningMaterial}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet051.geometry}
        material={props.isClear ? clear : materials["Shape.051"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <meshStandardMaterial color="#ff0000" opacity={0.1} transparent />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet052.geometry}
        material={props.isClear ? clear : materials["Shape.052"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet053.geometry}
        material={materials["Shape.065"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet054.geometry}
        material={props.isClear ? clear : materials["Shape.054"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet055.geometry}
        material={materials["Shape.055"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet056.geometry}
        material={props.isClear ? clear : materials["Shape.052"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet057.geometry}
        material={materials["Shape.057"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet058.geometry}
        material={materials["Shape.065"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet059.geometry}
        material={props.isClear ? clear : materials["Shape.052"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet060.geometry}
        material={props.isClear ? clear : materials["Shape.052"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet061.geometry}
        material={props.isClear ? clear : materials["Shape.052"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet062.geometry}
        material={materials["Shape.062"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet063.geometry}
        material={materials["Shape.063"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet064.geometry}
        material={materials["Shape.064"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        geometry={nodes.Shape_IndexedFaceSet065.geometry}
        material={materials["Shape.065"]}
        position={[-31.75, 0, -2872.13]}
        receiveShadow
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
    </group>
  );
};

export default memo(CarModelComponent);

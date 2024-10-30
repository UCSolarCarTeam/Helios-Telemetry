// ticket 207 on jira - to find more info about this
//notes: on figma, go to file called Race Tab - Analysis Mockup 2 - Stats
// I have to create the 2 squares and rectangles
// make an analysis tab to view the shapes
import React from "react";

interface ShapeProps {
  squareWidth?: number; //width of the square
  rectangleWidth?: number; //width of rectangle
  rectangleHeight?: number; // length of rectangle
  infoNumber?: number;
}

const GreyShapes: React.FC<ShapeProps> = ({
  infoNumber = 78,
  rectangleHeight = "107px",
  rectangleWidth = "285px",
  squareWidth = "250px",
}) => {
  return (
    <div style={{ display: "flex" }}>
      {/* First square */}
      <div
        style={{
          backgroundColor: "grey",
          borderRadius: "20px",
          height: squareWidth,
          margin: "10px",
          width: squareWidth,
        }}
      >
        <p>Optimal Driving speed at {infoNumber}</p>
      </div>

      {/* Second square */}
      <div
        style={{
          backgroundColor: "grey",
          borderRadius: "20px",
          height: squareWidth,
          margin: "10px",
          width: squareWidth,
        }}
      />

      {/* Rectangle 1 */}
      <div
        style={{
          backgroundColor: "grey",
          borderRadius: "20px",
          height: rectangleHeight,
          margin: "10px",
          width: rectangleWidth,
        }}
      />

      {/* Rectangle 2 */}
      <div
        style={{
          backgroundColor: "grey",
          borderRadius: "20px",
          height: rectangleHeight,
          margin: "10px",
          width: rectangleWidth,
        }}
      />
    </div>
  );
};

const RaceTab: React.FC = () => {
  return (
    <div>
      <GreyShapes infoNumber={78} /> {/* Pass the infoNumber prop here */}
    </div>
  );
};

export default RaceTab;

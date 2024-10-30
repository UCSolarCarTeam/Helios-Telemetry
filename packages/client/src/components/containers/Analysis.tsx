// ticket 207 on jira - to find more info about this
//notes: on figma, go to file called Race Tab - Analysis Mockup 2 - Stats
// I have to create the 2 squares and rectangles
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
  squareWidth = "285px",
}) => {
  return (
    <div>
      {/* First square */}
      <div
        style={{
          backgroundColor: "grey",
          height: squareWidth,
          margin: "10px",
          width: squareWidth,
        }}
      >
        <p>Optimal Driving speed at 38%</p>
      </div>

      {/* Second square */}
      <div
        style={{
          backgroundColor: "grey",
          height: squareWidth,
          margin: "10px",
          width: squareWidth,
        }}
      />

      {/* Rectangle 1 */}
      <div
        style={{
          backgroundColor: "grey",
          height: rectangleHeight,
          margin: "10px",
          width: rectangleWidth,
        }}
      />

      {/* Rectangle 2 */}
      <div
        style={{
          backgroundColor: "grey",
          height: rectangleHeight,
          margin: "10px",
          width: rectangleWidth,
        }}
      />
    </div>
  );
};

// ticket 207 on jira - to find more info about this
//notes: on figma, go to file called Race Tab - Analysis Mockup 2 - Stats
// I have to create the 2 squares and rectangles
import React from "react";

interface ShapeProps {
  squareWidth?: number; //width of the square
  rectangleWidth?: number; //width of rectangle
  rectangleHeight?: number; // length of rectangle
}

const GreyShapes: React.FC<ShapeProps> = ({
  rectangleHeight = 100,
  rectangleWidth = 20,
  squareWidth = 100,
}) => {};
